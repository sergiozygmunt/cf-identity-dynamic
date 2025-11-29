# GOV.UK Design System Transformation Guide

## Overview
This document tracks the transformation of the Cloudflare Identity and Access Help Page from Tailwind CSS to GOV.UK Design System (version 5.13.0) loaded from the private CDN at `govuk.prodcdn.com`.

## Completed Transformations

### ✅ 1. Base HTML Template ([public/index.html](public/index.html))
- Added `govuk-template` class to `<html>` element
- Loaded GOV.UK CSS from `https://govuk.prodcdn.com/5.13.0/govuk-frontend-5.13.0.min.css`
- Loaded GDS Transport fonts (light 400, bold 700) from CDN
- Loaded GOV.UK JavaScript from CDN with `GOVUKFrontend.initAll()`
- Added proper `govuk-template__body` class to body
- Added JavaScript detection script
- Replaced noscript message with GOV.UK notification banner

### ✅ 2. Base CSS ([src/index.css](src/index.css))
- Removed Tailwind directives
- Added GOV.UK-compatible custom styles
- Added loading overlay styles
- Added card variants (normal, error, success) matching GOV.UK color palette

### ✅ 3. Alert Component ([src/components/alert.js](src/components/alert.js))
Transformed from Tailwind alerts to GOV.UK notification banners:
- **Success**: Uses `govuk-notification-banner--success` class
- **Danger**: Uses standard notification banner with `role="alert"`
- **Warning**: Uses standard notification banner with warning context
- **Info**: Default notification banner with `role="region"`

**Example Usage:**
```jsx
<Alert type="success" title="Success">
  Your changes have been saved
</Alert>

<Alert type="warning">
  <ul>
    <li>Please ensure WARP is enabled</li>
  </ul>
</Alert>
```

### ✅ 4. Button Component ([src/components/button.js](src/components/button.js))
Transformed to use GOV.UK button patterns:
- **Primary**: Standard `govuk-button`
- **Secondary**: `govuk-button govuk-button--secondary`
- **Warning**: `govuk-button govuk-button--warning`
- **Start**: `govuk-button govuk-button--start` with arrow icon
- Supports both `<button>` and `<a>` elements (when `href` prop provided)
- Proper disabled state with `aria-disabled`
- Backwards compatible with `secondaryColor` prop (ignored)

**Example Usage:**
```jsx
<Button variant="primary" onClick={handleClick}>
  Save changes
</Button>

<Button variant="warning" type="submit">
  Delete account
</Button>

<Button variant="secondary" href="/information">
  Learn more
</Button>
```

## Remaining Transformations

### 🔄 5. NavBar Component ([src/components/navbar.js](src/components/navbar.js))
**Current**: Custom navbar with Tailwind classes and dynamic colors
**Target**: GOV.UK Header pattern

```jsx
// GOV.UK Header Pattern
<header className="govuk-header" role="banner" data-module="govuk-header">
  <div className="govuk-header__container govuk-width-container">
    <div className="govuk-header__logo">
      <a href="/" className="govuk-header__link govuk-header__link--homepage">
        <img src={logoUrl} alt="Logo" className="govuk-header__logotype-crown-fallback-image" />
      </a>
    </div>
    <div className="govuk-header__content">
      <a href="/" className="govuk-header__link govuk-header__service-name">
        Identity and Access Help Page
      </a>
      <nav aria-label="Menu" className="govuk-header__navigation">
        <ul className="govuk-header__navigation-list">
          <li className="govuk-header__navigation-item govuk-header__navigation-item--active">
            <a className="govuk-header__link" href="/access-denied">Access Denied</a>
          </li>
          <li className="govuk-header__navigation-item">
            <a className="govuk-header__link" href="/information">Information</a>
          </li>
          {debugEnabled && (
            <li className="govuk-header__navigation-item">
              <a className="govuk-header__link" href="/debug">Debug</a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  </div>
</header>
```

