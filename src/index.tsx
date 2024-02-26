import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import Card from "./components/card";
import SearchQuery from "./components/query";
import { GetJobListings } from "./utils/listings";
import { Query } from "./utils/query";
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
  const [query, setQuery] = useState(new Query());

  const filterQuery = (
    search: string,
    pay_range: string,
    pay_min: number,
    pay_max: number,
    companies: string,
    remote: bool,
    inperson: bool,
    hybrid: bool,
    location: string,
    board: [jobBoards]
  ) => {
    let current = new Query(
      search,
      pay_range,
      pay_min,
      pay_max,
      companies,
      remote,
      inperson,
      hybrid,
      location,
      board
    );
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div>
      <SearchQuery query={query} setQuery={filterQuery} />
      <JobListings />
    </div>
  );
}

render(<App />, document.getElementById("app"));
