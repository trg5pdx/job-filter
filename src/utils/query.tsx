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

export function check_wage(job: JobData, wage: Pay): boolean {
  // For the case where the user doesn't care about pay
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

export function filter_jobs(jobs: [JobData], query: Query) {
  return jobs.filter((job) => {
    return check_wage(job, query.wage)
  })
}
