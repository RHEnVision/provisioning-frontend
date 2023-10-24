import React from 'react';

import { imageProps } from '../../helpers';
import { Title, Text, Alert, AlertActionLink } from '@patternfly/react-core';
import LaunchDescriptionList from '../../../LaunchDescriptionList';
import useLocalStorage from '../../../Common/Hooks/useLocalStorage';

const ReviewDetails = ({ image }) => {
  const [showNotificationBanner, setNotificationBanner] = useLocalStorage('rh_launch_notification_banner', true);

  return (
    <div className="pf-c-form">
      <Title ouiaId="review_details_title" headingLevel="h1">
        Review details
      </Title>
      <Text ouiaId="review_details_description">
        Review the information below and then click <b>Launch</b> to finish the process.
      </Text>
      {showNotificationBanner && (
        <Alert
          variant="info"
          isInline
          title="Notification integration"
          actionLinks={[
            <AlertActionLink
              key="more_details_btn"
              onClick={() =>
                window.open(
                  'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html-single/deploying_and_managing_rhel_systems_in_hybrid_clouds/index#configuring-launch-notifications_host-management-services',
                  '_blank'
                )
              }
            >
              More details
            </AlertActionLink>,
            <AlertActionLink key="dismiss_btn" onClick={() => setNotificationBanner(false)}>
              Dismiss
            </AlertActionLink>,
          ]}
          ouiaId="review_details_alert"
        >
          <>
            <p>
              <b>Tip:</b> Take advantage of our notification integration feature to stay informed whether a launch failed or ended successfully. You
              have the flexibility to set up notifications through various channels such as webhooks, email alerts, Slack messages, and more.
            </p>
          </>
        </Alert>
      )}
      <LaunchDescriptionList image={image} />
    </div>
  );
};

ReviewDetails.propTypes = {
  image: imageProps,
};
export default ReviewDetails;
