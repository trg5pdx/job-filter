import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import Card from "./components/card";

import preactLogo from "./assets/preact.svg";
import "./style.css";

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakerapi.it/api/v1/companies?_quantity=25")
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
        setJobs(res.data.data);
        setLoading(false);
        console.log(jobs);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <Card job={job} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function App() {
  return (
    <div>
      Wow
      <JobListings />
    </div>
  );
}

render(<App />, document.getElementById("app"));
