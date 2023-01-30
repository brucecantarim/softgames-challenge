import * as PIXI from "pixi.js";

import BackButton from "../../components/BackButton";
import concatenate from "./concatenate";
import { textArray, emojiArray, imageArray } from "./data";

const TextScene = () => {
  const container = new PIXI.Container();

  let intervalId: ReturnType<typeof setInterval> | undefined;

  const generateItems = (min: number, max: number) => {
    const randomItem = (items: any[]) =>
      items[Math.floor(Math.random() * items.length)];

    // generate a random number of items between min and max
    let numberOfItems = min + Math.floor(Math.random() * min);
    let items = [];

    for (let i = 0; i < numberOfItems; i++) {
      let random = Math.floor(Math.random() * 3);
      if (random === 0) {
        items.push(randomItem(textArray));
      } else if (random === 1) {
        items.push(randomItem(emojiArray));
      } else {
        items.push(randomItem(imageArray));
      }
    }
    return items;
  };

  const createRandomContainer = () => {
    // create a new container with random items
    let randomContainer = concatenate(null, ...generateItems(2, 5));
    container.addChild(randomContainer);
    // set the container's position to the center of the screen
    container.x = window.innerWidth / 2 - container.width / 2;
    container.y = window.innerHeight / 2 - container.height / 2;
  };

  const start = () => {
    // create the first container upon loading the scene
    createRandomContainer();

    // create a new container every 2 seconds
    intervalId = setInterval(() => {
      // remove the previous container
      container.removeChildren();
      // create a new container with random items
      createRandomContainer();
    }, 2000);
  };

  start();

  // Create a scene container
  const scene = new PIXI.Container();
  scene.addChild(BackButton());
  scene.addChild(container);

  return scene;
};

export default TextScene;
