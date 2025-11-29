import React, { useEffect, useState } from 'react';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const defaultVisibleGroups = 5; // this can be changed, for now its 5

  const filteredGroups = groups
    .filter(group =>
      group.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b)); // Sort alphabetically

  // expand the group list
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Fetch groups from the get-identity API
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch('/api/userdetails');
        const data = await response.json();

        if (data && data.identity && data.identity.groups) {
          setGroups(data.identity.groups);
        } else {
          setError('No group data available');
        }
      } catch (err) {
        console.error('Error fetching group data:', err);
        setError('Error fetching group data');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, []);

  return (
    <div className="govuk-card">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <h2 className="govuk-heading-m">Your Current Groups</h2>
        </div>
        <div className="govuk-grid-column-one-half">
          <div className="govuk-form-group">
            <input
              type="text"
              id="searchBox"
              placeholder="Search groups"
              className="govuk-input"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="govuk-body">Loading group information...</p>
      ) : error ? (
        <p className="govuk-body govuk-error-message">{error}</p>
      ) : (
        <>
          <ul className={`govuk-list govuk-list--bullet ${!expanded ? 'group-list-collapsed' : ''}`}>
            {filteredGroups.slice(0, expanded ? filteredGroups.length : defaultVisibleGroups).map((group, index) => (
              <li key={index}>{group}</li>
            ))}
          </ul>

          <button
            className="govuk-button govuk-button--secondary"
            data-module="govuk-button"
            onClick={toggleExpand}
          >
            {expanded ? 'Collapse list' : 'Expand list'}
          </button>
        </>
      )}
    </div>
  );
};

export default GroupList;
