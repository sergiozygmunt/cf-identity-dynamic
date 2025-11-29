import React, { useEffect, useState } from 'react';
import Alert from './alert';

const SpecialGroup = () => {
  const [setTargetGroup] = useState('');
  const [isInTargetGroup, setIsInTargetGroup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the environment variables to get the TARGET_GROUP (this is defined in the wrangler.toml/worker env vars)
    const fetchEnvVars = async () => {
      try {
        const response = await fetch('/api/env');
        const envData = await response.json();
        setTargetGroup(envData.TARGET_GROUP);

        const userDetailsResponse = await fetch('/api/userdetails');
        const userDetails = await userDetailsResponse.json();

        const userGroups = userDetails.identity?.groups || [];
        setIsInTargetGroup(userGroups.includes(envData.TARGET_GROUP));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching environment variables or user details:', error);
        setLoading(false);
      }
    };

    fetchEnvVars();
     // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p className="govuk-body">Loading group information...</p>;
  }

  // This can be changed to meet your own requirements, by default it shows messaging for a "example group"
  return (
    <div>
      {isInTargetGroup ? (
        <Alert type="danger">
          <ul className="govuk-list govuk-list--bullet">
            <li>
              User is in an example group, please visit <a href="https://example.com" className="govuk-link">example.com</a> if you believe this is an error.
            </li>
          </ul>
        </Alert>
      ) : (
        <Alert type="success">
          <ul className="govuk-list govuk-list--bullet">
            <li>User is not in an example group.</li>
          </ul>
        </Alert>
      )}
    </div>
  );
};

export default SpecialGroup;
