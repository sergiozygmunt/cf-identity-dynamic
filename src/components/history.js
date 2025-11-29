import React, { useEffect, useState } from "react";
import "./status.css";

const History = ({ onLoaded }) => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [warpEnabled, setWarpEnabled] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("History: Fetching WARP status...");

        // Fetch WARP status from trace
        const traceResponse = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
        const traceText = await traceResponse.text();
        const warpStatus = traceText.includes("warp=on");
        setWarpEnabled(warpStatus);

        if (!warpStatus) {
          console.warn("History: WARP is not enabled.");
          setLoginHistory(null);
          if (onLoaded) onLoaded();  // send loading status back to accessdenied.js
          return;
        }

        console.log("History: Fetching login history...");
        // Fetch login history
        const response = await fetch("/api/history");
        if (!response.ok) {
          if (response.status >= 400 && response.status < 500) {
            setLoginHistory(null); // No login history available
          } else {
            throw new Error("Failed to fetch login history");
          }
        } else {
          const data = await response.json();
          const historyEntries = data?.loginHistory || [];

          if (historyEntries.length === 0) {
            console.warn("History: No login failures found.");
            setLoginHistory(null); // No login failures
          } else {
            const historyData = historyEntries.slice(-3).map((entry) => ({
              date: new Date(entry.dimensions.datetime).toLocaleDateString(),
              time: new Date(entry.dimensions.datetime).toLocaleTimeString(),
              applicationName: entry.applicationName || "Unknown App",
              reason: getReason(entry.dimensions),
            }));
            setLoginHistory(historyData);
          }
        }

        console.log("History: Data fetch complete.");
      } catch (error) {
        console.error("History: Error fetching data:", error);
        setErrorMessage("Error fetching login history. Please try again later.");
      } finally {
        if (onLoaded) onLoaded();
      }
    };

    const getReason = ({ hasGatewayEnabled, hasWarpEnabled }) => {
      if (hasGatewayEnabled === 0) {
        return { label: "Gateway", color: "bg-red" };
      }
      if (hasWarpEnabled === 0) {
        return { label: "WARP", color: "bg-red" };
      }
      return { label: "Other", color: "bg-red" };
    };

    fetchData();
  }, [onLoaded]);

  return (
    <div className={warpEnabled ? "govuk-card" : "govuk-card govuk-card--error"}>
      {warpEnabled ? (
        <>
          <h2 className="govuk-heading-m">Recent Access Login Failures</h2>
          {loginHistory ? (
            <table className="govuk-table">
              <caption className="govuk-table__caption govuk-table__caption--s govuk-visually-hidden">
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
          ) : (
            <p className="govuk-body">No recent Access login failures observed.</p>
          )}
        </>
      ) : (
        <div className="govuk-warning-text">
          <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
          <strong className="govuk-warning-text__text">
            <span className="govuk-visually-hidden">Warning</span>
            {errorMessage || "Please enable WARP to view detailed login history."}
          </strong>
        </div>
      )}
      {errorMessage && <p className="govuk-error-message">{errorMessage}</p>}
    </div>
  );
};

export default History;
