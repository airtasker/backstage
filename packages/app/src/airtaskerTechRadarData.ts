import { RadarQuadrant, RadarRing, RadarEntry } from '@backstage/plugin-tech-radar';

const quadrants = new Array<RadarQuadrant>();
quadrants.push({ id: 'infrastructure', name: 'Infrastructure' });
quadrants.push({ id: 'frameworks', name: 'Frameworks' });
quadrants.push({ id: 'languages', name: 'Languages' });
quadrants.push({ id: 'data', name: 'Data Management' });

const rings = new Array<RadarRing>();
rings.push({ id: 'use', name: 'USE', color: '#93c47d' });
rings.push({ id: 'trial', name: 'TRIAL', color: '#93d2c2' });
rings.push({ id: 'assess', name: 'ASSESS', color: '#fbdb84' });
rings.push({ id: 'hold', name: 'HOLD', color: '#efafa9' });
const entries = new Array<RadarEntry>();
entries.push({
  url: 'https://www.postgresql.org/',
  key: 'postgresql',
  id: 'postgresql',
  title: 'PostgreSQL',
  quadrant: 'data',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://redis.io/',
  key: 'redis',
  id: 'redis',
  title: 'Redis',
  quadrant: 'data',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://aws.amazon.com/s3/',
  key: 'aws-s3',
  id: 'aws-s3',
  title: 'AWS S3',
  quadrant: 'data',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://www.elastic.co/',
  key: 'elasticsearch',
  id: 'elasticsearch',
  title: 'Elasticsearch',
  quadrant: 'data',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://aws.amazon.com/kinesis/',
  key: 'aws-kinesis',
  id: 'aws-kinesis',
  title: 'AWS Kinesis',
  quadrant: 'data',
  timeline: [
    {
      moved: 0,
      ringId: 'assess',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://aws.amazon.com/sqs/',
  key: 'aws-sqs',
  id: 'aws-sqs',
  title: 'AWS SQS',
  quadrant: 'data',
  timeline: [
    {
      moved: 0,
      ringId: 'trial',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://github.com/features/actions',
  key: 'github-actions',
  id: 'github-actions',
  title: 'GitHub Actions',
  quadrant: 'infrastructure',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://kubernetes.io/',
  key: 'kubernetes',
  id: 'kubernetes',
  title: 'Kubernetes',
  quadrant: 'infrastructure',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://www.docker.com/',
  key: 'docker',
  id: 'docker',
  title: 'Docker',
  quadrant: 'infrastructure',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://www.nginx.com/',
  key: 'nginx',
  id: 'nginx',
  title: 'Nginx',
  quadrant: 'infrastructure',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://kotlinlang.org/',
  key: 'kotlin',
  id: 'kotlin',
  title: 'Kotlin',
  quadrant: 'languages',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://www.ruby-lang.org/en/',
  key: 'ruby',
  id: 'ruby',
  title: 'Ruby',
  quadrant: 'languages',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://www.typescriptlang.org/',
  key: 'typescript',
  id: 'typescript',
  title: 'Typescript',
  quadrant: 'languages',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://golang.org/',
  key: 'go',
  id: 'go',
  title: 'Go',
  quadrant: 'languages',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://www.javascript.com/',
  key: 'javascript',
  id: 'javascript',
  title: 'Javascript',
  quadrant: 'languages',
  timeline: [
    {
      moved: 0,
      ringId: 'hold',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://www.python.org/',
  key: 'python',
  id: 'python',
  title: 'Python',
  quadrant: 'languages',
  timeline: [
    {
      moved: 0,
      ringId: 'trial',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://rubyonrails.org/',
  key: 'ruby-on-rails',
  id: 'ruby-on-rails',
  title: 'Ruby on Rails',
  quadrant: 'frameworks',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://spring.io/projects/spring-boot',
  key: 'spring-boot',
  id: 'spring-boot',
  title: 'Spring Boot',
  quadrant: 'frameworks',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://www.djangoproject.com/',
  key: 'django',
  id: 'django',
  title: 'Django',
  quadrant: 'frameworks',
  timeline: [
    {
      moved: 0,
      ringId: 'trial',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

entries.push({
  url: 'https://expressjs.com/',
  key: 'expressjs',
  id: 'expressjs',
  title: 'Express.js',
  quadrant: 'frameworks',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://reactjs.org/',
  key: 'reactjs',
  id: 'reactjs',
  title: 'ReactJS',
  quadrant: 'frameworks',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});
entries.push({
  url: 'https://nodejs.org/',
  key: 'nodejs',
  id: 'nodejs',
  title: 'Node.js',
  quadrant: 'frameworks',
  timeline: [
    {
      moved: 0,
      ringId: 'use',
      date: new Date('2020-08-06'),
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    },
  ],
});

export const getTechRadarData = () =>
  Promise.resolve({
    quadrants: quadrants,
    rings: rings,
    entries: entries,
  });
