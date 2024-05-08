import axios from 'axios'
import { JobData, Pay, WorkOptions } from './jobdata'

// Decided to split this off for testing later
// Also would like to revise this to be able to handle hexadecimal codes
function fix_unicode(excerpt: string) {
  return excerpt.replace(/(&#)(\d{4})+/g, (x, y, z) => {
    return String.fromCodePoint(Number(z))
  })
}

export async function GetJobListings() {
  const URL = 'https://jobicy.com/api/v2/remote-jobs?count=20&tag=python'
  const response = await axios.get(URL)

  let jobs = response.data.jobs.map((val) => {
    let wage: Pay =
      val.annualSalaryMin == undefined
        ? {
            provided: false
          }
        : {
            provided: true,
            salaryMin: parseInt(val.annualSalaryMin, 10),
            salaryMax: parseInt(val.annualSalaryMax, 10),
            currency: val.salaryCurrency
          }
    let job = new JobData(
      val.jobTitle,
      val.jobDescription,
      val.companyName,
      fix_unicode(val.jobExcerpt),
      val.url,
      val.companyLogo,
      val.jobGeo.split(', ').map((val: string) => val.trim()),
      WorkOptions.Remote,
      'Jobicy',
      wage,
      val.pubDate,
      val.jobIndustry,
      val.jobType
    )

    return job
  })

  return jobs
}
