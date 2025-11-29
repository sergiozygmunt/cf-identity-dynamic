import React, { useEffect, useState } from "react";

const WarpInfo = ({ onLoaded }) => {
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    is_WARP_enabled: false,
    gateway_account_id: "",
    is_in_org: null,
  });
  const [envVars, setEnvVars] = useState({
    ORGANIZATION_ID: "",
    ORGANIZATION_NAME: "",
  });
  const [warpEnabled, setWarpEnabled] = useState(null);
  const [errorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("WarpInfo: Starting data fetch...");

        // Fetch WARP status
        const traceResponse = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
        const traceText = await traceResponse.text();
        const warpStatus = traceText.includes("warp=on");
        setWarpEnabled(warpStatus);

        // Fetch environment variables
        const envResponse = await fetch("/api/env");
        const envData = await envResponse.json();
        setEnvVars({
          ORGANIZATION_ID: envData.ORGANIZATION_ID,
          ORGANIZATION_NAME: envData.ORGANIZATION_NAME,
        });

        // Fetch user data
        const userResponse = await fetch("/api/userdetails");
        const userData = await userResponse.json();

        // Calculate is_in_org
        const isInOrg = userData.identity.gateway_account_id === envData.ORGANIZATION_ID;

        // Update userData state with fetched data and calculated `is_in_org`
        setUserData({
          user_name: userData.identity.name,
          user_email: userData.identity.email,
          is_WARP_enabled: userData.identity.is_warp,
          gateway_account_id: userData.identity.gateway_account_id,
          is_in_org: isInOrg,
        });

        console.log("WarpInfo: Data fetch complete, is_in_org:", isInOrg);
      } catch (error) {
        // console.error("WarpInfo: Error fetching data:", error);
        // setErrorMessage("Error fetching WARP or user data. Please try again later.");
      } finally {
        if (onLoaded) onLoaded(); // send loading status back to accessdenied.js
      }
    };

    fetchData();
  }, [onLoaded]);

  return (
    <div className={warpEnabled ? "govuk-card" : "govuk-card govuk-card--error"}>
      {warpEnabled ? (
        <>
          <h2 className="govuk-heading-m">WARP Information</h2>
          <dl className="govuk-summary-list">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">User name</dt>
              <dd className="govuk-summary-list__value">{userData.user_name}</dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Email</dt>
              <dd className="govuk-summary-list__value">{userData.user_email}</dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">WARP status</dt>
              <dd className="govuk-summary-list__value">
                <strong className="govuk-tag govuk-tag--green">Enabled</strong>
              </dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Organization</dt>
              <dd className="govuk-summary-list__value">
                {userData.is_in_org ? (
                  <>
                    <strong className="govuk-tag govuk-tag--green">Correct</strong>
                    {' '}{envVars.ORGANIZATION_NAME}
                  </>
                ) : (
                  <>
                    <strong className="govuk-tag govuk-tag--red">Incorrect</strong>
                    {' '}Not in "{envVars.ORGANIZATION_NAME}"
                  </>
                )}
              </dd>
            </div>
          </dl>
        </>
      ) : (
        <div className="govuk-warning-text">
          <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong className="govuk-warning-text__text">
            <span className="govuk-visually-hidden">Warning</span>
            Please enable WARP to view detailed user information.
          </strong>
        </div>
      )}
      {errorMessage && <p className="govuk-error-message">{errorMessage}</p>}
    </div>
  );
};

export default WarpInfo;
