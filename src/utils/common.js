//функция инкремента
export function incrementCounter(startFrom) {
  let counterStart = startFrom;
  return function () {
    return counterStart++;
  };
}

//получение рандомного элемента из массива
export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

//получение рандомного числа
export function getRandomNumber(maxNumber) {
  return Math.ceil(Math.random() * maxNumber);
}

//получение рандомного числа из диапазона
export function getRandomNumberFromRange (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//получение рандомного булева значения
export function getRandomBool() {
  return Math.random() >= 0.5;
}

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
