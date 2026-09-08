"use strict";

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

/** 
 * Проверяет, что переданное в arg значение - строка, не являющаяся числом
 * @param {any} arg - проверяемое значение
 * @returns {boolean} `true`, если значение в arg - непустая строка, состоящая не только из цифр после удаления концевых пробелов
 * 
 * @example
 * isValidString("4567989") // false,
 * isValidString(" 4567989 ") // false,
 * isValidString("4 567 989") // true
 * isValidString("Купил ВАЗ 2108 !!!№#%") // true
*/
const isValidString = function (arg) {
  if (typeof arg !== 'string' || arg.trim().length === 0) {
    return false;
  }
  return arg.trim().split('').some(char => isNaN(parseFloat(char)));
}

const appData = {
  title: "", // название проекта
  screens: [], // типы экранов (видимо, под экраном подразумевается веб-страница)
  services: {}, // доп.услуги
  adaptive: true, // признак адаптивности сайта
  rollback: 20, // процент отката посреднику за работу
  screenPrice: 0, // стоимость разработки сайта без доп.услуг
  allServicePrices: 0, // стоимость доп.услуг
  fullPrice: 0, // стоимость разработки сайта с доп.услугами
  servicePercentPrice: 0, // стоимость разработки сайта с доп.услугами за вычетом стоимости отката посреднику

  start: function () {
    if (!this.asking()) {
      alert("Приложение завершило свою работу");
      return;
    }

    this.getTitle();
    this.addPrices();
    this.getFullPrice();
    this.getServicePercentPrices();

    this.logger();
  },

  asking: function () {
    let name; // для ввода типа экрана, названия доп.услуги
    let price; // для ввода стоимости верстки экрана с указанным в "name" типом, стоимости доп.услуги с указанным в "name" названием

    /**
     * Добавление названия и стоимости доп.услуги с предварительной проверкой уникальности названия добавляемой услуги и, при необходимсоти, добавлением уникальности в название
     * 
     * @param {} services - объект для хранения информации (название и стоимость) о доп.услугах
     * @param {string} key - название доп.услуги
     * @param {number} value - стоимость доп.услуги
     */
    const addService = function (services, key, value) {
      let uniqueKey = key;
      let counter = 2; // Начинаем с 2, так как первая услуга идет без суффикса

      while (Object.hasOwn(services, uniqueKey)) {
        uniqueKey = `${key} ${counter}`;  // для 2-ой услуги с таким же названием добавляем в конце " 2", для 3-ей услуги - " 3" и т.д.
        counter++;
      }
      services[uniqueKey] = value;
    };

    do {
      this.title = prompt("Как называется Ваш проект?\nВведите непустую строку, не являющуюся числом. Для выхода из приложения нажмите 'Отмена' или ESC", "Калькулятор верстки");
      if (this.title === null)
        return false; // выход, если нажаты 'Отмена'/ESC
    } while (!isValidString(this.title));
    this.title = this.title.trim();

    //#region ввод this.screens (типы экранов)
    let i = 0;
    screensLoop: while (true) {
      name = "";
      price = 0;

      do {
        name = prompt("Какой тип экрана нужно разработать (например, Простой | Сложный | Интерактивный)?\nВведите непустую строку, не являющуюся числом. Если не нужен, нажмите 'Отмена' или ESC");
        if (name === null)
          break screensLoop; // выход из внешнего цикла ввода данных о типах экранов, если нажаты 'Отмена'/ESC
      } while (!isValidString(name));

      do {
        price = prompt(`Сколько будет стоить верстка экрана "${name}" ? (введите число >= 0)`);
      } while (!isNumber(price) || price < 0); // по нажатию 'Отмена'/ESC выход НЕ произойдёт, т.к. isNumber(null) == false

      this.screens.push(
        { id: i++, name: name, price: parseFloat(price) });
    };
    //#endregion this.screens

    //#region ввод this.services (доп.услуги)
    servicesLoop: while (true) {
      name = "";
      price = 0;

      do {
        name = prompt("Какой тип дополнительной услуги нужен?\nВведите непустую строку, не являющуюся числом. Если доп.услуга не нужна, нажмите 'Отмена' или ESC");
        if (name === null)
          break servicesLoop; // выход из внешнего цикла ввода данных о доп.услугах, если нажаты 'Отмена'/ESC
      } while (!isValidString(name));

      do {
        price = prompt(`Сколько будет стоить услуга "${name}" ? (введите число >= 0)`);
      } while (!isNumber(price) || price < 0); // по нажатию 'Отмена'/ESC выход НЕ произойдёт, т.к. isNumber(null) == false

      addService(this.services, name, parseFloat(price));
    };
    //#endregion ввод this.services (доп.услуги)

    this.adaptive = confirm("Нужен ли адаптив на сайте? (Если не нужен, нажмите 'Отмена' или ESC)");
    return true;
  },

  getTitle: function () {
    const strTrim = String(this.title).trim();
    this.title = strTrim.charAt(0).toLocaleUpperCase() + strTrim.substring(1).toLocaleLowerCase();
  },

  addPrices: function () {
    this.screenPrice = this.screens.reduce((acc, item) => { return acc + item.price }, 0);

    for (const key in this.services) {
      this.allServicePrices += this.services[key];
    };
  },

  getFullPrice: function () {
    this.fullPrice = this.screenPrice + this.allServicePrices;
  },

  getServicePercentPrices: function () {
    this.servicePercentPrice = this.fullPrice - Math.round(this.fullPrice * (this.rollback / 100));
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

  logger: function () {
    // console.log(`Стоимость работы за вычетом отката (${this.rollback}%) посреднику: ${this.servicePercentPrice} рублей`);
    // console.log(this.screens);
    // console.log(this.services);

    for (const key in this) {
      console.log(`${key}: ${this[key]}`);
    };
  }
};

appData.start();
