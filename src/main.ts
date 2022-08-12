import "./scss/main.scss";

const getElementById = (id: string): HTMLElement | any => {
  const element = document.getElementById(`${id}`)!;
  return element;
};

const inputMonth = getElementById("month");
const inputYear = getElementById("year");
const inputCvc = getElementById("cvc");
const fieldName = getElementById("field-name");
const fieldNumber = getElementById("field-number");

inputMonth.style.width = "50px";
inputYear.style.width = "50px";

inputCvc.style.width = "150px";
fieldName.style.width = "100%";
fieldNumber.style.width = "100%";

let inputNumberError: boolean = false;
let inputNameError: boolean = false;
const commonInputBorderStyle: string = "1px solid #ff5b5b";
const defaultBorderStyle: string = "1px solid var(--light-grayish-violet)";

// CARD_NUMBER:
const cardNumberInput: HTMLInputElement = getElementById("cardnumber");
const cardNumber = getElementById("card-number");
const defaultCardNumberValue: string = "0000 0000 0000 0000";
cardNumberInput.addEventListener("change", () => {
  const value: string = cardNumberInput.value.trim() || defaultCardNumberValue;
  const removeSpaces: string = value.replaceAll(" ", "").replace(/\s/g, "");
  const valueFixed: string = removeSpaces;
  const separateValue: string =
    valueFixed.substring(0, 4) + " " + valueFixed.substring(4, 8) + " " + valueFixed.substring(8, 12) + " " + valueFixed.substring(12, 16);
  const digits: number = separateValue.split("").filter((str) => str !== " ").length;
  const formNumberErrorMsg: HTMLParagraphElement = getElementById("field-number-error");
  const cardNumberRegex: RegExp = /^(?:[0-9]+$)/;
  inputNumberError = digits !== 16;
  const isValidCardNumber = cardNumberRegex.test(valueFixed) && !inputNumberError;

  formNumberErrorMsg.textContent = isValidCardNumber ? "" : "Wrong format, numbers only";
  cardNumberInput.style.border = isValidCardNumber ? defaultBorderStyle : commonInputBorderStyle;
  cardNumber.textContent = isValidCardNumber ? separateValue : defaultCardNumberValue;
});

// CARD_NAME:
const cardNameInput: HTMLInputElement = getElementById("cardholder");
const cardName = getElementById("card-name");
const defaultCardNameValue = "jane appleseed";
cardNameInput.addEventListener("change", () => {
  const value = cardNameInput.value.trim() || defaultCardNameValue;
  const cardNameRegex: RegExp = /^([^0-9]*)$/;
  const formNameErrorMsg: HTMLParagraphElement = getElementById("field-name-error");
  const isValidName: boolean = cardNameRegex.test(value);

  formNameErrorMsg.textContent = isValidName ? "" : "Wrong format";
  cardNameInput.style.border = isValidName ? defaultBorderStyle : commonInputBorderStyle;
  cardName.textContent = isValidName ? value : defaultCardNameValue;
});

const dateFieldError: HTMLElement = getElementById("field-date-error");
const defaultDateValue: string = "00";

// CARD_MONTH:
const cardMonth: HTMLElement = getElementById("card-month");
inputMonth.addEventListener("change", () => {
  const value: string = inputMonth.value.trim() || defaultDateValue;
  const valueParsed: number = parseInt(value);
  const isValidMonthValue: boolean = !isNaN(valueParsed) && !(value.length < 2) && !(valueParsed < 0) && !(valueParsed > 12);

  dateFieldError.textContent = isValidMonthValue ? "" : "Wrong format";
  inputMonth.style.border = isValidMonthValue ? defaultBorderStyle : commonInputBorderStyle;
  cardMonth.textContent = isValidMonthValue ? value : defaultDateValue;
});

// CARD_YEAR:
const cardYear: HTMLElement = getElementById("card-year");
inputYear.addEventListener("change", () => {
  const value: string = inputYear.value.trim() || "00";
  const valueParsed: number = parseInt(value);
  const isValidYearValue: boolean = !isNaN(valueParsed) && !(value.length < 2);

  dateFieldError.textContent = isValidYearValue ? "" : "Wrong format";
  inputYear.style.border = isValidYearValue ? defaultBorderStyle : commonInputBorderStyle;
  cardYear.textContent = isValidYearValue ? value : defaultDateValue;
});

// CARD_CVC:
const cardCvc: HTMLElement = getElementById("card-cvc");
const cvcFieldError = getElementById("field-cvc-error");
inputCvc.addEventListener("change", () => {
  const defaultCvcValue = "000";
  const value: string = inputCvc.value.trim() || defaultCvcValue;
  const valueParsed: number = parseInt(value);
  const isValidCvcValue: boolean = !isNaN(valueParsed) && !(value.length < 3);

  cvcFieldError.textContent = isValidCvcValue ? "" : "Wrong format";
  inputCvc.style.border = isValidCvcValue ? defaultBorderStyle : commonInputBorderStyle;
  cardCvc.textContent = value;
});

const form: HTMLFormElement = getElementById("form");

// Submitted form elements
const imgCompletedIcon: HTMLImageElement = document.createElement("img");
imgCompletedIcon.classList.add("content-submitted-icon");
imgCompletedIcon.setAttribute("src", "/images/icon-complete.svg");
imgCompletedIcon.setAttribute("alt", "submitted");

const contentTitle: HTMLParagraphElement = document.createElement("p");
contentTitle.classList.add("content-submitted-title");
contentTitle.textContent = "Thank you!";

const contentText: HTMLParagraphElement = document.createElement("p");
contentText.classList.add("content-submitted-text");
contentText.textContent = "We've added your card details";

const btnCompleted: HTMLButtonElement = document.createElement("button");
btnCompleted.classList.add("form-container-btn");
btnCompleted.textContent = "Continue";
btnCompleted.setAttribute("id", "btn-completed");

const contentDiv: HTMLElement = getElementById("content");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputNumberError && cardNumberInput.value !== defaultCardNumberValue && cardNumberInput.value !== "") {
    contentDiv.innerHTML = "";
    contentDiv.appendChild(imgCompletedIcon);
    contentDiv.appendChild(contentTitle);
    contentDiv.appendChild(contentText);
    contentDiv.appendChild(btnCompleted);
  }
});

btnCompleted.addEventListener("click", () => {
  location.reload()
});
