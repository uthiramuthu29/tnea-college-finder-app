import { useState, useEffect } from "react";
import "./scss/collegeFinder.scss";
import CollegeResults from "./CollegeResults";

export default function CollegeFinder() {
  const [community, setCommunity] = useState("");
  const [error, setError] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cutoff, setCutoff] = useState(0);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [collegeData, setCollegeData] = useState([]);
  const [submitted, setSubmitted] = useState(false); // track form submission

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
      return (
        college.District?.trim() === selectedDistrict &&
        parseFloat(college[community]) <= parseFloat(cutoff)
      );
    });
    setFilteredColleges(filtered);
  }

  return (
    <>
      <div className="container">
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
                onChange={(event) => setSelectedDistrict(event.target.value)}
              >
                <option value="">--Select--</option>
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
                min={70}
                max={200}
                required
                onChange={(event) => setCutoff(event.target.value)}
              />
            </div>

            <button className="submit">Submit</button>
          </form>

          
        </div>
        {/* College Result Component */}
          {submitted && (<CollegeResults colleges={filteredColleges} submitted={submitted} selectedCommunity={community} />)}
      </div>
    </>
  );
}
