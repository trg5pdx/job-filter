import { render } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Card from './components/card'
import SearchQuery from './components/query'
// import Modal from './components/modal'
import { GetJobListings } from './utils/listings'
import { Query, filter_jobs } from './utils/query'
import { JobData } from './utils/jobdata'
import './style.css'

function JobListings(props: { query: Query }) {
  const [jobs, setJobs] = useState<JobData[]>([])
  const [pulledJobs, setPulledJobs] = useState<JobData[]>([])
  const [loading, setLoading] = useState(true)

  const jobsFormatted = jobs.map((job, key) => {
    return (
      <li key={key}>
        <Card job={job} />
      </li>
    )
  })

  useEffect(() => {
    GetJobListings().then((val) => {
      setPulledJobs(val)
      setJobs(val)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    let filtered = filter_jobs(pulledJobs, props.query)
    setJobs(filtered)
  }, [props.query, pulledJobs])

  return (
    <div className="m-4">
      {loading ? <p>loading...</p> : <ul>{jobsFormatted}</ul>}
    </div>
  )
}

export function App() {
  const [query, setQuery] = useState<Query>({
    search: '',
    excluded_title: '',
    excluded_desc: '',
    wage: {
      includeSalary: true,
      includeHourly: true,
      includeNoProvidedPay: true,
    },
    remote: true,
    hybrid: true,
    inperson: true
  })
  /* const [modalView, setModalView] = useState(false)
  const [modalChild, setModalChild] = useState(<></>) */

  return (
    <div className="lg:grid lg:grid-cols-4">
      <SearchQuery query={query} setQuery={setQuery} />
      <div className="lg:col-span-3">
        <JobListings query={query} />
      </div>
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
