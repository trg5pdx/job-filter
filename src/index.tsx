import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import Card from "./components/card";
import SearchQuery from "./components/query";
import { GetJobListings } from "./utils/listings";
import "./style.css";

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetJobListings().then((val) => {
      setJobs(val);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function App() {
  return (
    <div>
      <SearchQuery />
      <JobListings />
    </div>
  );
}

render(<App />, document.getElementById("app"));
