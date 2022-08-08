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

// CARD NUMBER
const cardNumberInput: HTMLInputElement = getElementById("cardnumber");
const cardNumber = getElementById("card-number");
const defaultCardNumberValue: string = "0000 0000 0000 0000";
cardNumberInput.addEventListener("change", () => {
  const value: string = cardNumberInput.value.trim() || defaultCardNumberValue;
  const removeSpaces: string = value.replaceAll(" ", "").replace(/\s/g, "");
  const valueFixed: string = removeSpaces;

  const separateValue: string =
    valueFixed.substring(0, 4) +
    " " +
    valueFixed.substring(4, 8) +
    " " +
    valueFixed.substring(8, 12) +
    " " +
    valueFixed.substring(12, 16);

  const digits: number = separateValue
    .split("")
    .filter((str) => str !== " ").length;

  inputNumberError = digits !== 16;
  const formNumberErrorMsg: HTMLParagraphElement =
    getElementById("field-number-error");
  const cardNumberRegex: RegExp =
    /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35d{3})d{11}$)/;

  if (inputNumberError || !cardNumberRegex.test(separateValue)) {
    formNumberErrorMsg.textContent = "Wrong format, numbers only";
    cardNumberInput.style.border = commonInputBorderStyle;
  } else {
    formNumberErrorMsg.textContent = "";
    cardNumber.textContent = separateValue;
  }
});

// CARD NAME
const cardNameInput: HTMLInputElement = getElementById("cardholder");
const cardName = getElementById("card-name");
cardNameInput.addEventListener("change", () => {
  const value = cardNameInput.value || "jane appleseed";
  const cardNameRegex: RegExp = /^[a-z_-]{3,15}$/;

  const formNameErrorMsg: HTMLParagraphElement =
    getElementById("field-name-error");
  if (!cardNameRegex.test(value)) {
    formNameErrorMsg.textContent = "Wrong format, number isn't valid";
    cardNameInput.style.border = commonInputBorderStyle;
  }
  cardName.textContent = value;
});

// CARD MONTH
const cardMonth: HTMLElement = getElementById("card-month");
inputMonth.addEventListener("change", () => {
  const value: string = inputMonth.value.trim() || "00";
  cardMonth.textContent = value;
});

// CARD YEAR
const cardYear: HTMLElement = getElementById("card-year");
inputYear.addEventListener("change", () => {
  const value: string = inputYear.value.trim() || "00";
  cardYear.textContent = value;
});

// CARD CVC
const cardCvc: HTMLElement = getElementById("card-cvc");
inputCvc.addEventListener("change", () => {
  const value: string = inputCvc.value.trim() || "000";
  cardCvc.textContent = value;
});

const formBtn: HTMLButtonElement = getElementById("form-btn");
formBtn.addEventListener("click", () => {
  if (
    !inputNumberError &&
    cardNumberInput.value !== defaultCardNumberValue &&
    cardNumberInput.value !== ""
  ) {
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
