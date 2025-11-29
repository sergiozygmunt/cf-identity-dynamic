import React from "react";
import Alert from "../components/alert";
import SpecialGroup from "../components/specialgroup";
import GroupList from "../components/grouplist";

const AccessDeniedInfo = ({ secondaryColor }) => {
  // const linkStyles = `underline text-[${secondaryColor}]`;

  /*
  This can be tailored to whatever contnet serves your needs, ideally this would provide a brief highlight of the information presented on the page (WARP/GW/Posture requirements)
  */
  return (
    <div className="govuk-width-container">
      <h2 className="govuk-heading-l">WARP Zero Trust Required</h2>
      <p className="govuk-body">
        WARP Zero Trust is required to be configured in <strong>Gateway with WARP</strong> mode to access this resource. The site you have
        attempted to access likely requires that WARP is currently enabled and protecting your session.
      </p>
      <Alert type="warning">
        <ul className="govuk-list govuk-list--bullet">
          <li>
            Please ensure that your WARP Zero Trust client is <strong>Connected</strong> and reports that <strong>Your Internet is protected</strong>.
          </li>
        </ul>
      </Alert>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

      <h2 className="govuk-heading-l">Device Posture</h2>
      <p className="govuk-body">
        In order to access this resource, your device must meet set security requirements. Please ensure that your device{" "}
        <strong>operating system</strong> is up to date and that all <strong>software</strong> has the latest patches and updates applied, where
        available.
      </p>
      <Alert type="warning">
        <ul className="govuk-list govuk-list--bullet">
          <li>
            If you have failed the Crowdstrike Posture check, please reboot your device and try again.
          </li>
        </ul>
      </Alert>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

      <h2 className="govuk-heading-l">Correct Group Membership Required</h2>
      <p className="govuk-body">
        The resource you attempted to visit requires membership in an authorized IDP group. Please review your current groups for more information.
      </p>
      <SpecialGroup />
      <div className="govuk-!-margin-bottom-4"></div>
      <GroupList />

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />



    </div>
  );
};

export default AccessDeniedInfo;
