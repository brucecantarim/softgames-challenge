import * as PIXI from "pixi.js";

import events from "../../utils/events";

import Button from "../../components/Button";
import Scenes from "../index";

const MenuScene = (app: PIXI.Application): PIXI.Container => {
  // Create a container for the Main Menu
  const container = new PIXI.Container();

  // Create a button for each scene
  const buttons = Object.values(Scenes).map((scene) => {
    const { name, label, color, backgroundColor } = scene;
    return Button({
      label,
      width: window.innerWidth / 3 - 20,
      height: 120,
      callback: () => {
        events.emit("changeScene", name);
      },
      color,
      backgroundColor,
    });
  });

  container.addChild(...buttons);

  const setButtonsPosition = () => {
    buttons.forEach((button, i) => {
      if (window.innerWidth > window.innerHeight) {
        button.x = i * (button.width + 10);
        button.y = 0;
      } else {
        button.x = 0;
        button.y = i * (button.height + 10);
      }
    });
    container.x = (app.screen.width - container.width) / (buttons.length - 1);
    container.y = (app.screen.height - container.height) / (buttons.length - 1);
  };

  // Listen for window resize events and update the layout
  window.addEventListener("resize", onWindowResize);
  function onWindowResize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    setButtonsPosition();
  }

  // Call the resize function once to set the initial layout
  onWindowResize();

  return container;
};

export default MenuScene;
