export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const removeDotsFromNumber = (value) => {
  return Number(value.split(".").join(""));
};

export const getElement = (e, className) => {
  const element = e.target.querySelector(className);
  return element;
};

export const checkTheInputsValueLength = (inputs) => {
  return inputs.every((input) => {
    if (input.value.length > 0) {
      input.classList.remove("!border-red-500");
      return true;
    } else {
      input.classList.add("!border-red-500");
      input.focus();
      return false;
    }
  });
};
