// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive

const getRandomIntFromRange = (from, to) => (from > to) ? 'Введите корректный диапазон!' : Math.floor(Math.random() * (Math.ceil(to) - Math.ceil(from) + 1) + Math.ceil(from));

getRandomIntFromRange(0, 100);

const getRandomFloatFromRange = (from, to, digitsAfterPoint) => (from > to) ? 'Введите корректный диапазон!' : (Math.random() * (to - from) + from).toFixed(digitsAfterPoint);

getRandomFloatFromRange(0, 100.52, 2);
