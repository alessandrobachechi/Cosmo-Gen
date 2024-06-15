export const hashCode = (str) => {
  // Function to generate a consistent hash from a string
  var hash = 0,
    i,
    chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const seedRandom = (seed) => {
  // Function to create a seeded random number generator
  var x = Math.sin(seed) * 10000;
  return function () {
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };
};

export const random = (min, max, seededRandom) =>
  Math.floor(seededRandom() * (max - min)) + min;

export const randomFloat = (min, max, seededRandom) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  let random = seededRandom();

  return random * (max - min) + min;
};

export const randomElementFromArray = (array, seededRandom) => {
  return array[Math.floor(seededRandom() * array.length)];
};
