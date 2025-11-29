import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  href,
  secondaryColor, // Keep for backwards compatibility but not used
  ...props
}) => {
  // Map variant to GOV.UK button classes
  const getButtonClass = () => {
    const baseClass = 'govuk-button';
    const variantClasses = {
      primary: baseClass,
      secondary: `${baseClass} govuk-button--secondary`,
      warning: `${baseClass} govuk-button--warning`,
      start: `${baseClass} govuk-button--start`
    };
    return variantClasses[variant] || baseClass;
  };

  const buttonClass = `${getButtonClass()} ${className}`.trim();

  // If href is provided, render as a link styled as a button
  if (href) {
    return (
      <a
        href={href}
        role="button"
        draggable="false"
        className={buttonClass}
        data-module="govuk-button"
        onClick={onClick}
        {...props}
      >
        {children}
        {variant === 'start' && (
          <svg
            className="govuk-button__start-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17.5"
            height="19"
            viewBox="0 0 33 40"
            aria-hidden="true"
            focusable="false"
          >
            <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
          </svg>
        )}
      </a>
    );
  }

  // Otherwise render as a button element
  return (
    <button
      type={type}
      className={buttonClass}
      data-module="govuk-button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : undefined}
      {...props}
    >
      {children}
      {variant === 'start' && (
        <svg
          className="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      )}
    </button>
  );
};

export default Button;
