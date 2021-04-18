/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { CatalogIdentityClient, getEntityClaims } from '../../lib/catalog';
import {
  encodeState,
  OAuthAdapter,
  OAuthEnvironmentHandler,
  OAuthHandlers,
  OAuthProviderOptions,
  OAuthRefreshRequest,
  OAuthResponse,
  OAuthStartRequest,
  OAuthResult,
} from '../../lib/oauth';
import {
  executeFetchUserProfileStrategy,
  executeFrameHandlerStrategy,
  executeRedirectStrategy,
  executeRefreshTokenStrategy,
  makeProfileInfo,
  PassportDoneCallback,
} from '../../lib/passport';
import {
  AuthProviderFactory,
  RedirectInfo,
  SignInResolver,
  ProfileTransform,
} from '../types';
import { TokenIssuer } from '../../identity';

type PrivateInfo = {
  refreshToken: string;
};

type Options = OAuthProviderOptions & {
  signInResolver?: SignInResolver<OAuthResult>;
  profileTransform: ProfileTransform<OAuthResult>;
  tokenIssuer: TokenIssuer;
  catalogIdentityClient: CatalogIdentityClient;
};

export class GoogleAuthProvider implements OAuthHandlers {
  private readonly _strategy: GoogleStrategy;
  private readonly signInResolver?: SignInResolver<OAuthResult>;
  private readonly profileTransform: ProfileTransform<OAuthResult>;
  private readonly tokenIssuer: TokenIssuer;
  private readonly catalogIdentityClient: CatalogIdentityClient;

  constructor(options: Options) {
    this.signInResolver = options.signInResolver;
    this.profileTransform = options.profileTransform;
    this.tokenIssuer = options.tokenIssuer;
    this.catalogIdentityClient = options.catalogIdentityClient;
    this._strategy = new GoogleStrategy(
      {
        clientID: options.clientId,
        clientSecret: options.clientSecret,
        callbackURL: options.callbackUrl,
        // We need passReqToCallback set to false to get params, but there's
        // no matching type signature for that, so instead behold this beauty
        passReqToCallback: false as true,
      },
      (
        accessToken: any,
        refreshToken: any,
        params: any,
        fullProfile: passport.Profile,
        done: PassportDoneCallback<OAuthResult, PrivateInfo>,
      ) => {
        done(
          undefined,
          {
            fullProfile,
            params,
            accessToken,
            refreshToken,
          },
          {
            refreshToken,
          },
        );
      },
    );
  }

  async start(req: OAuthStartRequest): Promise<RedirectInfo> {
    return await executeRedirectStrategy(req, this._strategy, {
      accessType: 'offline',
      prompt: 'consent',
      scope: req.scope,
      state: encodeState(req.state),
    });
  }

  async handler(
    req: express.Request,
  ): Promise<{ response: OAuthResponse; refreshToken: string }> {
    const { result, privateInfo } = await executeFrameHandlerStrategy<
      OAuthResult,
      PrivateInfo
    >(req, this._strategy);

    return {
      response: await this.handleResult(result),
      refreshToken: privateInfo.refreshToken,
    };
  }

  async refresh(req: OAuthRefreshRequest): Promise<OAuthResponse> {
    const { accessToken, params } = await executeRefreshTokenStrategy(
      this._strategy,
      req.refreshToken,
      req.scope,
    );
    const fullProfile = await executeFetchUserProfileStrategy(
      this._strategy,
      accessToken,
    );
    return this.handleResult({
      fullProfile,
      params,
      accessToken,
      refreshToken: req.refreshToken,
    });
  }

  private async handleResult(result: OAuthResult) {
    const profile = await this.profileTransform(result);

    const response: OAuthResponse = {
      providerInfo: {
        idToken: result.params.id_token,
        accessToken: result.accessToken,
        scope: result.params.scope,
        expiresInSeconds: result.params.expires_in,
      },
      profile,
    };

    if (this.signInResolver) {
      response.backstageIdentity = await this.signInResolver(
        {
          result,
          profile,
        },
        {
          tokenIssuer: this.tokenIssuer,
          catalogIdentityClient: this.catalogIdentityClient,
        },
      );
    }

    return response;
  }
}

const emailSignInResolver: SignInResolver<OAuthResult> = async (info, ctx) => {
  const { profile } = info;

  if (!profile.email) {
    throw new Error('Google profile contained no email');
  }

  const entity = await ctx.catalogIdentityClient.findUser({
    annotations: {
      'google.com/email': profile.email,
    },
  });

  const claims = getEntityClaims(entity);
  const token = await ctx.tokenIssuer.issueToken({ claims });

  return { id: entity.metadata.name, entity, token };
};

export type GoogleProviderOptions = {
  /**
   * The profile transformation function used to verify and convert the auth response
   * into the profile that will be presented to the user.
   */
  profileTransform?: ProfileTransform<OAuthResult>;

  /**
   * Configure sign-in for this provider, without it the provider can not be used to sign users in.
   */
  signIn?: {
    /**
     * Maps an auth result to a Backstage identity for the user.
     *
     * Set to `'email'` to use the default email-based sign in resolver, which will search
     * for the catalog for a single user entity that has a matching `google.com/email` annotation.
     */
    resolver?: 'email' | SignInResolver<OAuthResult>;
  };
};

export const createGoogleProvider = (
  options?: GoogleProviderOptions,
): AuthProviderFactory => {
  return ({ providerId, globalConfig, config, tokenIssuer, catalogApi }) =>
    OAuthEnvironmentHandler.mapConfig(config, envConfig => {
      const clientId = envConfig.getString('clientId');
      const clientSecret = envConfig.getString('clientSecret');
      const callbackUrl = `${globalConfig.baseUrl}/${providerId}/handler/frame`;

      const catalogIdentityClient = new CatalogIdentityClient({
        catalogApi,
        tokenIssuer,
      });

      let profileTransform: ProfileTransform<OAuthResult> = async ({
        fullProfile,
        params,
      }) => makeProfileInfo(fullProfile, params.id_token);
      if (options?.profileTransform) {
        profileTransform = options.profileTransform;
      }

      let signInResolver: SignInResolver<OAuthResult> | undefined = undefined;
      const resolver = options?.signIn?.resolver;
      if (resolver === 'email') {
        signInResolver = emailSignInResolver;
      } else if (typeof resolver === 'function') {
        signInResolver = info =>
          resolver(info, {
            catalogIdentityClient,
            tokenIssuer,
          });
      }

      const provider = new GoogleAuthProvider({
        clientId,
        clientSecret,
        callbackUrl,
        signInResolver,
        profileTransform,
        tokenIssuer,
        catalogIdentityClient,
      });

      return OAuthAdapter.fromConfig(globalConfig, provider, {
        disableRefresh: false,
        providerId,
        tokenIssuer,
      });
    });
};
