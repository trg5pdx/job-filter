export enum workOptions {
  Remote,
  Hybrid,
  InPerson,
  Any,
}

export enum jobBoards {
  Jobicy,
  All,
}

export class Query {
  search: string;
  pay_range: string;
  companies: string;
  options: workOptions;
  location: string;
  board: jobBoards;

  Constructor(
    search: string,
    pay_range: string,
    companies: string,
    options: workOptions,
    location: string,
    board: jobBoards
  ) {
    this.search = search;
    this.pay_range = pay_range;
    this.companies = companies;
    this.options = options;
    this.location = location;
    this.board = board;
  }
}
