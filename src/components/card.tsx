import { useState } from 'preact/hooks'
import { JobData, Pay } from '../utils/jobdata'
import { Button } from './inputs'
import htmr from 'htmr'

function format_industries(job_industries: string[]) {
  return job_industries.flatMap((val, i) => {
    if (i == job_industries.length - 1) {
      return val
    }
    return val.concat(', ')
  })
}

function format_pay(wage: Pay) {
  if (!wage.provided) {
    return 'Pay not provided'
  }
  // Removed decimal following: https://stackoverflow.com/a/65312353
  let salaryMin = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: wage.currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(wage.salaryMin)

  if (wage.salaryMax == undefined) {
    return `Salary: ${salaryMin} and up`
  }

  let salaryMax = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: wage.currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(wage.salaryMax)

  return `Salary: ${salaryMin} - ${salaryMax}`
}

export default function Card(props: { job: JobData }) {
  const [details, openDetails] = useState(false)
  const buttonClosed = 'transition text-8xl'
  const buttonOpened = `rotate-90 ${buttonClosed}`
  const locations = props.job.location.map((val, key) => {
    return (
      <div
        key={key}
        className={`rounded-lg bg-seconary-400 text-black dark:bg-secondary-700 
        dark:text-white w-fit p-1 m-1`}
      >
        {val}
      </div>
    )
  })
  const job_industries = format_industries(props.job.jobIndustry)
  const wage = format_pay(props.job.wage)

  return (
    <li
      className={`mb-5 p-5 dark:bg-primary-900 bg-primary-300 dark:text-white 
       text-black grid grid-cols-7 rounded-xl border-2 
       dark:border-secondary-500 border-secondary-900`}
    >
      <img
        src={props.job.logo}
        className="row-span-2 scale-75 rounded-2xl z-20"
      />
      <div className="col-span-5">
        <h3 className="text-bold text-3xl">{props.job.title}</h3>
        <h4 className="text-bold text-2xl">{props.job.company}</h4>
        <h5 className="text-bold text-xl flex flex-row flex-wrap">
          Location: {locations}
        </h5>
        <h5 className="text-bold text-xl">Industry: {job_industries}</h5>
        <h6 className="text-bold text-xl">{wage}</h6>
      </div>
      <button
        onClick={() => openDetails(!details)}
        className={details ? buttonOpened : buttonClosed}
      >
        {'>'}
      </button>
      {details ? (
        <div className="transition col-span-7">
          <hr className="m-6" />
          <h6 className="lg:pl-6 lg:pr-6">{props.job.companyDesc}</h6>
          <hr className="m-6" />
          <p className={`[&_ul]:list-disc [&_li]:ml-4 lg:pl-6 lg:pr-6`}>
            {htmr(props.job.desc)}
          </p>
          <hr className="m-6" />
          <div className="flex justify-between">
            <a
              className="underline text-bold p-2 hover:text-blue-500"
              href={props.job.link}
            >
              Jobicy posting
            </a>
            <Button
              id="close"
              child="Close Description"
              onClick={() => openDetails(!details)}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </li>
  )
}
