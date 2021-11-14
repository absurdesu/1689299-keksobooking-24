const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (firstNumber, secondNumber, digits = 1) => {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const shuffleArray = (array) => {
  for (let firstElement = array.length -1; firstElement > 0; firstElement--) {
    const secondElement = Math.floor(Math.random() * (firstElement + 1));
    [array[firstElement], array[secondElement]] = [array[secondElement], array[firstElement]];
  }
  return array;
};

const getRandomArray = (array) => {
  const newArray = shuffleArray(array);
  return newArray.slice(0, getRandomPositiveInteger(0, array.length - 1));
};

const changeElementState = (elements, isDisabled) => {
  elements.forEach((element) => element.disabled = isDisabled);
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray, changeElementState};
