import * as PIXI from "pixi.js";

import CardsScene from "./cards";
import TextScene from "./text";
import ParticlesScene from "./particles";

export interface SceneObject {
  [key: string]: {
    name: string;
    label: string;
    color: number;
    backgroundColor: number;
    start: (app?: PIXI.Application) => PIXI.Container;
  };
}

const Scenes: SceneObject = {
  cards: {
    name: "cards",
    label: "Cards Demo",
    color: 0xffffff,
    backgroundColor: 0xff5533,
    start: CardsScene,
  },
  text: {
    name: "text",
    label: "Text Tool Demo",
    color: 0xffffff,
    backgroundColor: 0x35cc5a,
    start: TextScene,
  },
  particles: {
    name: "particles",
    label: "Particles Demo",
    color: 0xffffff,
    backgroundColor: 0x3555ff,
    start: ParticlesScene,
  },
};

export default Scenes;
