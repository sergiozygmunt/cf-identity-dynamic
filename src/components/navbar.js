import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = ({ debugEnabled, primaryColor }) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch('/assets/logo');
        if (!response.ok) {
          throw new Error('Failed to fetch logo from KV');
        }
        const blob = await response.blob();
        const logoUrl = URL.createObjectURL(blob);
        setLogoUrl(logoUrl);
      } catch (error) {
        console.error('Error fetching logo from KV:', error);
      }
    };

    fetchLogo();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <NavLink to="/access-denied" className="govuk-header__link govuk-header__link--homepage">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                style={{ maxHeight: '40px', width: 'auto' }}
              />
            ) : (
              <span className="govuk-header__logotype">
                <span className="govuk-header__logotype-text">Logo</span>
              </span>
            )}
          </NavLink>
        </div>
        <div className="govuk-header__content">
          <NavLink to="/access-denied" className="govuk-header__link govuk-header__service-name">
            Identity and Access Help Page
          </NavLink>
          <nav aria-label="Menu" className="govuk-header__navigation">
            <button
              type="button"
              className="govuk-header__menu-button govuk-js-header-toggle"
              aria-controls="navigation"
              aria-label="Show or hide menu"
            >
              Menu
            </button>
            <ul id="navigation" className="govuk-header__navigation-list">
              <li className={`govuk-header__navigation-item ${isActive('/access-denied') || isActive('/') ? 'govuk-header__navigation-item--active' : ''}`}>
                <NavLink className="govuk-header__link" to="/access-denied">
                  Access Denied
                </NavLink>
              </li>
              <li className={`govuk-header__navigation-item ${isActive('/information') ? 'govuk-header__navigation-item--active' : ''}`}>
                <NavLink className="govuk-header__link" to="/information">
                  Information
                </NavLink>
              </li>
              {debugEnabled && (
                <li className={`govuk-header__navigation-item ${isActive('/debug') ? 'govuk-header__navigation-item--active' : ''}`}>
                  <NavLink className="govuk-header__link" to="/debug">
                    Debug
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
