import Zdog from "zdog";

export const createBody = (color, size) => {
  return new Zdog.Shape({
    color: color, // colore random
    stroke: size, // dimensione random
  });
};
