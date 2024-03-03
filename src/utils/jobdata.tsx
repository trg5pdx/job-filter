import { jobBoards } from "./query";

/* 
most of the job data fields are built off of jobicy's api, will need to be 
changed as more job boards are added 
*/

export interface Pay {
  provided: bool;
  hourlyMin?: number;
  hourlyMax?: number;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
}

export class JobData {
  title: string;
  desc: [string];
  company: string;
  companyDesc: string;
  link: string;
  logo: string;
  location: [string];
  jobBoard: jobBoards;
  wage: Pay;
  postDate: string;
  jobIndustry: string;
  jobType: string;

  /* 
    TODO: add functions for removing html tags from description, and change how
    the description is formatted to support lists
  */

  constructor(
    title: string,
    desc: string,
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
    this.title = title;
    this.desc = desc;
    this.company = company.split("\n");
    this.companyDesc = companyDesc;
    this.link = link;
    this.logo = logo;
    this.location = location;
    this.wage = wage;
    this.postDate = postDate;
    this.jobIndustry = jobIndustry;
    this.jobType = jobType;

    switch (jobBoard) {
      case "Jobicy":
        this.jobBoard = jobBoards.Jobicy;
      default:
        this.jobBoard = jobBoards.Other;
    }
  }
}
