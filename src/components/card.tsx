import { useState } from "preact/hooks";
import JobData from "../utils/jobdata";

export default function Card(props: { job: JobData }) {
  const [details, openDetails] = useState(false);
  const buttonClosed = "transition text-8xl";
  const buttonOpened = "rotate-90 " + buttonClosed;
  
  const locations = props.job.location.map((val) => {
    return (<div className="rounded-lg bg-slate-300 text-black w-fit p-1">
      {val}
     </div>)
  });

  return (
    <li className="m-5 p-5 dark:bg-slate-900 bg-slate-300 dark:text-white text-black rounded grid grid-cols-7">
      <img
        src={"https://placekitten.com/300/300"}
        className="row-span-2 scale-75 rounded-2xl"
      />
      <div className="col-span-5">
        <h3 className="text-bold text-3xl">{props.job.title}</h3>
        <h4 className="text-bold text-2xl">{props.job.company}</h4>
        <h5 className="text-bold text-xl">Location: {locations}</h5>
        <h6 className="text-bold text-xl">
          {props.job.wageProvided ? (
              "Pay range: " + 
              props.job.wage.min +
              " - " +
              props.job.wage.max
          ) : (
            "Pay not provided"
          )}
        </h6>
      </div>
      <button
        onClick={() => openDetails(!details)}
        className={details ? buttonOpened : buttonClosed}
    >></button>
    { details ? (
      <div className="transition col-span-7">
        <hr className="m-6"/>
        <h6>
          {props.job.companyDesc}
        </h6>
        <hr className="m-6"/>
        <p>{props.job.desc}</p>
        <hr className="m-6"/>
        <div className="flex justify-between">
          <a className="underline text-bold p-2 hover:text-blue-500" href={props.job.link}>
            Jobicy posting
          </a>
          <button className="rounded bg-slate-600 p-2" onClick={() => openDetails(!details)}>
            Close Description
          </button>
        </div>
      </div>
    ) : (<></>)}
    </li>
  );
}
