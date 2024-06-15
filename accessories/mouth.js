import Zdog from "zdog";

export const createMouth = (planetSize) => {
  const mouth = new Zdog.Ellipse({
    diameter: 70,
    quarters: 2,
    translate: { y: planetSize / 2, z: planetSize },
    rotate: { z: Zdog.TAU / 4 },
    closed: true,
    color: "#FED",
    stroke: 0.5,
    fill: true,
    backface: false,
  });

  return mouth;
};
