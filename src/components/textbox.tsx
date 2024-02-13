export function Input(props: {
  id: string;
  value: string;
  onChange: (arg0: string) => void;
  className: string;
}) {
  console.log(props.id);
  return (
    <div className={props.className}>
      <label htmlFor={props.id}>{props.id + ": "}</label>
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.id}
      />
    </div>
  );
}
