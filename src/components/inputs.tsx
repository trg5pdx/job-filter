import { JSXInternal } from 'node_modules/preact/src/jsx'

/* 
Got the idea for how to do optional attributes from:
https://stackoverflow.com/a/59757984
*/
interface TextInput {
  id: string
  value: string
  inputType: string
  onChange: (arg0: JSXInternal.TargetedEvent) => void
  readonly?: boolean
}

export function Input({
  id,
  value,
  inputType,
  onChange,
  readonly = false
}: TextInput) {
  const title = (id: string) => {
    return {
      search: 'Search',
      excluded_title: 'Title',
      excluded_desc: 'Description',
      salary_min: 'Min. Salary',
      salary_max: 'Max. Salary',
      hourly_min: 'Min. Hourly Pay',
      hourly_max: 'Max. Hourly Pay',
      companies: 'Companies',
      location: 'Job Location'
    }[id]
  }

  const labelText = title(id)
  // this feels bad, maybe come back and fix this
  const readonlyStyle = readonly ? 'line-through hover:cursor-not-allowed' : ''

  return (
    <label htmlFor={id} className={`pt-2 pb-2 flex flex-col ${readonlyStyle}`}>
      {`${labelText}: `}
      <input
        type={inputType}
        id={id}
        value={value}
        className={`rounded p-1 border-2 dark:border-secondary-600 ${readonlyStyle}`}
        onChange={(event) => onChange(event)}
        placeholder={labelText}
        readonly={readonly}
      />
    </label>
  )
}

export function Checkbox(props: {
  id: string
  value: boolean
  onClick: (arg0: any) => void
}) {
  const checkBoxStyle = `pt-2 pb-2 pr-2`

  const title = (id: string) => {
    return {
      // Job work option
      remote: 'Remote',
      hybrid: 'Hybrid',
      inperson: 'In-Person',
      // Pay options
      allow_salary: 'Salary',
      allow_hourly: 'Hourly Pay',
      allow_blank_pay: 'Allow no provided pay',
      // Job Boards
      jobicy: 'Jobicy (Remote Only)',
      // Industry categories
      businessdev: 'Business Development',
      copywriting: 'Copywriting',
      customersuccess: 'Customer Success',
      datascience: 'Data Science',
      designcreative: 'Design & Creative',
      devopssysadmin: 'DevOps & SysAdmin',
      accountingfinance: 'Finance & Legal',
      hrrecruiting: 'HR & Recruiting',
      marketingsales: 'Marketing & Sales',
      productoperations: 'Product & Operations',
      programming: 'Software Engineering',
      sales: 'Sales',
      seo: 'SEO',
      socialmediamarketing: 'Social Media Marketing',
      technicalsupport: 'Technical Support',
      webappdesign: 'Web & App Design'
    }[id]
  }

  return (
    <label htmlFor={props.id} className={checkBoxStyle}>
      <input
        id={props.id}
        type="checkbox"
        checked={props.value}
        onClick={props.onClick}
      />
      {`${title(props.id)}`}
    </label>
  )
}

export function Button(props: {
  id: string
  child: string
  type?: string
  onClick?: (arg0: JSXInternal.TargetedEvent) => void
}) {
  const selectStyle = (id: string) => {
    return `p-2 mt-2 mb-2 rounded-md dark:bg-secondary-700 bg-secondary-400 
    dark:text-neutral-100 text-neutral-950`
  }

  return (
    <button
      id={props.id}
      type={props.type == undefined ? 'button' : props.type}
      className={selectStyle(props.id)}
      onClick={props.onClick}
    >
      {props.child}
    </button>
  )
}
