/* eslint-disable no-unused-vars */
import { Pay, Industry, JobData, WorkOptions } from './jobdata'

export enum jobBoards {
  Jobicy,
  Other
}

export interface WageOptions {
  includeSalary: boolean
  includeHourly: boolean
  includeNoProvidedPay: boolean
  salaryMin?: number
  salaryMax?: number
  hourlyMin?: number
  hourlyMax?: number
}

export interface Query {
  search: string
  excluded_title?: string
  excluded_desc?: string
  wage?: WageOptions
  companies?: string
  remote: boolean
  hybrid: boolean
  inperson: boolean
  location?: string
  industry?: [Industry]
  board?: [jobBoards]
}

export function filter_jobs(jobs: JobData[], query: Query) {
  return jobs.filter((job) => {
    return (
      check_work_options(job, query.remote, query.hybrid, query.inperson) &&
      !exclude_job(job, query.excluded_title, query.excluded_desc) &&
      check_wage(job, query.wage) &&
      check_companies(job, query.companies) &&
      check_location(job, query.location) &&
      check_industries(job, query.industry)
    )
  })
}

export function check_work_options(
  job: JobData,
  remote: boolean,
  hybrid: boolean,
  inperson: boolean
) {
  switch (job.locationOption) {
    case WorkOptions.Remote:
      return remote
    case WorkOptions.Hybrid:
      return hybrid
    case WorkOptions.Inperson:
      return inperson
    default:
      return false
  }
}

/* 
Obtained the regex for matching a specific word regardless of case from:
https://superuser.com/questions/903168/how-should-i-write-a-regex-to-match-a-specific-word#903175
*/
export function exclude_job(
  job: JobData,
  excluded_title: string,
  excluded_desc: string
) {
  const compare_terms = (exclude_term, source_term) => {
    for (const term of exclude_term.split(',')) {
      const regex = new RegExp(`(?:^|\\W)${term.trim()}(?:$|\\W)`, 'gim')
      if (regex.test(source_term)) {
        return true
      }
    }
  }

  if (excluded_title != '' && excluded_title != undefined) {
    if (compare_terms(excluded_title, job.title)) {
      return true
    }
  }
  if (excluded_desc != '' && excluded_desc != undefined) {
    if (compare_terms(excluded_desc, job.desc)) {
      return true
    }
  }

  return false
}

// I don't like how I redid this, I want to find a better way, but with
// all of the conditions this may be the best way to do it
export function check_wage(job: JobData, wage: WageOptions): boolean {
  if(!job.wage.provided) {
    if(wage.includeNoProvidedPay) {
      return true
    }
  } else {
    if(wage.includeHourly) {
      if(!job.wage.salaryMin
        && !job.wage.salaryMax
        && !wage.hourlyMin
        && !wage.hourlyMax
      ) {
        return true
      }
      if(!job.wage.hourlyMax 
        && !job.wage.hourlyMin
        && !wage.includeSalary
        && !wage.includeNoProvidedPay
      ) {
        return false
      }
      if(job.wage.hourlyMin >= wage.hourlyMin
        && (job.wage.hourlyMax <= wage.hourlyMax
          || (!job.wage.hourlyMax && !wage.hourlyMax)
        )
      ) {
        return true;
      }
      if(job.wage.hourlyMax <= wage.hourlyMax
        && (!job.wage.hourlyMin && !wage.hourlyMin) 
      ) {
        return true
      }
    } 
    if (wage.includeSalary) {
      if(!wage.salaryMin 
        && !wage.salaryMax
        && !job.wage.hourlyMax
        && !job.wage.hourlyMin
      ) {
        return true
      }
      if(!job.wage.salaryMax
        && !job.wage.salaryMin
        && !wage.includeHourly
        && !wage.includeNoProvidedPay
      ) {
        return false
      }
      if(job.wage.salaryMin >= wage.salaryMin
        && (job.wage.salaryMax <= wage.salaryMax
          || !wage.salaryMax)
      ) {
          return true
      }
      if(job.wage.salaryMax <= wage.salaryMax
        && ((!wage.salaryMin && !job.wage.salaryMin))
      ) {
        return true
      }
    }
  }

  return false
}

export function check_companies(job: JobData, companies: string) {
  if (!companies) {
    return true
  }
  for (const company of companies.split(',')) {
    if (company == null || job.company.toLowerCase() == company.toLowerCase()) {
      return true
    }
  }

  return false
}

export function check_location(job: JobData, locations: string) {
  if (!locations) {
    return true
  }

  for (const jobLocation of job.location) {
    if (jobLocation == 'Anywhere') {
      return true
    }
    for (const queryLocation of locations.split(',')) {
      if (jobLocation.toLowerCase() == queryLocation.toLowerCase()) {
        return true
      }
    }
  }

  return false
}

export function check_industries(job: JobData, industries: Industry[]) {
  if (industries == undefined || industries.length == 0) {
    return true
  }

  for (const jobIndustry of job.jobIndustry) {
    for (const queryIndustry of industries) {
      if (jobIndustry == queryIndustry) {
        return true
      }
    }
  }

  return false
}
