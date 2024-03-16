import { Pay, Industry } from './jobdata'

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
