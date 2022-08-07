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

const cardNumberInput: HTMLInputElement = getElementById("cardnumber");
const cardNumber = getElementById("card-number");
cardNumberInput.addEventListener("change", () => {
  const value: string = cardNumberInput.value.trim() || "0000 0000 0000 0000";
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

  if (digits !== 16) {
    console.log("error");
    inputNumberError = true;
  }
  cardNumber.textContent = separateValue;
});

const cardNameInput: HTMLInputElement = getElementById("cardholder");
const cardName = getElementById("card-name");
cardNameInput.addEventListener("change", () => {
  const value = cardNameInput.value || "jane appleseed";
  cardName.textContent = value;
});

const cardMonth: HTMLElement = getElementById("card-month");
inputMonth.addEventListener("change", () => {
  const value: string = inputMonth.value.trim() || "00";
  cardMonth.textContent = value;
});

const cardYear: HTMLElement = getElementById("card-year");
inputYear.addEventListener("change", () => {
  const value: string = inputYear.value.trim() || "00";
  cardYear.textContent = value;
});

const cardCvc: HTMLElement = getElementById("card-cvc")
inputCvc.addEventListener("change", () => {
  const value: string = inputCvc.value.trim() || "000"

  cardCvc.textContent = value
})