### 🔄 6. WarpInfo Component ([src/components/warpinfo.js](src/components/warpinfo.js))
**Current**: Custom card with Tailwind styling
**Target**: GOV.UK Panel or Summary List

```jsx
// Option 1: GOV.UK Panel for important status
<div className="govuk-panel govuk-panel--confirmation">
  <h1 className="govuk-panel__title">WARP Connected</h1>
  <div className="govuk-panel__body">
    {userData.user_email}
  </div>
</div>

// Option 2: GOV.UK Summary List for details
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
        <strong className="govuk-tag govuk-tag--green">Correct</strong>
      ) : (
        <strong className="govuk-tag govuk-tag--red">Incorrect</strong>
      )}
      {envVars.ORGANIZATION_NAME}
    </dd>
  </div>
</dl>
```

### 🔄 7. Posture Component ([src/components/posture.js](src/components/posture.js))
**Current**: Custom list with icons
**Target**: GOV.UK Task List or Summary List with Tags

```jsx
<h2 className="govuk-heading-m">Device Posture Requirements</h2>
<ul className="govuk-task-list">
  <li className="govuk-task-list__item">
    <span className="govuk-task-list__name-and-hint">
      <span className="govuk-task-list__name">Security Key</span>
    </span>
    {securityKey === "Security Key in Use" ? (
      <strong className="govuk-tag govuk-tag--green govuk-task-list__tag">Complete</strong>
    ) : (
      <strong className="govuk-tag govuk-tag--red govuk-task-list__tag">Required</strong>
    )}
  </li>
  <li className="govuk-task-list__item">
    <span className="govuk-task-list__name-and-hint">
      <span className="govuk-task-list__name">CrowdStrike Posture</span>
    </span>
    {crowdstrikeStatus?.includes("successful") ? (
      <strong className="govuk-tag govuk-tag--green govuk-task-list__tag">Pass</strong>
    ) : (
      <strong className="govuk-tag govuk-tag--red govuk-task-list__tag">Fail</strong>
    )}
  </li>
  <li className="govuk-task-list__item">
    <span className="govuk-task-list__name-and-hint">
      <span className="govuk-task-list__name">Operating System</span>
      <span className="govuk-task-list__hint">Version check for security patches</span>
    </span>
    {osStatus.passed ? (
      <strong className="govuk-tag govuk-tag--green govuk-task-list__tag">Up to date</strong>
    ) : (
      <strong className="govuk-tag govuk-tag--red govuk-task-list__tag">Update required</strong>
    )}
  </li>
</ul>
```

### 🔄 8. DeviceInfo Component ([src/components/deviceinfo.js](src/components/deviceinfo.js))
**Current**: Custom card with list
**Target**: GOV.UK Summary List

```jsx
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
```

### 🔄 9. History Component ([src/components/history.js](src/components/history.js))
**Current**: Custom HTML table with Tailwind
**Target**: GOV.UK Table

```jsx
<h2 className="govuk-heading-m">Recent Access Login Failures</h2>
<table className="govuk-table">
  <caption className="govuk-table__caption govuk-table__caption--s">
    Failed login attempts in the last 10 minutes
  </caption>
  <thead className="govuk-table__head">
    <tr className="govuk-table__row">
      <th scope="col" className="govuk-table__header">Date</th>
      <th scope="col" className="govuk-table__header">Time</th>
      <th scope="col" className="govuk-table__header">Application</th>
      <th scope="col" className="govuk-table__header">Reason</th>
    </tr>
  </thead>
  <tbody className="govuk-table__body">
    {loginHistory.map((entry, index) => (
      <tr key={index} className="govuk-table__row">
        <td className="govuk-table__cell">{entry.date}</td>
        <td className="govuk-table__cell">{entry.time}</td>
        <td className="govuk-table__cell">{entry.applicationName}</td>
        <td className="govuk-table__cell">
          <strong className="govuk-tag govuk-tag--red">{entry.reason.label}</strong>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

### 🔄 10. AccessDenied Page ([src/Pages/AccessDenied.js](src/Pages/AccessDenied.js))
**Current**: Tailwind-based layout with custom classes
**Target**: GOV.UK Width Container and Grid System

```jsx
<div className="govuk-width-container">
  <main className="govuk-main-wrapper" id="main-content" role="main">
    <h1 className="govuk-heading-xl">Access Denied</h1>

    <OriginalUrl />

    <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

    <h2 className="govuk-heading-l">Overview</h2>
    <p className="govuk-body">
      One of the following sections describes why you were denied access...
    </p>

    <Alert type="info">
      Please review the provided information in order to troubleshoot...
    </Alert>

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

    <div className="govuk-body">
      <p>Consult the information below for further details...</p>
      <a href="mailto:IT@example.com">
        <Button variant="secondary">Contact Support</Button>
      </a>
    </div>

    <AccessDeniedInfo />
  </main>
