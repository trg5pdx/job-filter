export function Input(props: {
  id: string
  value: string
  inputType: string
  onChange: (arg0: string) => void
  className: string
}) {
  return (
    <label htmlFor={props.id} className={props.className}>
      {`${props.id}: `}
      <input
        type={props.inputType}
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange((e.target as HTMLInputElement).value)}
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
  onClick: () => void
  className: string
}) {
  return (
    <label htmlFor={props.id} className={props.className}>
      <input type="checkbox" checked={props.value} onClick={props.onClick} />
      {` ${props.title}`}
    </label>
  )
}
