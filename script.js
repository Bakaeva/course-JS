"use strict";

let title = prompt("Как называется Ваш проект?") ?? "";
let screens =
  prompt(
    "Какие типы экранов нужно разработать? (перечислите через запятую, например: Простые, Сложные, Интерактивные)",
  ) ?? "";
let screenPrice = +prompt("Сколько будет стоить данная работа?") || 0;

let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен?") ?? "";
let servicePrice1 = +prompt("Сколько это будет стоить?") || 0;
let service2 = prompt("Какой дополнительный тип услуги нужен?") ?? "";
let servicePrice2 = +prompt("Сколько это будет стоить?") || 0;

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let rollback = 20; // percent to pay for services of intermediaries
let intermediariesServicesPrice = Math.round(fullPrice * (rollback / 100));
let servicePercentPrice = Math.ceil(fullPrice - intermediariesServicesPrice);
console.log(
  "Стоимость работы за вычетом отката посреднику: " +
    servicePercentPrice +
    " рублей",
);

let discount = 0;
switch (true) {
  case fullPrice >= 0 && fullPrice < 15000:
    console.log("Скидка не предусмотрена");
    break;
  case fullPrice >= 15000 && fullPrice < 30000:
    console.log("Даем скидку в 5 %");
    discount = 5;
    break;
  case fullPrice >= 30000:
    console.log("Даем скидку в 10 %");
    discount = 10;
    break;
  default:
    console.log("Что-то пошло не так");
}