</div>
```

### 🔄 11. Debug Page ([src/Pages/Debug.js](src/Pages/Debug.js))
**Current**: Custom collapsible sections
**Target**: GOV.UK Details (Accordion) Component

```jsx
<div className="govuk-width-container">
  <main className="govuk-main-wrapper">
    <h1 className="govuk-heading-xl">Debug Information</h1>

    <details className="govuk-details">
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">
          get-identity response
        </span>
      </summary>
      <div className="govuk-details__text">
        <pre style={{backgroundColor: "#f3f2f1", padding: "20px", overflow: "auto"}}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>
    </details>

    <details className="govuk-details">
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">
          Device Posture Information
        </span>
      </summary>
      <div className="govuk-details__text">
        {devicePosture ? (
          <pre style={{backgroundColor: "#f3f2f1", padding: "20px", overflow: "auto"}}>
            {JSON.stringify(devicePosture, null, 2)}
          </pre>
        ) : (
          <p className="govuk-body">No device posture information available.</p>
        )}
      </div>
    </details>

    <div className="govuk-!-margin-top-6">
      <Setup />
    </div>
  </main>
</div>
```

### 🔄 12. Information Page ([src/Pages/Information.js](src/Pages/Information.js))
**Current**: Simple FAQ layout
**Target**: GOV.UK Accordion Pattern

```jsx
<div className="govuk-width-container">
  <main className="govuk-main-wrapper">
    <h1 className="govuk-heading-xl">Information</h1>
    <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

    <h2 className="govuk-heading-l">Frequently Asked Questions</h2>

    <div className="govuk-accordion" data-module="govuk-accordion" id="accordion-default">
      <div className="govuk-accordion__section">
        <div className="govuk-accordion__section-header">
          <h3 className="govuk-accordion__section-heading">
            <span className="govuk-accordion__section-button" id="accordion-default-heading-1">
              How do I identify my current Gateway organization?
            </span>
          </h3>
        </div>
        <div id="accordion-default-content-1" className="govuk-accordion__section-content">
          <p className="govuk-body">
            If you need to confirm the currently enrolled Gateway organization for your WARP client instance,
            run the command <code className="govuk-!-font-size-16">warp-cli registration show</code> in your
            terminal (Linux/MacOS) or command prompt (Windows).
          </p>
        </div>
      </div>

      <div className="govuk-accordion__section">
        <div className="govuk-accordion__section-header">
          <h3 className="govuk-accordion__section-heading">
            <span className="govuk-accordion__section-button" id="accordion-default-heading-2">
              Example FAQ 1
            </span>
          </h3>
        </div>
        <div id="accordion-default-content-2" className="govuk-accordion__section-content">
          <p className="govuk-body">Example answer and details.</p>
        </div>
      </div>
    </div>
  </main>
