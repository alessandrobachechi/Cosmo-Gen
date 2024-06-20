import "./style.css";
import Zdog from "zdog";
import { Howl } from "howler";
import { createEye } from "./accessories/eye";
import { createBody } from "./accessories/body";
import { createEars } from "./accessories/ears";
import { createConeHat } from "./accessories/coneHat";
import { randomElementFromArray, random, hashCode, seedRandom } from "./random";
import { createMouth } from "./accessories/mouth";
import gsap from "gsap";
import Splitting from "splitting";

let planetSize;
let planet;
let isDragging = false; // Variabile per tracciare il trascinamento
let bgNoise = new Howl({
  src: ["ambient.mp3"],
  html5: true,
  loop: true,
});

// Three.js variables
let scene, camera, renderer, particles, particleSystem;

const playSound = () => {
  bgNoise.play();
  document.removeEventListener("click", playSound);
};
document.addEventListener("click", playSound);

document.addEventListener("DOMContentLoaded", () => {
  Splitting({ target: "#home h1", by: "chars" });
  Splitting({ target: "#home p", by: "words" });

  const tl = gsap.timeline({ defaults: { duration: 1.4, ease: "power4.out" } });

  tl.from("#home h1 span", { y: "100%", opacity: 0, stagger: 0.1 })
    .from("#home p span", { y: "100%", opacity: 0, stagger: 0.05 }, "-=1")
    .fromTo(
      "#startButton",
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1 },
      "-=1"
    );

  const startButton = document.getElementById("startButton");
  const homeSection = document.getElementById("home");
  const formSection = document.getElementById("formSection");
  const planetSection = document.getElementById("planetSection");

  startButton.addEventListener("click", () => {
    homeSection.style.display = "none";
    formSection.style.display = "flex";
    animate();
  });

  const form = document.getElementById("planetForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    formSection.style.display = "none";
    planetSection.style.display = "flex";
    createPlanet();
    stopAnimate();
  });

  initThreeJS();
  animate();
});

const initThreeJS = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 400;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("backgroundCanvas"),
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background

  window.addEventListener("resize", onWindowResize);

  let particleCount = 500; // Increased number of particles
  particles = new THREE.BufferGeometry();
  let pMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

  let positions = [];
  for (let i = 0; i < particleCount; i++) {
    positions.push(Math.random() * 800 - 400);
    positions.push(Math.random() * 800 - 400);
    positions.push(Math.random() * 800 - 400);
  }

  particles.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  particleSystem = new THREE.Points(particles, pMaterial);
  scene.add(particleSystem);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  requestAnimationFrame(animate);
  particleSystem.rotation.y += 0.002;
  renderer.render(scene, camera);
};

const stopAnimate = () => {
  // Funzione vuota per evitare la cancellazione dell'animazione di Three.js
};

const createPlanet = () => {
  if (document.querySelector(".zdog-canvas")) {
    document.querySelector(".zdog-canvas").remove();
  }

  const canvas = document.createElement("canvas");
  canvas.classList.add("zdog-canvas");
  document.getElementById("planetContainer").appendChild(canvas);

  const name = document.getElementById("name").value.toLowerCase();
  const surname = document.getElementById("surname").value.toLowerCase();
  const birthdate = new Date(
    document.getElementById("birthdate").value
  ).toISOString();

  // Create a hash from name, surname, and birthdate
  const seed = hashCode(`${name}${surname}${birthdate}`);

  // Seed the random number generator
  const seededRandom = seedRandom(seed);

  planetSize = seededRandom() * 100 + 50;
  const planetColor = `hsl(${seededRandom() * 360}, 80%, 60%)`;

  planet = new Zdog.Illustration({
    element: ".zdog-canvas",
    resize: "fullscreen",
    dragRotate: true, // Abilita la rotazione manuale
    onDragStart: function () {
      isDragging = true; // Set dragging to true on drag start
    },
    onDragEnd: function () {
      isDragging = false; // Set dragging to false on drag end
    },
  });

  const mouth = createMouth(planetSize);
  planet.addChild(mouth);

  const starfield = createStarfield(seededRandom, 500, 1000);
  planet.addChild(starfield);

  const randomBody = createBody(planetColor, random(150, 300, seededRandom));
  planet.addChild(randomBody);

  const randomAccessory = createAccessories(seededRandom);
  planet.addChild(randomAccessory);

  const irisColor = `hsl(${seededRandom() * 360}, 80%, 60%)`;
  const pupilColor = `hsl(${seededRandom() * 360}, 80%, 60%)`;
  const eyeGroup = createEye(planetSize, pupilColor, irisColor);
  planet.addChild(eyeGroup);

  animateZdog();
};

const animateZdog = () => {
  if (!planet) return;

  // Rotate the planet if it is not being dragged
  if (!isDragging) {
    planet.rotate.y += 0.001;
  }

  planet.updateRenderGraph();
  requestAnimationFrame(animateZdog);
};

const createAccessories = (seededRandom) => {
  const accessories = [createEars(planetSize), createConeHat(planetSize)];
  return randomElementFromArray(accessories, seededRandom);
};

const createStarfield = (seededRandom, starCount, starRange) => {
  let starGroup = new Zdog.Group();
  for (let i = 0; i < starCount; i++) {
    new Zdog.Ellipse({
      addTo: starGroup,
      diameter: 0,
      translate: {
        x: seededRandom() * 2 * starRange - starRange,
        y: seededRandom() * 2 * starRange - starRange,
        z: seededRandom() * 2 * starRange - starRange,
      },
      stroke: seededRandom() * (2 - 0.5) + 0.5,
      color: `hsla(0, 0%, 100%, ${seededRandom()})`,
    });
  }
  return starGroup;
};
