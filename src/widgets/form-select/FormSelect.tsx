// import node module libraries
import { Fragment } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

interface FormSelectProps {
  placeholder: string;
  id: string;
  name: string;
  className: string;
  options?: any;
  onChange?: any;
  defaultselected?: string;
}

export const FormSelect = (props: FormSelectProps) => {
  const { placeholder, options, id, name, onChange, className } = props;

  return (
    <Fragment>
      <Form.Select
        id={id}
        name={name}
        onChange={onChange}
        className={className}
      >
        {placeholder ? (
          <option value="" className="text-muted">
            {placeholder}
          </option>
        ) : (
          ""
        )}
        {options.map((item: any, index: number) => {
          return (
            <option key={index} value={item.value} className="text-dark">
              {item.label}
            </option>
          );
        })}
      </Form.Select>
    </Fragment>
  );
};

FormSelect.propTypes = {
  placeholder: PropTypes.string,
  defaultselected: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default FormSelect;
