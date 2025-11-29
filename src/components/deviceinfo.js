import React, { useEffect, useState } from "react";
import "./status.css";

const DeviceInfo = ({ onLoaded }) => {
  const [userData, setUserData] = useState({
    device_model: "",
    device_name: "",
    device_os_ver: "",
    device_ID: "",
    is_WARP_enabled: false,
  });
  const [warpEnabled, setWarpEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWarpStatus = async () => {
      try {
        console.log("DeviceInfo: Fetching WARP status...");
        const traceResponse = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
        const traceText = await traceResponse.text();
        const warpStatus = traceText.includes("warp=on");
        setWarpEnabled(warpStatus);

        if (warpStatus) {
          console.log("DeviceInfo: WARP is enabled, fetching user data...");
          fetchUserData(); //fetch user data if WARP is enabled
        } else {
          // setErrorMessage("WARP is not enabled. Device information is unavailable.");
          if (onLoaded) onLoaded();
        }
      } catch (error) {
        console.error("DeviceInfo: Error fetching WARP status:", error);
        setErrorMessage("Error fetching WARP status. Please try again later.");
        if (onLoaded) onLoaded(); // send loading status back to accessdenied.js
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/userdetails");
        const data = await response.json();

        setUserData({
          device_model: data.device?.result?.model || "",
          device_name: data.device?.result?.name || "",
          device_os_ver: data.device?.result?.os_version || "",
          device_ID: data.device?.result?.gateway_device_id || "",
          is_WARP_enabled: true,
        });

        console.log("DeviceInfo: User data loaded successfully.");
        if (onLoaded) onLoaded();  // send loading status back to accessdenied.js
      } catch (error) {
        console.error("DeviceInfo: Error fetching device data:", error);
        // setErrorMessage("Error fetching device data. Please refresh the page or try again later.");
        if (onLoaded) onLoaded();  // send loading status back to accessdenied.js still
      }
    };

    fetchWarpStatus();
  }, [onLoaded]);

  return (
    <div className={warpEnabled ? "govuk-card" : "govuk-card govuk-card--error"}>
      {warpEnabled ? (
        userData.is_WARP_enabled ? (
          <>
            <h2 className="govuk-heading-m">Device Information</h2>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Device Model</dt>
                <dd className="govuk-summary-list__value">{userData.device_model}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Device Name</dt>
                <dd className="govuk-summary-list__value">{userData.device_name}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">OS Version</dt>
                <dd className="govuk-summary-list__value">{userData.device_os_ver}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Serial Number</dt>
                <dd className="govuk-summary-list__value">{userData.device_ID}</dd>
              </div>
            </dl>
          </>
        ) : (
          <div className="govuk-warning-text">
            <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
            <strong className="govuk-warning-text__text">
              <span className="govuk-visually-hidden">Warning</span>
              Device information unavailable.
            </strong>
          </div>
        )
      ) : (
        <div className="govuk-warning-text">
          <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong className="govuk-warning-text__text">
            <span className="govuk-visually-hidden">Warning</span>
            {errorMessage || "WARP is not enabled. Please enable WARP to view device information."}
          </strong>
        </div>
      )}
      {errorMessage && <p className="govuk-error-message">{errorMessage}</p>}
    </div>
  );
};

export default DeviceInfo;
