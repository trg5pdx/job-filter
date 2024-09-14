import axios from 'axios'
import { JobData, Pay, WorkOptions } from './jobdata'

// Decided to split this off for testing later
// Also would like to revise this to be able to handle hexadecimal codes
function fix_unicode(excerpt: string) {
  return excerpt.replace(/(&#)(\d{4})+/g, (x, y, z) => {
    return String.fromCodePoint(Number(z))
  })
}

// TODO: define interface for dealing with JSON objects so this actually has a type
function get_pay_info(job) {
  if (job.annualSalaryMin == undefined) {
    return { provided: false }
  } else if (job.annualSalaryMax == '') {
    return {
      provided: true,
      salaryMin: parseInt(job.annualSalaryMin, 10),
      currency: job.salaryCurrency
    }
  }

  return {
    provided: true,
    salaryMin: parseInt(job.annualSalaryMin, 10),
    salaryMax: parseInt(job.annualSalaryMax, 10),
    currency: job.salaryCurrency
  }
}

export async function GetJobListings() {
  const URL = 'https://jobicy.com/api/v2/remote-jobs?count=20&tag=python'
  const response = await axios.get(URL)

  let jobs = response.data.jobs.map((val) => {
    let wage: Pay = get_pay_info(val)
    console.log(val)
    console.log(wage)
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
