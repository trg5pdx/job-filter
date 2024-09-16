import { useState } from 'preact/hooks'
import { Input, Checkbox, Button } from './inputs'
import IndustrySelect from './industryselect'
import PayInformation from './payinformation'
import { Industry, IndustryNum } from '../utils/jobdata'
import { jobBoards, Query, WageOptions } from '../utils/query'
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
    salary_min: '',
    salary_max: '',
    hourly_min: '',
    hourly_max: '',
    allow_salary: true,
    allow_hourly: true,
    allow_blank_pay: true,
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
  const [toggleSubmenus, setToggleSubmenus] = useState({
    industry: false,
    pay: false
  })

  const isValid = (x: string) => {
    if (x == undefined || isNaN(parseFloat(x))) {
      return false
    }
    return true
  }

  const formatWage = (
    includeSalary: boolean,
    includeHourly: boolean,
    includeNoProvidedPay: boolean,
    salary_min: string,
    salary_max: string,
    hourly_min: string,
    hourly_max: string
  ): WageOptions => {
    return {
      includeSalary,
      includeHourly,
      includeNoProvidedPay,
      salaryMin: isValid(salary_min) ? parseInt(salary_min, 10) : null,
      salaryMax: isValid(salary_max) ? parseInt(salary_max, 10) : null,
      hourlyMin: isValid(hourly_min) ? parseFloat(hourly_min) : null,
      hourlyMax: isValid(hourly_max) ? parseFloat(hourly_max) : null,
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

  const setSubmenuViews = (e: JSXInternal.TargetedEvent) => {
    let target = e.target as HTMLInputElement
    setToggleSubmenus({
      ...toggleSubmenus,
      [target.id]: !toggleSubmenus[target.id]
    })
  }

  return (
    <section className="w-full ">
      <form
        className={`p-4 grid dark:bg-primary-900 bg-primary-300 pb-5 m-4 
        rounded-xl dark:border-secondary-500 border-secondary-900 border-2`}
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
            wage: formatWage(
              search.allow_salary,
              search.allow_hourly,
              search.allow_blank_pay,
              search.salary_min,
              search.salary_max,
              search.hourly_min,
              search.hourly_max
            ),
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
        <Button id="pay" child="Pay Settings" onClick={setSubmenuViews} />
        {toggleSubmenus.pay && (
          <PayInformation
            salary_min={search.salary_min}
            salary_max={search.salary_max}
            hourly_min={search.hourly_min}
            hourly_max={search.hourly_max}
            allow_salary={search.allow_salary}
            allow_hourly={search.allow_hourly}
            allow_blank_pay={search.allow_blank_pay}
            changeSearch={changeSearch}
            changePayOptions={changeWorkOptions}
          />
        )}
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
            value={search.remote}
            onClick={changeWorkOptions}
          />
          <Checkbox
            id="hybrid"
            value={search.hybrid}
            onClick={changeWorkOptions}
          />
          <Checkbox
            id="inperson"
            value={search.inperson}
            onClick={changeWorkOptions}
          />
        </div>
        <Button id="industry" child="Industries" onClick={setSubmenuViews} />
        {toggleSubmenus.industry && (
          <IndustrySelect
            industry={industry}
            setIndustry={(key: number) => {
              setIndustry({
                ...industry,
                [key]: !industry[key]
              })
            }}
          />
        )}
        <div>
          {'Boards to pull from: '}
          <div className="flex flex-col">
            <Checkbox
              id="jobicy"
              value={search.board_jobicy}
              onClick={() => {
                setSearch({ ...search, board_jobicy: !search.board_jobicy })
              }}
            />
          </div>
        </div>
        <Button id="submit" type="submit" child="Submit Search" />
      </form>
    </section>
  )
}
