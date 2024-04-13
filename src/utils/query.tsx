import { Pay, Industry, JobData } from './jobdata'

export enum workOptions {
  Remote,
  Hybrid,
  InPerson,
}

export enum jobBoards {
  Jobicy,
  Other,
}

export interface Query {
  search: string
  wage?: Pay
  companies?: string
  options?: [workOptions]
  location?: string
  industry?: [Industry]
  board?: [jobBoards]
}

export interface Header {
  heading: number
  title: string
}

export interface List {
  title: string
  items: [string]
}

export interface Paragraph {
  text: [string]
}

export function filter_jobs(jobs: [JobData], query: Query) {
  return jobs.filter((job) => {
    return (
      check_wage(job, query.wage) &&
      check_companies(job, query.companies) &&
      check_location(job, query.location) &&
      check_industries(job, query.industry)
    )
  })
}

export function check_wage(job: JobData, wage: Pay): boolean {
  if (wage == null || !wage.provided) {
    return true
  }
  if (job.wage) {
    if (!job.wage.provided) {
      return false
    }
    if (
      job.wage.salaryMin >= wage.salaryMin &&
      (wage.salaryMax == undefined || job.wage.salaryMax <= wage.salaryMax)
    ) {
      return true
    } else if (
      job.wage.salaryMax <= wage.salaryMax &&
      wage.salaryMin == undefined
    ) {
      return true
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

export function check_industries(job: JobData, industries: [Industry]) {
  if (industries == undefined || industries.length == 0) {
    return true
  }

  for (const jobIndustry of job.jobIndustry) {
    for (const queryIndustry of industries) {
      console.log(jobIndustry, queryIndustry)
      console.log('AAAAA')
      if (jobIndustry == queryIndustry) {
        return true
      }
    }
  }

  return false
}
