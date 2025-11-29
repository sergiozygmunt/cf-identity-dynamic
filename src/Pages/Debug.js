import React, { useEffect, useState, useCallback } from "react";
import Setup from "../components/setup";

const Debug = () => {
  const [debugInfo, setDebugInfo] = useState(null);
  const [devicePosture, setDevicePosture] = useState(null);
  const [error, setError] = useState(null);

  const forcePageReload = () => {
    window.location.reload();
  };

  const fetchDebugInfo = useCallback(async (retry = 1) => {
    try {
      const response = await fetch("/api/debug", { cache: "no-store" });
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("text/html")) {
        throw new Error("Session expired or invalid response");
      }

      const data = await response.json();

      setDebugInfo(data);

      if (data && data.devicePosture) {
        setDevicePosture(data.devicePosture);
      }

      setError(null);
    } catch (error) {
      console.error("Error fetching debug information:", error.message);

      // Retry logic for invalid session or response error
      if (retry > 0) {
        console.log("Retrying fetch for fresh session...");
        setTimeout(() => fetchDebugInfo(retry - 1), 1000);
      } else {
        setError("Session expired. Refreshing for a new session...");
        setTimeout(() => {
          forcePageReload();
        }, 1000);
      }
    }
  }, []);

  useEffect(() => {
    fetchDebugInfo();
  }, [fetchDebugInfo]);

  return (
    <div className="bg-steel min-h-screen">
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper">
          <h1 className="govuk-heading-xl">
            Debug Information
          </h1>

          {/* GOV.UK Details component for get-identity */}
          <details className="govuk-details">
            <summary className="govuk-details__summary">
              <span className="govuk-details__summary-text">
                get-identity response
              </span>
            </summary>
            <div className="govuk-details__text">
              {error ? (
                <p className="text-red">{error}</p>
              ) : (
                <pre style={{ backgroundColor: "#f3f2f1", padding: "1rem", borderRadius: "4px" }}>
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              )}
            </div>
          </details>

          {/* GOV.UK Details component for Device Posture */}
          <details className="govuk-details">
            <summary className="govuk-details__summary">
              <span className="govuk-details__summary-text">
                Device Posture Information
              </span>
            </summary>
            <div className="govuk-details__text">
              {devicePosture ? (
                <div>
                  <p className="govuk-body">Device Posture details:</p>
                  <div style={{ backgroundColor: "#f3f2f1", padding: "1rem", borderRadius: "4px" }}>
                    {Object.keys(devicePosture).map((key) => (
                      <div key={key} style={{ marginBottom: "1.5rem" }}>
                        <h3 className="govuk-heading-s">
                          {devicePosture[key].rule_name || "Unnamed Rule"} (
                          {devicePosture[key].type})
                        </h3>
                        <p className="govuk-body">
                          <strong>Success:</strong>{" "}
                          {devicePosture[key].success ? "Yes" : "No"}
                        </p>
                        <p className="govuk-body">
                          <strong>Error:</strong>{" "}
                          {devicePosture[key].error || "No errors"}
                        </p>
                        <p className="govuk-body">
                          <strong>Timestamp:</strong>{" "}
                          {new Date(
                            devicePosture[key].timestamp
                          ).toLocaleString()}
                        </p>
                        <pre style={{ backgroundColor: "#ffffff", padding: "0.5rem", borderRadius: "4px", marginTop: "0.5rem" }}>
                          {JSON.stringify(devicePosture[key].input, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="govuk-body">
                  No device posture information available.
                </p>
              )}
            </div>
          </details>

          <div className="p-4 border border-gray-light rounded-lg bg-white mt-6">
            <Setup />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Debug;
