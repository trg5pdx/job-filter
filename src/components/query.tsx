import { useState, useEffect } from 'preact/hooks'
import { Input, Checkbox } from './textbox'
import IndustrySelect from './industryselect'
import { Industry, IndustryNum } from '../utils/jobdata'
import { jobBoards, workOptions, Query } from '../utils/query'
import WorkChoice from './workChoice'

const inputFmt = `pt-2 pb-2`
const checkStyle = `pt-2 pb-2`

export default function SearchQuery(props: {
  query: Query
  setQuery: (Query) => void
}) {
  const [search, setSearch] = useState({
    search: '',
    pay_range: '',
    pay_min: '',
    pay_max: '',
    companies: '',
    workChoice: [],
    board_jobicy: true,
    location: '',
    board: [jobBoards.Jobicy],
  })
  const [industry, setIndustry] = useState(new Array(IndustryNum).fill(false))
  const [viewIndustry, setViewIndustry] = useState(false)

  useEffect(() => {
    industry
  }, [industry])

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
        salaryMin: parseInt(payMin, 10),
      }
    } else if (!isValid(payMin)) {
      return {
        provided: true,
        salaryMax: parseInt(payMax, 10),
      }
    }
    return {
      provided: true,
      salaryMin: parseInt(payMin, 10),
      salaryMax: parseInt(payMax, 10),
    }
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
            wage: formatWage(search.pay_min, search.pay_max),
            companies: search.companies,
            options: search.workChoice,
            location: search.location,
            industry: job_industry,
            board: job_boards,
          })
        }}
      >
        <Input
          id="search"
          value={search.search}
          inputType={'text'}
          onChange={(val) => {
            setSearch({ ...search, search: val })
            console.log(search)
          }}
          className={inputFmt}
        />
        <div>
          <Input
            id="pay_min"
            value={search.pay_min}
            inputType={'number'}
            onChange={(val) => {
              setSearch({ ...search, pay_min: val })
            }}
          />
          <Input
            id="pay_max"
            value={search.pay_max}
            inputType={'number'}
            onChange={(val) => {
              setSearch({ ...search, pay_max: val })
            }}
          />
        </div>
        <Input
          id="companies"
          value={search.companies}
          inputType={'text'}
          onChange={(val) => {
            setSearch({ ...search, companies: val })
          }}
          className={inputFmt}
        />
        <Input
          id="location"
          value={search.location}
          inputType={'text'}
          onChange={(val) => {
            setSearch({ ...search, location: val })
          }}
          className={inputFmt}
        />
        <WorkChoice
          choice={search.workChoice}
          setChoice={(val: [workOptions]) => {
            setSearch({
              ...search,
              workChoice: val,
            })
          }}
        />
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
                  [key]: !industry[key],
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
            title="Jobicy"
            value={search.board_jobicy}
            onClick={() => {
              setSearch({ ...search, board_jobicy: !search.board_jobicy })
            }}
            className={checkStyle}
          />
        </div>
        <button type="submit" className="dark:bg-slate-900 dark:text-white bg-slate-400 text-black rounded-md p-2 mt-2 mb-2">
          Submit Search
        </button>
      </form>
    </section>
  )
}
