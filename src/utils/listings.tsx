import axios from "axios";
import { JobData, Pay } from "./jobdata";

export async function GetJobListings() {
  const URL = "https://jobicy.com/api/v2/remote-jobs?count=20&tag=python";
  const response = await axios.get(URL);

  let jobs = response.data.jobs.map((val) => {
    let pay = new Pay(
      false,
      val.annualSalaryMin,
      val.annualSalaryMax,
      val.salaryCurrency
    );
    let wageProvided = val.annualSalaryMin != null;

    let job = new JobData(
      val.jobTitle,
      val.jobDescription,
      val.companyName,
      val.jobExcerpt,
      val.url,
      val.companyLogo,
      val.jobGeo.split(", ").map((val) => val.trim()),
      "Jobicy",
      pay,
      wageProvided,
      val.pubDate,
      val.jobIndustry,
      val.jobType
    );

    return job;
  });

  return jobs;
}
