import { useState } from 'preact/hooks'
import { Input, Checkbox } from './inputs'
import IndustrySelect from './industryselect'
import { Industry, IndustryNum } from '../utils/jobdata'
import { jobBoards, Query } from '../utils/query'
import { JSXInternal } from 'node_modules/preact/src/jsx'

export default function SearchQuery(props: {
  query: Query
  setQuery: (Query) => void
}) {
  const [search, setSearch] = useState({
    search: '',
    excluded_title: '',
    excluded_desc: '',
    pay_range: '',
    pay_min: '',
    pay_max: '',
    companies: '',
    workChoice: [],
    remote: true,
    hybrid: true,
    inperson: true,
    board_jobicy: true,
    location: '',
    board: [jobBoards.Jobicy]
  })
  const [industry, setIndustry] = useState(new Array(IndustryNum).fill(false))
  const [viewIndustry, setViewIndustry] = useState(false)

  const isValid = (x: string) => {
    if (x == undefined || isNaN(parseInt(x, 10))) {
      return false
    }
    return true
  }

  const formatWage = (payMin: string, payMax: string) => {
    if (!isValid(payMin) && !isValid(payMax)) {
      return { provided: false }
    }

    if (!isValid(payMax)) {
      return {
        provided: true,
        salaryMin: parseInt(payMin, 10)
      }
    } else if (!isValid(payMin)) {
      return {
        provided: true,
        salaryMax: parseInt(payMax, 10)
      }
    }
    return {
      provided: true,
      salaryMin: parseInt(payMin, 10),
      salaryMax: parseInt(payMax, 10)
    }
  }

  const changeSearch = (e: JSXInternal.TargetedEvent) => {
    let textbox = e.target as HTMLInputElement
    setSearch({
      ...search,
      [textbox.id]: textbox.value
    })
  }

  const changeWorkOptions = (e: JSXInternal.TargetedEvent) => {
    const val = e.target as HTMLInputElement
    setSearch({
      ...search,
      [val.id]: val.checked
    })
  }

  return (
    <section className="w-full dark:bg-slate-600 bg-slate-300 pb-5">
      <form
        className="p-4 grid"
        onSubmit={(e) => {
          e.preventDefault()
          let job_boards = []
          let job_industry = []
          if (search.board_jobicy) {
            job_boards.push(jobBoards.Jobicy)
          }
          for (let i = 0; i < IndustryNum; ++i) {
            if (industry[i]) {
              // I dislike this, come back and do it better
              job_industry.push(Object.values(Industry)[i])
            }
          }

          props.setQuery({
            search: search.search,
            excluded_title: search.excluded_title,
            excluded_desc: search.excluded_desc,
            wage: formatWage(search.pay_min, search.pay_max),
            companies: search.companies,
            remote: search.remote,
            hybrid: search.hybrid,
            inperson: search.inperson,
            location: search.location,
            industry: job_industry,
            board: job_boards
          })
        }}
      >
        <Input
          id="search"
          value={search.search}
          inputType={'text'}
          onChange={changeSearch}
        />
        <div className={`flex flex-col`}>
          {`Terms to exclude from:`}
          <Input
            id="excluded_title"
            value={search.excluded_title}
            inputType={'text'}
            onChange={changeSearch}
          />
          <Input
            id="excluded_desc"
            value={search.excluded_desc}
            inputType={'text'}
            onChange={changeSearch}
          />
        </div>
        <div>
          <Input
            id="pay_min"
            value={search.pay_min}
            inputType={'number'}
            onChange={changeSearch}
          />
          <Input
            id="pay_max"
            value={search.pay_max}
            inputType={'number'}
            onChange={changeSearch}
          />
        </div>
        <Input
          id="companies"
          value={search.companies}
          inputType={'text'}
          onChange={changeSearch}
        />
        <Input
          id="location"
          value={search.location}
          inputType={'text'}
          onChange={changeSearch}
        />
        <div>
          <Checkbox
            id="remote"
            title="Remote"
            value={search.remote}
            onClick={changeWorkOptions}
          />
          <Checkbox
            id="hybrid"
            title="Hybrid"
            value={search.hybrid}
            onClick={changeWorkOptions}
          />
          <Checkbox
            id="inperson"
            title="Inperson"
            value={search.inperson}
            onClick={changeWorkOptions}
          />
        </div>
        <div>
          <button onClick={() => setViewIndustry(!viewIndustry)}>
            <label>{'Industries '}</label>
            {'>'}
          </button>
          {viewIndustry ? (
            <IndustrySelect
              industry={industry}
              setIndustry={(key: number) => {
                setIndustry({
                  ...industry,
                  [key]: !industry[key]
                })
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          {'Boards to pull from: '}
          <Checkbox
            id="jobicy"
            title="Jobicy (Remote Only)"
            value={search.board_jobicy}
            onClick={() => {
              setSearch({ ...search, board_jobicy: !search.board_jobicy })
            }}
          />
        </div>
        <button
          type="submit"
          className="dark:bg-slate-900 dark:text-white bg-slate-400 text-black rounded-md p-2 mt-2 mb-2"
        >
          Submit Search
        </button>
      </form>
    </section>
  )
}
