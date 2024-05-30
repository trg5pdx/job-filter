import { Industry } from '../utils/jobdata'
import { Checkbox } from './inputs'

export default function IndustrySelect(props: {
  industry: boolean[]
  setIndustry: (arg0: number) => void
}) {
  const industries = Object.keys(Industry).map((val, key) => {
    return (
      <Checkbox
        key={key}
        id={val.toLowerCase()}
        value={props.industry[key]}
        onClick={() => {
          props.setIndustry(key)
        }}
      />
    )
  })

  return <div className="flex flex-col">{industries}</div>
}
