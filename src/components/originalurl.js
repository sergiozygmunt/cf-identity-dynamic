import React, { useEffect, useState } from 'react';

const OriginalUrl = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [isUrlValid, setIsUrlValid] = useState(true);

    useEffect(() => {
        // Extract the original_url parameter from the URL query string
        const urlParams = new URLSearchParams(window.location.search);
        const original_url = urlParams.get('original_url');

        if (original_url) {
            try {
                let url = new URL(original_url);
                setOriginalUrl(url.href);
            } catch (error) {
                // If there is an error parsing the URL, assume it's a relative URL or a typo and prepend "https://"
                setOriginalUrl(`https://${original_url}`);
            }
        } else {
            setIsUrlValid(false);
        }
    }, []);

    const handleButtonClick = () => {
        window.location.href = originalUrl;
    };

    if (!isUrlValid) {
        return null;
    }

    return (
        <div className="govuk-!-margin-bottom-4">
            <button onClick={handleButtonClick} className="govuk-button govuk-button--warning" data-module="govuk-button">
                Refresh Access Application
            </button>
        </div>
    );
};

export default OriginalUrl;
