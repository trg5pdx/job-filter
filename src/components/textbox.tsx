export function Input(props: {
  id: string;
  value: string;
  onChange: (arg0: string) => void;
}) {
  console.log(props.id);
  return (
    <>
      <label htmlFor={props.id}>{props.id + ": "}</label>
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.id}
      />
    </>
  );
}
