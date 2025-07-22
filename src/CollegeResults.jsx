export default function CollegeResults({
  colleges,
  submitted,
  selectedCommunity,
}) {
  if (!submitted) return null;

  if (!colleges || colleges.length === 0) {
    return <p>No colleges match the selected criteria.</p>;
  }

  return (

      <div className="table-responsive table-scroller">
        {submitted && colleges?.length > 0 ? (
          <table className="table table-striped-columns table-bordered college-results">
            <thead>
              <tr>
                <th>College Code</th>
                <th>College Name</th>
                <th>District</th>
                <th>Branch</th>
                <th>Community</th>
                <th>Cutoff</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((college, index) => (
                <tr key={index}>
                  <td>{college["College Code"]}</td>
                  <td>{college["College Name"]}</td>
                  <td>{college["District"]}</td>
                  <td>{college["Branch Name"]}</td>
                  <td>{selectedCommunity}</td>
                  <td>{college[selectedCommunity]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : submitted ? (
          <p className="mt-3">No colleges match the selected criteria.</p>
        ) : null}
      </div>
  );
}

// npx json-server --watch data/dummyData.json --port 3000 --static ./data
