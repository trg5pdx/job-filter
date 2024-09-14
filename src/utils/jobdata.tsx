/* eslint-disable no-unused-vars */
import { jobBoards } from './query'
import DOMPurify from 'dompurify'

/* 
most of the job data fields are built off of jobicy's api, will need to be 
changed as more job boards are added 
*/

// As of 2024/3/4, this was entirely pulled from jobicy's industries field,
// will be updated as more job boards get added
// source: https://jobicy.com/api/v2/remote-jobs?get=industries
export enum Industry {
  BusinessDev = 'Business Development',
  Copywriting = 'Copywriting',
  CustomerSuccess = 'Customer Success',
  DataScience = 'Data Science',
  DesignCreative = 'Design & Creative',
  DevopsSysadmin = 'Devops & Sysadmin',
  AccountingFinance = 'Finance & Legal',
  HRRecruiting = 'HR & Recruiting',
  MarketingSales = 'Marketing & Sales',
  ProductOperations = 'Product & Operations',
  Programming = 'Software Engineering',
  Sales = 'Sales',
  SEO = 'SEO',
  SocialMediaMarketing = 'Social Media Marketing',
  TechnicalSupport = 'Technical Support',
  WebAppDesign = 'Web & App Design'
}
// Wanted to have this be based on the size of the Industry enum but kept running into issues with it
export const IndustryNum = 16

export interface Pay {
  provided: boolean
  hourlyMin?: number
  hourlyMax?: number
  salaryMin?: number
  salaryMax?: number
  currency?: string
}

export enum Region {
  USA,
  Canada,
  UK,
  APAC,
  EMEA,
  Anywhere
}

export enum WorkOptions {
  Remote,
  Hybrid,
  Inperson
}

export class JobData {
  title: string
  desc: string
  company: string
  companyDesc: string
  link: string
  logo: string
  location: [string]
  locationOption: WorkOptions
  jobBoard: jobBoards
  wage: Pay
  postDate: string
  jobIndustry: string[]
  jobType: string

  constructor(
    title: string,
    desc: string,
    company: string,
    companyDesc: string,
    link: string,
    logo: string,
    location: [string],
    locationOption: WorkOptions,
    jobBoard: string,
    wage: Pay,
    postDate: string,
    jobIndustry: string[],
    jobType: string
  ) {
    this.title = title
    this.desc = DOMPurify.sanitize(desc)
    this.company = company
    this.companyDesc = companyDesc
    this.link = link
    this.logo = logo
    this.location = location
    this.locationOption = locationOption
    this.wage = wage
    this.postDate = postDate
    this.jobIndustry = this.format_industry_name(jobIndustry)
    this.jobType = jobType

    switch (jobBoard) {
      case 'Jobicy':
        this.jobBoard = jobBoards.Jobicy
        break
      default:
        this.jobBoard = jobBoards.Other
        break
    }
  }

  format_industry_name(industries: string[]) {
    return industries.map((val) => {
      return val.replace('&amp;', '&')
    })
  }
}
