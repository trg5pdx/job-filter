import { JSXInternal } from 'node_modules/preact/src/jsx'
import { Input, Checkbox } from './inputs'

export default function PayInformation(props: {
  salary_min: string
  salary_max: string
  hourly_min: string
  hourly_max: string
  allow_salary: boolean
  allow_hourly: boolean
  allow_blank_pay: boolean
  changeSearch: (arg0: JSXInternal.TargetedEvent) => void
  changePayOptions: (arg0: JSXInternal.TargetedEvent) => void
}) {
  return (
    <div>
      <Checkbox
        id={'allow_salary'}
        value={props.allow_salary}
        onClick={props.changePayOptions}
      />
      <Checkbox
        id={'allow_hourly'}
        value={props.allow_hourly}
        onClick={props.changePayOptions}
      />
      <Checkbox
        id={'allow_blank_pay'}
        value={props.allow_blank_pay}
        onClick={props.changePayOptions}
      />
      <Input
        id="salary_min"
        value={props.salary_min}
        inputType={'number'}
        onChange={props.changeSearch}
        readonly={!props.allow_salary}
      />
      <Input
        id="salary_max"
        value={props.salary_max}
        inputType={'number'}
        onChange={props.changeSearch}
        readonly={!props.allow_salary}
      />
      <Input
        id="hourly_min"
        value={props.hourly_min}
        inputType={'number'}
        onChange={props.changeSearch}
        readonly={!props.allow_hourly}
      />
      <Input
        id="hourly_max"
        value={props.hourly_max}
        inputType={'number'}
        onChange={props.changeSearch}
        readonly={!props.allow_hourly}
      />
    </div>
  )
}
