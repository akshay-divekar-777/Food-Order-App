export default function Input({ lable, id, ...props }) {
  return (
    <p className="control">
      <label htmlFor={lable}>{lable}</label>
      <input id={id} name={id} {...props} required />
    </p>
  );
}
