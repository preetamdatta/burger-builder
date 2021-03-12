import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.validation && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  let inputElement = null;
  switch (props.type) {
    case "input":
      inputElement = (
        <input
          type={props.config.type}
          className={inputClasses.join(" ")}
          name={props.config.name}
          placeholder={props.config.placeholder}
          value={props.value}
          onChange={props.changed}
        ></input>
      );
      break;
    case "textArea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          name={props.config.name}
          placeholder={props.config.placeholder}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={inputClasses.join(" ")} onChange={props.changed}>
          {props.config.option.map((o) => {
            return (
              <option
                className={inputClasses.join(" ")}
                value={o.value}
                key={o.value}
              >
                {o.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
    // inputElement = (
    //   // <input
    //   //   className={inputClasses.join(" ")}
    //   //   name={props.config.name}
    //   //   placeholder={props.config.placeholder}
    //   //   value={props.value}
    //   //   onChange={props.changed}
    //   // ></input>
    // );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
