import { toast } from "react-toastify";

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const removeDotsFromNumber = (value) => {
  return Number(value.split(".").join(""));
};

export const getElement = (event, className) => {
  const element = event.target.querySelector(className);
  return element;
};

export const checkTheInputsValueLength = (inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim().length > 0) {
      input.classList.remove("!border-red-500");
    } else {
      input.classList.add("!border-red-500");
    }
  });

  return inputs.every((input) => {
    if (input.value.trim().length > 0) {
      return true;
    } else {
      input.focus();
      return false;
    }
  });
};

// toast notification
export const errorMessage = (message) => {
  toast.error(message ? message : "Nimadir xato ketdi!");
};

errorMessage.offline = (message) => {
  const isOnline = navigator.onLine;
  if (isOnline) {
    toast.error(message ? message : "Nimadir xato ketdi!");
  } else {
    toast.error("Internet aloqasi mavjud emas!");
  }
};

export const successMessage = (message) => {
  toast.success(message ? message : "Ish muvaffaqiyatli bajarildi!");
};

// format date
export const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  const formattedDate = `${year}.${month}.${day}`;

  return formattedDate;
};

// format time
export const formatTime = (input) => {
  const date = new Date(input);

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};
