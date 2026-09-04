"use strict";

let title = prompt("Как называется Ваш проект?") ?? "";
let screens = prompt("Какие типы экранов нужно разработать? (перечислите через запятую, например: Простые, Сложные, Интерактивные)") ?? "";
let screenPrice = +prompt("Сколько будет стоить данная работа?") || 0;

let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен?") ?? "";
let servicePrice1 = +prompt("Сколько это будет стоить?") || 0;
let service2 = prompt("Какой дополнительный тип услуги нужен?") ?? "";
let servicePrice2 = +prompt("Сколько это будет стоить?") || 0;

let allServicePrices = 0; // стоимость доп.услуг
let fullPrice = 0; // стоимость верстки экрана и доп.услуг
let rollback = 20; // процент отката посреднику за работу
let servicePercentPrice = 0; // стоимость верстки экрана и доп.услуг минус стоимость отката посреднику

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
}

const getRollbackMessage = function (price) {
  switch (true) {
    case price >= 0 && price < 15000:
      return "Скидка не предусмотрена";
      break;
    case price >= 15000 && price < 30000:
      return "Даем скидку в 5 %";
      break;
    case price >= 30000:
      return "Даем скидку в 10 %";
      break;
    default:
      return "Что-то пошло не так";
  }
}

const getAllServicePrices = function (price1, price2) {
  return price1 + price2;
}

function getFullPrice(price1, price2) {
  return price1 + price2;
}

const getTitle = function (str) {
  const strTrim = String(str).trim();
  return strTrim.charAt(0).toLocaleUpperCase() + strTrim.substring(1).toLocaleLowerCase();
}

const getServicePercentPrices = function (price, percent) {
  return price - Math.round(price * (percent / 100));
}

title = getTitle(title);
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("Типы экранов для разработки: " + screens);
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость работы за вычетом отката посреднику: " + servicePercentPrice + " рублей");
