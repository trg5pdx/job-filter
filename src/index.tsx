import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import Card from "./components/card";
import SearchQuery from "./components/query";
import { GetJobListings } from "./utils/listings";
import { Query, workOptions, jobBoards } from "./utils/query";
import { Pay } from "./utils/jobdata";
import "./style.css";

function JobListings(props: { query: Query }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetJobListings().then((val) => {
      setJobs(val);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(props.query);
  }, [props.query]);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <ul>
          {jobs.map((job) => {
            if (props.query.wage) {
              if (
                job.wage.salaryMin >= props.query.wage.salaryMin &&
                job.wage.salaryMax <= props.query.wage.salaryMax
              ) {
                return <Card key={job.id} job={job} />;
              } else {
                return <></>;
              }
            } else {
              return <Card key={job.id} job={job} />;
            }
          })}
        </ul>
      )}
    </div>
  );
}

export function App() {
  const [query, setQuery] = useState<Query>("");

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
    let wage: Pay = {
      provided: true,
      salaryMin: pay_min,
      salaryMax: pay_max,
    };
    let options = [workOptions.Remote];
    let boards = [jobBoards.jobicy];
    let current: Query = {
      search,
      wage,
      companies,
      options,
      location,
      boards,
    };

    setQuery(current);
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div>
      <SearchQuery query={query} setQuery={filterQuery} />
      <JobListings query={query} />
    </div>
  );
}

render(<App />, document.getElementById("app"));
