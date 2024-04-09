import { render } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Card from './components/card'
import SearchQuery from './components/query'
// import Modal from './components/modal'
import { GetJobListings } from './utils/listings'
import { Query, filter_jobs } from './utils/query'
// import { Pay } from './utils/jobdata'
import './style.css'

function JobListings(props: { query: Query }) {
  const [jobs, setJobs] = useState([])
  const [pulledJobs, setPulledJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const format_jobs = (jobs) => {
    return jobs.map((job, key) => {
      return (
        <li key={key}>
          <Card key={job.id} job={job} />
        </li>
      )
    })
  }

  useEffect(() => {
    GetJobListings().then((val) => {
      setPulledJobs(val)
      setJobs(val)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    console.log(props.query)
    console.log(jobs)
    let filtered = filter_jobs(pulledJobs, props.query)
    console.log(filtered)
    setJobs(filtered)
  }, [props.query])

  return <div>{loading ? <p>loading...</p> : <ul>{format_jobs(jobs)}</ul>}</div>
}

export function App() {
  const [query, setQuery] = useState<Query>({ search: '' })
  /* const [modalView, setModalView] = useState(false)
  const [modalChild, setModalChild] = useState(<></>) */

  useEffect(() => {
    console.log(query)
  }, [query])

  return (
    <div>
      <SearchQuery query={query} setQuery={setQuery} />
      <JobListings query={query} />
      {/* <Modal
        viewModal={modalView}
        setModalView={() => setModalView(!modalView)}
        buttonText="bleh"
        child={modalChild}
    /> */}
    </div>
  )
}

render(<App />, document.getElementById('app'))
