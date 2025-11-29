import React, { useEffect, useRef } from "react";

const Information = () => {
  const accordionRef = useRef(null);

  useEffect(() => {
    // Initialize GOV.UK Accordion if the JavaScript is available
    if (window.GOVUKFrontend && window.GOVUKFrontend.Accordion && accordionRef.current) {
      new window.GOVUKFrontend.Accordion(accordionRef.current);
    }
  }, []);

  return (
    <div className="bg-steel min-h-screen">
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper">
          <h1 className="govuk-heading-xl" style={{ textAlign: "center" }}>Information</h1>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

          {/* FAQs Section */}
          <h2 className="govuk-heading-l">Frequently Asked Questions</h2>

          <div className="govuk-accordion" data-module="govuk-accordion" id="accordion-default" ref={accordionRef}>
            <div className="govuk-accordion__section">
              <div className="govuk-accordion__section-header">
                <h3 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button" id="accordion-default-heading-1">
                    How do I identify my current Gateway organization?
                  </span>
                </h3>
              </div>
              <div id="accordion-default-content-1" className="govuk-accordion__section-content" aria-labelledby="accordion-default-heading-1">
                <p className="govuk-body">
                  If you need to confirm the currently enrolled Gateway organization
                  for your WARP client instance, run the command{" "}
                  <code>warp-cli registration show</code> in your terminal
                  (Linux/MacOS) or command prompt (Windows).
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
              <div id="accordion-default-content-2" className="govuk-accordion__section-content" aria-labelledby="accordion-default-heading-2">
                <p className="govuk-body">Example answer and details.</p>
              </div>
            </div>

            <div className="govuk-accordion__section">
              <div className="govuk-accordion__section-header">
                <h3 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button" id="accordion-default-heading-3">
                    Example FAQ 2
                  </span>
                </h3>
              </div>
              <div id="accordion-default-content-3" className="govuk-accordion__section-content" aria-labelledby="accordion-default-heading-3">
                <p className="govuk-body">
                  https://developers.cloudflare.com/cloudflare-one/faq/troubleshooting/
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Information;
