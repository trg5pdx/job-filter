import axios from "axios";
import { JobData } from "./jobdata";

export async function GetJobListings() {
  const URL = "https://jobicy.com/api/v2/remote-jobs?count=20&tag=python";
  const response = await axios.get(URL);

  let jobs = response.data.jobs.map((val) => {
    let job = new JobData(
      val.jobTitle,
      val.jobDescription,
      val.companyName,
      val.jobExcerpt,
      val.url,
      val.companyLogo,
      [val.jobGeo],
      "Jobicy"
    );
    return job;
  });

  return jobs;
}
