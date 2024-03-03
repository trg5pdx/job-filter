import axios from "axios";
import { JobData, Pay } from "./jobdata";

export async function GetJobListings() {
  const URL = "https://jobicy.com/api/v2/remote-jobs?count=20&tag=python";
  const response = await axios.get(URL);

  let jobs = response.data.jobs.map((val) => {
    let wage: Pay =
      val.annualSalaryMin == undefined
        ? {
            provided: false,
          }
        : {
            provided: true,
            salaryMin: parseInt(val.annualSalaryMin),
            salaryMax: parseInt(val.annualSalaryMax),
            currency: val.salaryCurrency,
          };

    let job = new JobData(
      val.jobTitle,
      val.jobDescription,
      val.companyName,
      val.jobExcerpt,
      val.url,
      val.companyLogo,
      val.jobGeo.split(", ").map((val) => val.trim()),
      "Jobicy",
      wage,
      val.pubDate,
      val.jobIndustry,
      val.jobType
    );

    return job;
  });

  return jobs;
}
