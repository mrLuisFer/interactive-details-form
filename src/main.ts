import "./scss/main.scss";

const getElementById = (id: string): HTMLElement => {
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

const cardNumberInput: HTMLInputElement | any = getElementById("cardnumber");
const cardNumber = getElementById("card-number");

cardNumberInput.addEventListener("change", () => {
  const value = cardNumberInput.value || "0000 0000 0000 0000";
  cardNumber.textContent = value;
});

const cardNameInput = getElementById("cardholder")
const cardName = getElementById("card-name")

cardNameInput.addEventListener("change", () => {
  const value = cardNameInput.value || "jane appleseed"
  cardName.textContent = value
})
