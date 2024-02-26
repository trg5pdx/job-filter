export enum workOptions {
  Remote,
  Hybrid,
  InPerson,
}

export enum jobBoards {
  Jobicy,
  Other,
}

export class Query {
  search: string;
  pay_range: string;
  pay_min: number;
  pay_max: number;
  companies: string;
  options: [workOptions];
  location: string;
  board: [jobBoards];

  Constructor(
    search: string,
    pay_range: string,
    pay_min: number,
    pay_max: number,
    companies: string,
    remote: bool,
    inperson: bool,
    hybrid: bool,
    location: string,
    board: [jobBoards]
  ) {
    let options = [];

    if (remote) {
      options.push(workOptions.Remote);
    }
    if (inperson) {
      options.push(workOptions.InPerson);
    }
    if (hybrid) {
      options.push(workOptions.Hybrid);
    }

    this.search = search;
    this.pay_range = pay_range;
    this.pay_min = pay_min;
    this.pay_max = pay_max;
    this.companies = companies;
    this.options = [options];
    this.location = location;
    this.board = [board];
  }
}
