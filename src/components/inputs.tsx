import { JSXInternal } from 'node_modules/preact/src/jsx'

export function Input(props: {
  id: string
  value: string
  inputType: string
  onChange: (arg0: JSXInternal.TargetedEvent) => void
}) {
  const textBoxStyle = `pt-2 pb-2`

  return (
    <label htmlFor={props.id} className={textBoxStyle}>
      {`${props.id}: `}
      <input
        type={props.inputType}
        id={props.id}
        value={props.value}
        onChange={(event) => props.onChange(event)}
        placeholder={props.id}
      />
    </label>
  )
}

/* 
onChange's event.target typecast obtained from here:
https://stackoverflow.com/a/44321394

eslint was complaining about value not existing on event.target
*/

export function Checkbox(props: {
  id: string
  title: string
  value: boolean
  onClick: (arg0: any) => void
}) {
  const checkBoxStyle = `pt-2 pb-2`

  return (
    <label htmlFor={props.id} className={checkBoxStyle}>
      <input
        id={props.id}
        type="checkbox"
        checked={props.value}
        onClick={props.onClick}
      />
      {` ${props.title}`}
    </label>
  )
}
