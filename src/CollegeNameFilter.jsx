export default function CollegeSearchFilter({
  collegeCode,
  setCollegeCode,
  collegeName,
  setCollegeName,
  handleCollegeFilterSubmit,
}) {
  return (
    <form onSubmit={handleCollegeFilterSubmit} className="college-name-filter">
      <div className="form-text">
        <label htmlFor="collegeCode">College Code:</label>
        <input
          type="text"
          id="collegeCode"
          value={collegeCode}
          onChange={(e) => setCollegeCode(e.target.value)}
        />
      </div>

      <p className="text-center">or</p>

      <div className="form-text">
        <label htmlFor="collegeName">College Name:</label>
        <input
          type="text"
          id="collegeName"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />
      </div>

      <button type="submit" className="submit">Filter</button>
    </form>
  );
}
