import JobData from "../utils/jobdata";

export default function Card(props: { job: JobData }) {
  return (
    <li className="m-5 p-5 dark:bg-slate-900 bg-slate-300 dark:text-white text-black rounded grid grid-cols-6">
      <img src={props.job.logo} className="row-span-2 scale-75 rounded-2xl" />
      <div className="col-span-5">
        <h3 className="text-bold text-3xl">{props.job.title}</h3>
        <h4 className="text-bold text-2xl">{props.job.company}</h4>
        {/* <h6>{props.job.companyDesc}</h6>
        <a href={props.job.url}>Jobicy posting</a>
        <p>Location: {props.job.props.job.props.jobGeo}</p> 
        <p>{props.job.desc[0]}</p> */}
      </div>
    </li>
  );
}
