# This makefile is used to package and generate a helm chart repo index
# So the chart can be installed directly from Github

TARGET = build

build: .FORCE
	helm package ./backstage
	helm repo index .

.FORCE:
