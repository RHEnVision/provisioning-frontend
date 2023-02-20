#!/bin/bash

# not possible ATM
#set -o nounset

COMMIT_SHORT=$(git rev-parse --short=7 HEAD)

# When doing a PR check, send sonarqube results to a separate branch.
# Otherwise, send it to the default 'main' branch.
# The variable $PR_CHECK is only used when doing a PR check (see pr_check.sh).
# Both ${GIT_BRANCH}  and ${ghprbPullId} are provided by App-Interface's Jenkins.
# SonarQube parameters can be found below:
#   https://sonarqube.corp.redhat.com/documentation/analysis/pull-request/
if [ $IS_PR = true ]; then
    pr_check_ots="-Dsonar.pullrequest.branch=${GIT_BRANCH} -Dsonar.pullrequest.key=${ghprbPullId} -Dsonar.pullrequest.base=main";
fi

coverage_opts="-Dsonar.javascript.lcov.reportPaths=/usr/src/coverage/lcov.info"
build_artifacts=".docker/**/*"

podman run \
--pull=always --rm \
-v "${PWD}":/usr/src:z   \
-e SONAR_SCANNER_OPTS="-Dsonar.scm.provider=git \
 ${pr_check_ots:-} \
 ${coverage_opts:-} \
 -Dsonar.working.directory=/tmp \
 -Dsonar.projectKey=hms:provisioning-frontend \
 -Dsonar.projectVersion=${COMMIT_SHORT} \
 -Dsonar.sources=/usr/src/. \
 -Dsonar.tests=/usr/src/. \
 -Dsonar.test.inclusions=**/*.test.js \
 -Dsonar.exclusions=${build_artifacts},node_modules/**/*,**/*.test.js,**/*.html,**/*.yml,**/*.yaml,**/*.json,**/mocks/*" \
images.paas.redhat.com/alm/sonar-scanner-alpine:latest -X

mkdir -p "${WORKSPACE}/artifacts"

# Archive coverage artifacts in Jenkins
cp $PWD/coverage/cover* $PWD/coverage/lcov.info $WORKSPACE/artifacts/
