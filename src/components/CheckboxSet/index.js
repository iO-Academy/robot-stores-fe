import Checkbox from "../Checkbox";

const CheckboxSet = ({ legend, checkboxData, onChange }) => {
  return (
    <fieldset>
      <legend>{legend}</legend>
      {checkboxData.map((data, index) => {
        const dataName = data.name
          .toLowerCase()
          .replace(/[ -]/g, '');

        return (
          <div key={index}>
            <Checkbox
              id={dataName}
              checked={data.checked}
              onChange={() => onChange(index)}
              label={data.name}
            />
          </div>
        );
      })}
    </fieldset>
  );
}

export default CheckboxSet;
