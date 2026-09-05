"use strict";

let title; // название проекта
let screens; // типы экранов
let screenPrice; // стоимость разработки сайта
let adaptive; // признак адаптивности сайта

let allServicePrices = 0; // стоимость доп.услуг
let fullPrice = 0; // стоимость разработки экрана и доп.услуг
let rollback = 20; // процент отката посреднику за работу
let servicePercentPrice = 0; // стоимость разработки сайта и доп.услуг минус стоимость отката посреднику

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
}

const asking = function () {
  title = getTitle(prompt("Как называется Ваш проект?", "Калькулятор верстки") ?? "");
  screens = prompt("Какие типы экранов нужно разработать? (перечислите через запятую)", "Простые, Сложные, Интерактивные") ?? "";
  do {
    screenPrice = prompt("Сколько будет стоить данная работа? (введите число >= 0)", 20000);
  } while (!isNumber(screenPrice) || screenPrice < 0); // спрашиваем снова, если нажаты 'Отмена'/ESC или введена комбинация символов, не являющаяся неотриц.числом (например, пустая строка/строка пробелов/не цифры)
  screenPrice = parseFloat(screenPrice);

  adaptive = confirm("Нужен ли адаптив на сайте? (Если не нужен, нажмите 'Отмена' или ESC)");
}

const getAllServicePrices = function () {
  let result = 0;
  let serviceType = "";
  let servicePrice = 0;
  let services = [];

  while (true) {
    if (serviceType = (prompt("Какой тип дополнительной услуги нужен? (Введите непустую строку. Если не нужен, нажмите 'Отмена' или ESC)") ?? "").trim()) {
      do {
        servicePrice = prompt(`Сколько "${serviceType}" будет стоить? (введите число >= 0)`);
      } while (!isNumber(servicePrice) || servicePrice < 0);
      servicePrice = parseFloat(servicePrice);
      result += servicePrice;

      services.push([serviceType, servicePrice]);
    }
    else break; // выход, если нажаты 'Отмена'/ESC или введены пустая строка/строка пробелов
  };
  //console.table(services);
  return result;
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

asking();
allServicePrices = getAllServicePrices();
title = getTitle(title);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices ", allServicePrices);
console.log("Типы экранов для разработки: " + screens);
console.log("Стоимость разработки сайта: ", screenPrice);
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость работы за вычетом отката посреднику: " + servicePercentPrice + " рублей");
