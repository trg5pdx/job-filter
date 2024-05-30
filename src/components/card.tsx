import { useState } from 'preact/hooks'
import { JobData } from '../utils/jobdata'
import { Button } from './inputs'
import htmr from 'htmr'

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
        <h5 className="text-bold text-xl">Industry: {props.job.jobIndustry}</h5>
        <h6 className="text-bold text-xl">
          {props.job.wage.provided
            ? `Pay range: ${props.job.wage.salaryMin} - ${props.job.wage.salaryMax}`
            : 'Pay not provided'}
        </h6>
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
          <h6>{props.job.companyDesc}</h6>
          <hr className="m-6" />
          <p className={`[&_ul]:list-disc [&_li]:ml-4`}>
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