</div>
```

### 🔄 13. GroupList Component ([src/components/grouplist.js](src/components/grouplist.js))
**Current**: Custom card with search and expand
**Target**: GOV.UK Text Input + Details

```jsx
<div className="govuk-card">
  <h2 className="govuk-heading-m">Your Current Groups</h2>

  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor="group-search">
      Search groups
    </label>
    <input
      className="govuk-input"
      id="group-search"
      name="group-search"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {loading ? (
    <div className="govuk-body">Loading...</div>
  ) : error ? (
    <p className="govuk-error-message">{error}</p>
  ) : (
    <>
      <ul className="govuk-list govuk-list--bullet">
        {filteredGroups.slice(0, expanded ? filteredGroups.length : defaultVisibleGroups).map((group, index) => (
          <li key={index}>{group}</li>
        ))}
      </ul>
      <button
        className="govuk-button govuk-button--secondary"
        onClick={toggleExpand}
      >
        {expanded ? 'Show fewer groups' : 'Show all groups'}
      </button>
    </>
  )}
</div>
```

### 🔄 14. OriginalUrl Component ([src/components/originalurl.js](src/components/originalurl.js))
**Current**: Custom button with Tailwind
**Target**: GOV.UK Warning Button

```jsx
<div className="govuk-!-margin-bottom-4">
  <Button variant="warning" onClick={handleButtonClick}>
    Refresh Access Application
  </Button>
</div>
```

### 🔄 15. Status CSS ([src/components/status.css](src/components/status.css))
**Current**: Custom icon styles with SVG masks
**Target**: GOV.UK Tags and potentially custom icon implementation

Replace icon classes with GOV.UK tags:
- ✓ `check-icon` → `<strong className="govuk-tag govuk-tag--green">✓</strong>`
- ✗ `cross-icon` → `<strong className="govuk-tag govuk-tag--red">✗</strong>`
- ℹ `info-icon` → `<strong className="govuk-tag govuk-tag--grey">ℹ</strong>`

Or use GOV.UK warning text for critical information:
```jsx
<div className="govuk-warning-text">
  <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong className="govuk-warning-text__text">
    <span className="govuk-visually-hidden">Warning</span>
    WARP is not enabled
  </strong>
</div>
```

## Loading Spinner Transformation

Replace `react-loader-spinner` MutatingDots with GOV.UK-styled loading state:

```jsx
// GOV.UK Loading Pattern
{loadingPage && (
  <div className="loading-overlay">
    <div className="govuk-panel" style={{backgroundColor: 'transparent', border: 'none'}}>
      <p className="govuk-heading-l">Checking your connection</p>
      <p className="govuk-body">Please wait...</p>
    </div>
  </div>
)}
```

Or use a simple animated spinner:
```css
.govuk-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1d70b8;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Color Palette Mapping

### Tailwind → GOV.UK Colors

| Tailwind Class | GOV.UK Equivalent | Hex Code |
|---------------|-------------------|----------|
| `bg-steel` | Background grey | `#f3f2f1` |
| `text-gray-dark` | Text black | `#0b0c0c` |
| `border-gray-light` | Border grey | `#b1b4b6` |
| `bg-red` | Error red | `#d4351c` |
| `bg-alert-green` | Success green | `#00703c` |
| `bg-yellow` | Warning yellow | `#ffdd00` |
| `bg-blue` | Information blue | `#1d70b8` |

## Package.json Changes

Remove Tailwind dependencies:
```bash
npm uninstall tailwindcss autoprefixer postcss
```

The `tailwind.config.js` file can be deleted.

## Build Configuration

No changes needed to `wrangler.toml` or build commands. The React build process remains the same, just replacing CSS frameworks.

## Testing Checklist

- [ ] Header navigation works on mobile and desktop
- [ ] All buttons are keyboard accessible
- [ ] Notification banners appear correctly
- [ ] Tables are responsive
- [ ] Forms follow GOV.UK patterns
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] JavaScript `GOVUKFrontend.initAll()` initializes correctly
- [ ] Accordion components expand/collapse properly
- [ ] Loading states display appropriately
- [ ] Error states use correct GOV.UK patterns

## Resources

- [GOV.UK Design System Documentation](https://design-system.service.gov.uk/)
- [GOV.UK Frontend GitHub](https://github.com/alphagov/govuk-frontend)
- Private CDN: `https://govuk.prodcdn.com/5.13.0/`
- Version: 5.13.0
