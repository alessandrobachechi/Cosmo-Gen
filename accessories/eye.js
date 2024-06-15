import Zdog from "zdog";

const yellow = "#ED0";
const gold = "#EA0";
const orange = "#E62";
const garnet = "#C25";
const eggplant = "#636";

export const createEye = (planetSize, pupilColor, irisColor) => {
  const eyeGroup = new Zdog.Group({
    translate: { z: planetSize },
  });

  // eye white
  new Zdog.Ellipse({
    addTo: eyeGroup,
    width: 160,
    height: 80,
    stroke: 8,
    fill: true,
    color: "white",
  });

  const iris = new Zdog.Ellipse({
    addTo: eyeGroup,
    diameter: 70,
    stroke: 8,
    fill: true,
    color: irisColor,
  });

  // pupil
  iris.copy({
    diameter: 40,
    color: pupilColor,
  });

  // highlight
  iris.copy({
    diameter: 30,
    translate: { x: 15, y: -15 },
    color: "white",
  });

  return eyeGroup;
};
