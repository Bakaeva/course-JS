let title = "Название проекта";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 5000;
let rollback = 20;
let fullPrice = 100000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(
  "Стоимость верстки экранов " + screenPrice + " рублей/ долларов/гривен/юани",
);
console.log(
  "Стоимость разработки сайта " + fullPrice + " рублей/ долларов/гривен/юани",
);
console.log(screens.toLowerCase().split(", "));
console.log(
  "Процент отката посреднику за работу " + fullPrice * (rollback / 100),
);
