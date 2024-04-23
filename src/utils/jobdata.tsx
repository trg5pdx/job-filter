import { jobBoards } from './query'

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
  WebAppDesign = 'Web & App Design',
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
  Anywhere,
}

/* 
Got the idea for using variant from here:
https://www.typescriptsos.com/basics/switch-for-specific-type-in-typescript/
*/
export interface Header {
  variant: 'Header'
  title: string
  level: number
  // Revise this later to restrict it to 1-6
}

export interface List {
  variant: 'List'
  title: string
  children: (string | List)[]
}

export interface Body {
  variant: 'Body'
  paragraph: string
}

export class DescriptionBody {
  tags: (Header | List | Body)[]

  constructor(text: string) {
    this.tags = []
    this.processDescription(text)
    console.log(`TAGS: ${this.tags}`)
  }

  processDescription(val: string) {
    let textToProcess = val.replaceAll(/(<\/?div([^>]*)>)+/g, '')
    let looping = true
    let structure = null
    let list = []

    console.log(`Before processing: ${val}`)

    while (looping) {
      const tagRule = /(<\/?[^/]+?>)?([^(</)]+)(<\/[\s\S]+?>)?([\s\S]*)+/g
      const result = tagRule.exec(textToProcess)
      console.log(result)

      if (!result) {
        looping = false
      } else {
        let startIn = -1
        let endIn = -1
        let restOfStr = -1

        for (let i = 0; i < result.length; ++i) {
          const startTag = new RegExp(/(<[^/]+?>)?/g)
          const endTag = new RegExp(/(<\/[\s\S]+?>)?/g)

          if (startIn >= 0 && endIn == -1) {
            switch (result[startIn]) {
              case '<p>':
                structure = { variant: 'Body', paragraph: result[i] }
                break
              case '<h1>':
                structure = {
                  variant: 'Header',
                  title: result[i],
                  level: 1,
                }
                break
              case '<h2>':
                structure = {
                  variant: 'Header',
                  title: result[i],
                  level: 2,
                }
                break
              case '<h3>':
                structure = {
                  variant: 'Header',
                  title: result[i],
                  level: 3,
                }
                break
              case '<h4>':
                structure = {
                  variant: 'Header',
                  title: result[i],
                  level: 4,
                }
                break
              case '<h5>':
                structure = {
                  variant: 'Header',
                  title: result[i],
                  level: 5,
                }
                break
              case '<h6>':
                structure = {
                  variant: 'Header',
                  title: result[i],
                  level: 6,
                }
                break
              case '<ul>':
                // maybe need to do something else here later; I think I could
                // get away with just assuming the next data is a li tag
                break
              case '<li>':
                list.push(result[i])
                break
              default:
                // unnecessary but wanted to make sure it will remain null
                structure = null
                break
            }
          }

          if (startTag.test(result[i])) {
            console.log(`start: i: ${i}; result: ${result[i]}`)
            startIn = i
          }
          if (endTag.test(result[i])) {
            console.log(`end: i: ${i}; result: ${result[i]}`)
            endIn = i
          }
          if (endIn > 0) {
            console.log(`restOfStr: i: ${i}; result: ${result[i]}`)
            restOfStr = i
          }
        }

        console.log(`END OF LOOP: ${structure}`)

        if (structure) {
          this.tags.push(structure)
          structure = null
        }
        if (result[endIn] == '</ul>') {
          structure = { variant: 'list', title: '', children: list }
          this.tags.push(structure)
          structure = null
          list = []
        }

        console.log(
          `start: ${result[startIn]}; content: ${result[startIn + 1]}; end: ${result[endIn]}}`
        )
        console.log(result)
        textToProcess = result[restOfStr]
      }
    }
  }
}

export class JobData {
  title: string
  desc: [string]
  company: string
  companyDesc: string
  newDesc: DescriptionBody
  link: string
  logo: string
  location: [string]
  jobBoard: jobBoards
  wage: Pay
  postDate: string
  jobIndustry: string
  jobType: string

  /* 
    TODO: add functions for removing html tags from description, and change how
    the description is formatted to support lists
  */

  constructor(
    title: string,
    desc: [string],
    company: string,
    companyDesc: string,
    link: string,
    logo: string,
    location: [string],
    jobBoard: string,
    wage: Pay,
    postDate: string,
    jobIndustry: string,
    jobType: string
  ) {
    this.title = title
    this.desc = desc
    this.company = company
    this.companyDesc = companyDesc
    this.newDesc = new DescriptionBody(desc)
    this.link = link
    this.logo = logo
    this.location = location
    this.wage = wage
    this.postDate = postDate
    this.jobIndustry = jobIndustry
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
}
