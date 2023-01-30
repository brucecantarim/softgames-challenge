import * as PIXI from "pixi.js";

const concatenate = (
  fontSize: number | null | undefined,
  ...args: any[]
): PIXI.Container => {
  let container = new PIXI.Container();

  for (let i = 0; i < args.length; i++) {
    let element = args[i];
    // create a container for each element, so we can position them
    let itemContainer = new PIXI.Container();
    // set random font size unless a font size is specified
    const scale = fontSize ?? Math.floor(Math.random() * 24) + 16;

    if (typeof element === "string" && !element.endsWith(".png")) {
      let text = new PIXI.Text(element);
      // set random font size unless a font size is specified
      text.style.fontSize = scale;
      text.style.fill = 0xffffff;
      itemContainer.addChild(text);
    } else if (typeof element === "object" && element.texture) {
      // if element is a PIXI.Texture
      let sprite = new PIXI.Sprite(element);
      itemContainer.addChild(sprite);
    } else if (typeof element === "string" && element.endsWith(".png")) {
      // if element is a string and ends with '.png'
      let texture = PIXI.Texture.from(element);
      let sprite = new PIXI.Sprite(texture);
      sprite.scale.x = scale / sprite.width;
      sprite.scale.y = scale / sprite.height;
      itemContainer.addChild(sprite);
    }
    container.addChild(itemContainer);
  }

  // position the items in the container
  let xPos = 0;
  container.children.forEach((child: PIXI.Container) => {
    child.x = xPos;
    xPos += child.width + 10;
    child.y += (container.height - child.height) / 2;
  });

  return container;
};

export default concatenate;
