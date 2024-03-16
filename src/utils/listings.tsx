import axios from 'axios'
import { JobData, Pay } from './jobdata'

// Decided to split this off for testing later
// Also would like to revise this to be able to handle hexadecimal codes
function fix_unicode(excerpt: string) {
  return excerpt.replace(/(&#)(\d{4})+/g, (x, y, z) => {
    return String.fromCodePoint(Number(z))
  })
}

function strip_HTML(description: string) {
  // console.log("before: ");
  // console.log(description);
  // rule for selecting between two chars: https://stackoverflow.com/a/3335593
  const divRemoved = description.replaceAll(/(<\/?div([^>]*)>)+/g, '')
  const ulRule = /((?<=<ul>)[\s\S]*?(?=<\/ul>))+/g
  const liRule = /((?<=<li>)[\s\S]*?(?=<\/li>))+/g

  const lists = ulRule.exec(divRemoved)
  if (lists) {
    const list_items = lists.map((item) => liRule.exec(item))
    // console.log(list_items);
  }
}

export async function GetJobListings() {
  const URL = 'https://jobicy.com/api/v2/remote-jobs?count=20&tag=python'
  const response = await axios.get(URL)

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
          }

    strip_HTML(val.jobDescription)
    let job = new JobData(
      val.jobTitle,
      val.jobDescription,
      val.companyName,
      fix_unicode(val.jobExcerpt),
      val.url,
      val.companyLogo,
      val.jobGeo.split(', ').map((val) => val.trim()),
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
