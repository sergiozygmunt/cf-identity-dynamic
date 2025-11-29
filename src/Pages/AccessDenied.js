import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alert from "../components/alert";
import Button from "../components/button";
import OriginalUrl from "../components/originalurl";
import Posture from "../components/posture";
import History from "../components/history";
import AccessDeniedInfo from "../content/AccessDeniedInfo";
import DeviceInfo from "../components/deviceinfo";
import WarpInfo from "../components/warpinfo";
import { MutatingDots } from "react-loader-spinner";

const AccessDenied = ({ primaryColor, secondaryColor }) => {
  const [loadingDeviceInfo, setLoadingDeviceInfo] = useState(true);
  const [loadingWarpInfo, setLoadingWarpInfo] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const location = useLocation();

  // Handlers to update loading state
  const handleDeviceInfoLoaded = () => {
    setLoadingDeviceInfo(false);
  };

  const handleWarpInfoLoaded = () => {
    setLoadingWarpInfo(false);
  };

  const handleHistoryLoaded = () => {
    setLoadingHistory(false);
  };

  // Reset state when the route changes, this is needed to force refresh to keep the information up to date.
  useEffect(() => {
    setLoadingDeviceInfo(true);
    setLoadingWarpInfo(true);
    setLoadingHistory(true);
  }, [location.pathname]); // Reset loading states whenever the pathname changes

  const loadingPage = loadingDeviceInfo || loadingWarpInfo || loadingHistory;

  return (
    <div className="bg-steel min-h-screen relative">
      {/* Loading Overlay, this can be customized to your liking */}
      {loadingPage && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
          <MutatingDots
            height="150"
            width="150"
            color={primaryColor}
            secondaryColor={primaryColor}
            radius="20"
            ariaLabel="mutating-dots-loading"
            visible={true}
          />
          <h2 className="govuk-body" style={{ color: "black" }}>
            Checking your connection
          </h2>
        </div>
      )}

      {/* Main Content */}
      <div className="govuk-width-container">
        <main
          className={`govuk-main-wrapper ${
            loadingPage ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500`}
        >
          <h1 className="govuk-heading-xl" style={{ textAlign: "center" }}>Access Denied</h1>
          <div className="flex justify-center">
            <OriginalUrl />
          </div>

          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
          <h2 className="govuk-heading-l">Overview</h2>
          <p className="govuk-body">
            One of the following sections describes why you were denied access to
            the site you attempted to visit. Currently, Cloudflare Access does not
            provide the exact reason for denial, therefore, this Access Denied
            page describes the most common reasons for access denials.
          </p>
          <div className="container mx-auto p-4">
            <Alert type="info">
              Please review the provided information in order to troubleshoot any
              potential user, group, or device requirements that are not met.
            </Alert>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <WarpInfo onLoaded={handleWarpInfoLoaded} />
            </div>
            <div className="govuk-grid-column-one-half">
              <Posture />
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-half">
              <DeviceInfo onLoaded={handleDeviceInfoLoaded} />
            </div>

            <div className="govuk-grid-column-one-half">
              <History onLoaded={handleHistoryLoaded} />
            </div>
          </div>

          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

          {/* Set this up to be your intended "click to contact" support section (redirect or email).*/}

          <div className="container mx-auto p-4 flex items-center">
            <p className="govuk-body mr-4">
              Consult the information below for further details surrounding the
              above status information, for further assistance:
            </p>
            <a href="mailto:IT@example.com" className="inline-block">
              <Button variant="secondary" secondaryColor={secondaryColor}>
                Contact Support
              </Button>
            </a>
          </div>

          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
          <AccessDeniedInfo />
        </main>
      </div>
    </div>
  );
};

export default AccessDenied;
