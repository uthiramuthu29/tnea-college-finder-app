import { useState, useEffect } from "react";
import "./scss/collegeFinder.scss";
import CollegeResults from "./CollegeResults";
import CollegeSearchFilter from "./CollegeNameFilter";

export default function CollegeFinder() {
  const [community, setCommunity] = useState("");
  const [error, setError] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cutoff, setCutoff] = useState(0);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [collegeData, setCollegeData] = useState([]);
  const [submitted, setSubmitted] = useState(false); // track form submission
  const [collegeCode, setCollegeCode] = useState("");
  const [collegeName, setCollegeName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      fetch("/collegeData.json") // update this URL if needed
        .then((response) => {
          if (!response.ok) {
            throw new Error("Couldn't retrieve data");
          }
          return response.json();
        })
        .then((data) => {
          if (!Array.isArray(data)) {
            throw new Error("Invalid data format");
          }

          setCollegeData(data);
          const uniqueDistricts = [
            ...new Set(data.map((college) => college.District?.trim())),
          ];
          setDistricts(uniqueDistricts);
        })
        .catch((error) => {
          console.error(error.message);
          setError(error.message);
        });
    }, 1000);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    const filtered = collegeData.filter((college) => {
      const matchesDistrict =
        selectedDistrict === "All" ||
        college.District?.trim() === selectedDistrict;

      const matchesCommunityCutoff =
        parseFloat(college[community]) <= parseFloat(cutoff);

      return matchesDistrict && matchesCommunityCutoff;
    });

    // Sort by cutoff descending
    filtered.sort(
      (a, b) => parseFloat(b[community]) - parseFloat(a[community])
    );

    setFilteredColleges(filtered);
  }

  function handleCollegeFilterSubmit(event) {
    event.preventDefault();

    const filtered = collegeData.filter((college) => {
      const matchesDistrict =
        selectedDistrict === "All" ||
        college.District?.trim() === selectedDistrict;

      const matchesCommunityCutoff =
        parseFloat(college[community]) <= parseFloat(cutoff);

      const matchesCollegeCode =
        collegeCode === "" ||
        String(college["College Code"]).includes(collegeCode.trim());

      const matchesCollegeName =
        collegeName === "" ||
        college["College Name"]
          .toLowerCase()
          .includes(collegeName.trim().toLowerCase());

      return (
        matchesDistrict &&
        matchesCommunityCutoff &&
        matchesCollegeCode &&
        matchesCollegeName
      );
    });

    filtered.sort(
      (a, b) => parseFloat(b[community]) - parseFloat(a[community])
    );

    setFilteredColleges(filtered);
  }

  return (
    <>
      <section className="tnea-college-finder-app">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="find-you-college">
                <h2>Find your College</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                  {/* Community Dropdown */}
                  <div className="form-dropdown">
                    <label htmlFor="community">Community: </label>
                    <select
                      name="community"
                      id="community"
                      value={community}
                      onChange={(event) => setCommunity(event.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="OC">OC</option>
                      <option value="BC">BC</option>
                      <option value="BCM">BCM</option>
                      <option value="MBC">MBC</option>
                      <option value="MBCDNC">MBCDNC</option>
                      <option value="MBCV">MBCV</option>
                      <option value="SC">SC</option>
                      <option value="SCA">SCA</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>

                  {/* District Dropdown */}
                  <div className="form-dropdown">
                    <label htmlFor="district"> District: </label>
                    <select
                      name="district"
                      id="district"
                      value={selectedDistrict}
                      onChange={(event) =>
                        setSelectedDistrict(event.target.value)
                      }
                    >
                      <option value="">--Select--</option>
                      <option value="All">All Districts</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-text">
                    <label htmlFor="cutoff"> Cutoff: </label>
                    <input
                      type="number"
                      id="cutoff"
                      className="cutoff"
                      name="cutoff"
                      value={cutoff}
                      step={0.1}
                      min={70}
                      max={200}
                      required
                      onChange={(event) => setCutoff(event.target.value)}
                    />
                  </div>

                  <button className="submit">Submit</button>
                </form>
                <div className="d-lg-none d-block">
                <CollegeSearchFilter
                  collegeCode={collegeCode}
                  setCollegeCode={setCollegeCode}
                  collegeName={collegeName}
                  setCollegeName={setCollegeName}
                  handleCollegeFilterSubmit={handleCollegeFilterSubmit}
                />
              </div>
              </div>
              
              {/* College Result Component */}
              <div className="table-wrapper">
                {submitted && (
                  <CollegeResults
                    colleges={filteredColleges}
                    submitted={submitted}
                    selectedCommunity={community}
                  />
                )}
              </div>
            </div>
            <div className="col-lg-4 vh-100 d-none d-lg-block filter-border">
              <div className="d-flex h-100 align-items-center justify-content-center">
                <CollegeSearchFilter
                  collegeCode={collegeCode}
                  setCollegeCode={setCollegeCode}
                  collegeName={collegeName}
                  setCollegeName={setCollegeName}
                  handleCollegeFilterSubmit={handleCollegeFilterSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
