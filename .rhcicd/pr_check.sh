#!/bin/bash

# --------------------------------------------
# Export vars for helper scripts to use
# --------------------------------------------
export APP_NAME="provisioning"  # name of app-sre "application" folder this component lives in
export COMPONENT_NAME="provisioning-frontend"  # name of resourceTemplate component for deploy
# IMAGE should match the quay repo set by app.yaml in app-interface
export IMAGE="quay.io/cloudservices/provisioning-frontend"
export WORKSPACE=${WORKSPACE:-$APP_ROOT} # if running in jenkins, use the build's workspace
export APP_ROOT=$(pwd)
# export NODE_BUILD_VERSION=16
COMMON_BUILDER=https://raw.githubusercontent.com/RedHatInsights/insights-frontend-builder-common/master

# --------------------------------------------
# Options that must be configured by app owner
# --------------------------------------------
export IQE_PLUGINS="provisioning"
export IQE_MARKER_EXPRESSION="ui and smoke and frontend_pr_check"
export IQE_FILTER_EXPRESSION=""
export IQE_ENV="ephemeral"
export IQE_SELENIUM="true"
export IQE_CJI_TIMEOUT="30m"
export DEPLOY_TIMEOUT="900"  # 15min
export DEPLOY_FRONTENDS="true"

set -exv
# source is preferred to | bash -s in this case to avoid a subshell
source <(curl -sSL $COMMON_BUILDER/src/frontend-build.sh)

# Install bonfire repo/initialize
CICD_URL=https://raw.githubusercontent.com/RedHatInsights/bonfire/master/cicd
# shellcheck source=/dev/null
curl -s $CICD_URL/bootstrap.sh > .cicd_bootstrap.sh && source .cicd_bootstrap.sh

# Run ui tests
export EXTRA_DEPLOY_ARGS="image-builder-crc"
source "${CICD_ROOT}/deploy_ephemeral_env.sh"
export COMPONENT_NAME="provisioning-backend"

oc project $NAMESPACE

export AWS_ACCOUNT_ID="988542195534"
source <(curl -ksSL https://gitlab.cee.redhat.com/satellite-services/hms-cicd/-/raw/main/images_db_stub.sh)

source "${CICD_ROOT}/cji_smoke_test.sh"

source "${CICD_ROOT}/post_test_results.sh"
