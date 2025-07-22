import Select from "react-select";

export default function CollegeSearchFilter({
  collegeCode,
  setCollegeCode,
  collegeName,
  setCollegeName,
  handleCollegeFilterSubmit,
  collegeData,
  isSearchSubmitted,
}) {
  const hasData = collegeData && collegeData.length > 0;

  const collegeCodeOptions = hasData
    ? Array.from(new Set(collegeData.map((college) => college["College Code"])))
        .filter(Boolean)
        .map((code) => ({
          value: code,
          label: code, // only code, not name
        }))
    : [];

  const collegeNameOptions = hasData
    ? Array.from(
        new Set(collegeData.map((college) => college["College Name"]))
      )
        .filter(Boolean)
        .map((name) => ({
          value: name,
          label: name,
        }))
    : [];

  return (
    <div className="college-name-filter">
      <form onSubmit={handleCollegeFilterSubmit}>
        {!isSearchSubmitted || !hasData ? (
          <p className="text-center small text-muted">
            🔍 Please select community, district & enter cutoff to view college filters.
          </p>
        ) : (
          <>
            <div className="form-text">
              <label htmlFor="collegeCode">College Code:</label>
              <Select
                id="collegeCode"
                options={collegeCodeOptions}
                value={collegeCodeOptions.find((opt) => opt.value === collegeCode)}
                onChange={(selected) =>
                  setCollegeCode(selected ? selected.value : "")
                }
                isClearable
                placeholder="Select College Code"
              />
            </div>

            <p className="text-center">or</p>

            <div className="form-text">
              <label htmlFor="collegeName">College Name:</label>
              <Select
                id="collegeName"
                options={collegeNameOptions}
                value={collegeNameOptions.find((opt) => opt.value === collegeName)}
                onChange={(selected) =>
                  setCollegeName(selected ? selected.value : "")
                }
                isClearable
                placeholder="Select College Name"
              />
            </div>

            <button type="submit" className="submit">
              Filter
            </button>
          </>
        )}
      </form>
    </div>
  );
}
