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

const w: string = "50px";
inputMonth.style.width = w;
inputYear.style.width = w;

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

const formBtn: HTMLButtonElement = getElementById("form-btn");
formBtn.addEventListener("click", () => {
  if (!inputNumberError && cardNumberInput.value !== defaultCardNumberValue && cardNumberInput.value !== "") {
    const content: HTMLElement = getElementById("content");
    content.innerHTML = `
      <img class="content-submitted-icon" src="/images/icon-complete.svg" alt="submitted" />
      <p class="content-submitted-title">Thank you!</p>
      <p class="content-submitted-text">We've added your card details</p>
    `;
    const formBtn: HTMLButtonElement = getElementById("form-btn");
    formBtn.textContent = "Continue";
  }
});
