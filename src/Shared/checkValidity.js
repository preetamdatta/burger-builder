export const checkValidity = (value, rule) => {
  let isValid = true;

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (rule) {
    if (rule.required) isValid = value.trim() !== "" && isValid;

    if (rule.minLength) isValid = value.length >= rule.minLength && isValid;

    if (rule.maxLength) isValid = value.length <= rule.maxLength && isValid;

    if (rule.validateEmail) isValid = re.test(String(value).toLowerCase());
  }

  return isValid;
};
