const Checkbox = ({ id, checked, onChange, label }) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
}

export default Checkbox;
