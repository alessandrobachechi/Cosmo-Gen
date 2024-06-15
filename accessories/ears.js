import Zdog from "zdog";

export const createEars = (planetSize) => {
  const earsGroup = new Zdog.Group();
  const earRight = new Zdog.Ellipse({
    addTo: earsGroup,
    diameter: 80,
    quarters: 2,
    stroke: 20,
    color: "#C25",
    translate: { x: planetSize },
  });

  earRight.copy({
    scale: { x: -1 },
    translate: { x: -planetSize },
  });

  return earsGroup;
};
