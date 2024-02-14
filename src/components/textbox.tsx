export function Input(props: {
  id: string;
  value: string;
  onChange: (arg0: string) => void;
  className: string;
}) {
  console.log(props.id);
  return (
    <label htmlFor={props.id} className={props.className}>
      {props.id + ": "}
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.id}
      />
    </label>
  );
}

export function Checkbox(props: {
  id: string;
  title: string;
  value: bool;
  onClick: () => void;
  className: string;
}) {
  return (
    <label htmlFor={props.id} classsName={props.className}>
      {props.title}
      <input type="checkbox" checked={props.value} onClick={props.onClick} />
    </label>
  );
}
