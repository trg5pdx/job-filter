import { JSXInternal } from 'node_modules/preact/src/jsx'

export function Input(props: {
  id: string
  value: string
  inputType: string
  onChange: (arg0: JSXInternal.TargetedEvent) => void
}) {
  const textBoxStyle = `pt-2 pb-2`
  const title = (id: string) => {
    return {
      search: 'Search',
      excluded_title: 'Title',
      excluded_desc: 'Description',
      pay_min: 'Minimum Pay',
      pay_max: 'Maximum Pay',
      companies: 'Companies',
      location: 'Job Location'
    }[id]
  }

  const labelText = title(props.id)

  return (
    <label htmlFor={props.id} className={textBoxStyle}>
      {`${labelText}: `}
      <input
        type={props.inputType}
        id={props.id}
        value={props.value}
        onChange={(event) => props.onChange(event)}
        placeholder={labelText}
      />
    </label>
  )
}

export function Checkbox(props: {
  id: string
  value: boolean
  onClick: (arg0: any) => void
}) {
  const checkBoxStyle = `pt-2 pb-2`

  const title = (id: string) => {
    return {
      // Job work option
      remote: 'Remote',
      hybrid: 'Hybrid',
      inperson: 'In-Person',
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
      {` ${title(props.id)}`}
    </label>
  )
}
