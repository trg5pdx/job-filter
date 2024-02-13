export class JobData {
  title: string;
  desc: [string];
  company: string;
  companyDesc: string;
  link: string;
  logo: string;
  location: [string];
  jobBoard: string;

  constructor(
    title: string,
    desc: string,
    company: string,
    companyDesc: string,
    link: string,
    logo: string,
    location: [string],
    jobBoard: string
  ) {
    this.title = title;
    this.desc = desc;
    this.company = company.split("\n");
    this.companyDesc = companyDesc;
    this.link = link;
    this.logo = logo;
    this.location = location;
    this.jobBoard = jobBoard;
  }
}
