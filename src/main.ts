import "./scss/main.scss";

const inputMonth = document.getElementById("month")!;
const inputYear = document.getElementById("year")!;
const inputCvc = document.getElementById("cvc")!;
const fieldName = document.getElementById("field-name")!;
const fieldNumber = document.getElementById("field-number")!;

const w: string = "50px";
inputMonth.style.width = w;
inputYear.style.width = w;

inputCvc.style.width = "150px";
fieldName.style.width = "100%";
fieldNumber.style.width = "100%";
