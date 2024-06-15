import Zdog from "zdog";

export const createConeHat = (planetSize) => {
  const coneHat = new Zdog.Cone({
    diameter: 70,
    length: 90,
    stroke: false,
    color: "#636",
    backface: "#C25",
    rotate: { x: Zdog.TAU / 4 },
    translate: { y: -planetSize },
  });

  return coneHat;
};
