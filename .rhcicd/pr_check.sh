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

source $WORKSPACE/.rhcicd/sonarqube.sh

# Install bonfire repo/initialize
CICD_URL=https://raw.githubusercontent.com/RedHatInsights/bonfire/master/cicd
# shellcheck source=/dev/null
curl -s $CICD_URL/bootstrap.sh > .cicd_bootstrap.sh && source .cicd_bootstrap.sh

# Run ui tests
export EXTRA_DEPLOY_ARGS="image-builder-crc"
source "${CICD_ROOT}/deploy_ephemeral_env.sh"
export COMPONENT_NAME="provisioning-backend"

oc project $NAMESPACE

# ADD the image stubs
orgID="0369233"
accountID="3340851"

dbPod=$(oc get pods -o custom-columns=POD:.metadata.name --no-headers | grep 'image-builder-db')

# AWS stub
imageID="ad6d6a99-7a95-4b74-8760-cce28df35bda" # created on 2023-08-23
imageName="pipeline-aws"

composeRequestAWSJson='{"image_name": "'$imageName'", "distribution": "rhel-92", "customizations": {}, "image_requests": [{"image_type": "aws", "architecture": "x86_64", "upload_request": {"type": "aws", "options": {"share_with_accounts": ["093942615996"]}}}]}'
oc exec $dbPod -- psql -d image-builder -c "INSERT INTO public.composes (job_id, request, created_at, account_number, org_id, image_name, deleted) VALUES
('$imageID', '$composeRequestAWSJson', '$(date +"%Y-%m-%d %T")', '$orgID', '$accountID', '$imageName', false);"

# GCP stub
imageID="6c79ab2c-176d-4e24-80ca-bd9f3a019ca6" # created on 2023-08-23
imageName="pipeline-gcp"

composeRequestGCPJson='{"image_name": "'$imageName'", "distribution": "rhel-92", "customizations": {}, "image_requests": [{"image_type": "gcp", "architecture": "x86_64", "upload_request": {"type": "gcp", "options": {"share_with_accounts": ["user:oezr@redhat.com"]}}}]}'
oc exec $dbPod -- psql -d image-builder -c "INSERT INTO public.composes (job_id, request, created_at, account_number, org_id, image_name, deleted) VALUES
('$imageID', '$composeRequestGCPJson', '$(date +"%Y-%m-%d %T")', '$orgID', '$accountID', '$imageName', false);"


source "${CICD_ROOT}/cji_smoke_test.sh"

source "${CICD_ROOT}/post_test_results.sh"
