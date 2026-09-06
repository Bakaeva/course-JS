"use strict";

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

let appData = {
  title: "", // название проекта
  screens: "", // типы сайтов
  screenPrice: 0, // стоимость разработки сайта
  adaptive: true, // признак адаптивности сайта
  rollback: 20, // процент отката посреднику за работу
  allServicePrices: 0, // стоимость доп.услуг
  fullPrice: 0, // стоимость разработки сайта и доп.услуг
  servicePercentPrice: 0, // стоимость разработки сайта и доп.услуг минус стоимость отката посреднику
  services: [], // доп.услуги

  asking: function () {
    this.title = this.getTitle(prompt("Как называется Ваш проект?", "Калькулятор верстки") ?? "");
    this.screens = prompt("Какие типы сайтов нужно разработать? (перечислите через запятую)", "Простые, Сложные, Интерактивные") ?? "";
    do {
      this.screenPrice = prompt("Сколько будет стоить данная работа? (введите число >= 0)", 20000);
    } while (!isNumber(this.screenPrice) || this.screenPrice < 0); // спрашиваем снова, если нажаты 'Отмена'/ESC или введена комбинация символов, не являющаяся неотриц.числом (например, пустая строка/строка пробелов/не цифры)
    this.screenPrice = parseFloat(this.screenPrice);

    this.adaptive = confirm("Нужен ли адаптив на сайте? (Если не нужен, нажмите 'Отмена' или ESC)");
  },

  getAllServicePrices: function () {
    let result = 0;
    let serviceType = "";
    let servicePrice = 0;

    while (true) {
      if (serviceType = (prompt("Какой тип дополнительной услуги нужен? (Введите непустую строку. Если не нужен, нажмите 'Отмена' или ESC)") ?? "").trim()) {
        do {
          servicePrice = prompt(`Сколько "${serviceType}" будет стоить? (введите число >= 0)`);
        } while (!isNumber(servicePrice) || servicePrice < 0);
        servicePrice = parseFloat(servicePrice);
        result += servicePrice;

        this.services.push([serviceType, servicePrice]);
      }
      else break; // выход, если нажаты 'Отмена'/ESC или введены пустая строка/строка пробелов
    };
    return result;
  },

  getRollbackMessage: function (price) {
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
  },

  getFullPrice: function (price1, price2) {
    return price1 + price2;
  },

  getTitle: function (str) {
    const strTrim = String(str).trim();
    return strTrim.charAt(0).toLocaleUpperCase() + strTrim.substring(1).toLocaleLowerCase();
  },

  getServicePercentPrices: function (price, percent) {
    return price - Math.round(price * (percent / 100));
  },

  start: function () {
    this.asking();

    this.allServicePrices = this.getAllServicePrices();
    this.title = this.getTitle(this.title);
    this.fullPrice = this.getFullPrice(this.screenPrice, this.allServicePrices);
    this.servicePercentPrice = this.getServicePercentPrices(this.fullPrice, this.rollback);

    this.logger();
  },

  logger: function () {
    // console.log(`Типы сайтов для разработки: ${this.screens}`);
    // console.log(`Стоимость разработки сайта: ${this.screenPrice}`);
    // console.log(`Стоимость доп.услуг: ${this.allServicePrices}`);
    // console.log(this.getRollbackMessage(this.fullPrice));
    // console.log(`Стоимость работы за вычетом отката (${this.rollback}%) посреднику: ${this.servicePercentPrice} рублей`);

    for (const key in this) {
      console.log(`${key}: ${this[key]}`);
    };
  }
};

appData.start();
