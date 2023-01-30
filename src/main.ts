import * as PIXI from "pixi.js";
import "./styles.css";

import events from "./utils/events";

import MenuScene from "./scenes/menu";
import Scenes from "./scenes";
import FPSCounter from "./components/FPSCounter";

// Create the application
const options = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
};

let app = new PIXI.Application(options);

// @ts-ignore // TS is complaining about the type of app.view
document.getElementById("game-container").appendChild(app.view);

// Add the initial scene
let currentScene: PIXI.Container = MenuScene(app);
app.stage.addChild(currentScene);
app.stage.addChild(FPSCounter());

// Listen for scene change events
events.on("changeScene", (newScene: string) => {
  app.stage.removeChild(currentScene);
  currentScene.destroy({ children: true });
  currentScene = Scenes[newScene].start(app);
  app.stage.addChild(currentScene);
});

events.on("back", () => {
  app.stage.removeChild(currentScene);
  currentScene.destroy({ children: true });
  currentScene = MenuScene(app);
  app.stage.addChild(currentScene);
});
