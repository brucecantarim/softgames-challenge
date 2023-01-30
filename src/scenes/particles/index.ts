import * as PIXI from "pixi.js";
import BackButton from "../../components/BackButton";

const FireScene = (app: PIXI.Application) => {
  const container = new PIXI.Container();
  const sprites: PIXI.Sprite[] = [];
  const spritePool: PIXI.Sprite[] = [];
  const ticker = new PIXI.Ticker();

  // Importing the textures
  const fire1 = PIXI.Texture.from("../../assets/fire_01.png");
  const fire2 = PIXI.Texture.from("../../assets/fire_02.png");
  const flame1 = PIXI.Texture.from("../../assets/flame_01.png");
  const flame2 = PIXI.Texture.from("../../assets/flame_02.png");
  const flame3 = PIXI.Texture.from("../../assets/flame_03.png");
  const flame4 = PIXI.Texture.from("../../assets/flame_04.png");
  const flame5 = PIXI.Texture.from("../../assets/flame_05.png");
  const flame6 = PIXI.Texture.from("../../assets/flame_06.png");

  // Create a texture array from the imported textures
  const fireTextures = [
    fire1,
    fire2,
    flame1,
    flame2,
    flame3,
    flame4,
    flame5,
    flame6,
  ];

  // Pre-create a pool of sprites to use for the fire effect
  for (let i = 0; i < 10; i++) {
    // Create a random texture from the array
    let fireTexture =
      fireTextures[Math.floor(Math.random() * fireTextures.length)];
    let sprite = new PIXI.Sprite(fireTexture);
    spritePool.push(sprite);
  }

  const update = (delta: number) => {
    // Create new fire sprites
    if (sprites.length < 10) {
      let sprite = getSpriteFromPool();
      sprite.scale.set(Math.random() * 1 + 0.5);
      sprite.rotation = Math.random() * 0.2 - 0.1;
      sprite.x =
        Math.random() * 0.2 - 0.1 + (window.innerWidth / 2 - sprite.width / 2);
      sprite.y = window.innerHeight / 2 - sprite.height / 2;
      sprite.alpha = Math.random() * 0.5 + 0.5;
      sprite.tint = [0xd05f33, 0xff7621, 0xff9818, 0xfeb504][
        Math.floor(Math.random() * 4)
      ];
      sprites.push(sprite);
      container.addChild(sprite);
    }

    // Animate existing fire sprites
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      sprite.y -= delta * 15;
      sprite.alpha -= delta * 0.1;
      if (sprite.alpha <= 0) {
        container.removeChild(sprite);
        sprites.splice(i, 1);
        returnSpriteToPool(sprite);
      }
    }
  };

  const getSpriteFromPool = (): PIXI.Sprite => {
    let fireTexture =
      fireTextures[Math.floor(Math.random() * fireTextures.length)];
    if (spritePool.length > 0) {
      let sprite = spritePool.pop() ?? new PIXI.Sprite(fireTexture);
      sprite.alpha = 1;
      return sprite;
    } else {
      return new PIXI.Sprite(fireTexture);
    }
  };

  const returnSpriteToPool = (sprite: PIXI.Sprite) => {
    // Asign a random texture to the sprite
    let fireTexture =
      fireTextures[Math.floor(Math.random() * fireTextures.length)];
    sprite.texture = fireTexture;
    spritePool.push(sprite);
  };

  ticker.add((delta) => update(delta));
  ticker.start();

  // Create a container to hold the scene
  const scene = new PIXI.Container();
  scene.addChild(BackButton());
  scene.addChild(container);
  return scene;
};

export default FireScene;
