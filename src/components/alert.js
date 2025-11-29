import React from 'react';

const Alert = ({ type, title, children }) => {
  // Map alert types to GOV.UK notification banner classes
  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          className: 'govuk-notification-banner govuk-notification-banner--success',
          role: 'alert',
          titleText: title || 'Success',
          iconClass: 'govuk-notification-banner--success'
        };
      case 'danger':
        return {
          className: 'govuk-notification-banner',
          role: 'alert',
          titleText: title || 'Important',
          isError: true
        };
      case 'warning':
        return {
          className: 'govuk-notification-banner',
          role: 'region',
          titleText: title || 'Warning',
          isWarning: true
        };
      case 'info':
      default:
        return {
          className: 'govuk-notification-banner',
          role: 'region',
          titleText: title || 'Important',
          isInfo: true
        };
    }
  };

  const config = getAlertConfig();

  return (
    <div
      className={config.className}
      role={config.role}
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
    >
      <div className="govuk-notification-banner__header">
        <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">
          {config.titleText}
        </h2>
      </div>
      <div className="govuk-notification-banner__content">
        {typeof children === 'string' ? (
          <p className="govuk-notification-banner__heading">{children}</p>
        ) : (
          <div className="govuk-body">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Alert;
