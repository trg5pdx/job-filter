import { useState } from 'preact/hooks'
import { JSXInternal } from 'node_modules/preact/src/jsx'
import { Input, Checkbox } from './inputs'

export default function PayInformation(props: {
  salary_min: string
  salary_max: string
  hourly_min: string
  hourly_max: string
  allow_blank_pay: boolean
  changeSearch: (arg0: JSXInternal.TargetedEvent) => void
}) {
  const [payOptions, setPayOptions] = useState({
    salary: true,
    hourly: true
  })

  return (
    <div>
      <Checkbox
        id={'salary_pay'}
        value={payOptions.salary}
        onClick={() =>
          setPayOptions({
            ...payOptions,
            salary: !payOptions.salary
          })
        }
      />
      <Checkbox
        id={'hourly_pay'}
        value={payOptions.hourly}
        onClick={() =>
          setPayOptions({
            ...payOptions,
            hourly: !payOptions.hourly
          })
        }
      />
      <Input
        id="salary_min"
        value={props.salary_min}
        inputType={'number'}
        onChange={props.changeSearch}
        readonly={!payOptions.salary}
      />
      <Input
        id="salary_max"
        value={props.salary_max}
        inputType={'number'}
        onChange={props.changeSearch}
        readonly={!payOptions.salary}
      />
      <Input
        id="hourly_min"
        value={props.hourly_min}
        inputType={'number'}
        onChange={props.changeSearch}
        readonly={!payOptions.hourly}
      />
      <Input
        id="hourly_max"
        value={props.hourly_max}
        inputType={'number'}
        onChange={props.changeSearch}
        readonly={!payOptions.hourly}
      />
    </div>
  )
}
