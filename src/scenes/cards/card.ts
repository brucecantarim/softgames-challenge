import * as PIXI from "pixi.js";

const Card = (label: number) => {
  const card = new PIXI.Container();
  const graphics = new PIXI.Graphics();
  const color = Math.random() * 0xffffff;
  const text = new PIXI.Text(label.toString(), { fill: color });

  graphics.beginFill(color);
  graphics.drawRoundedRect(0, 0, 100, 150, 10);
  graphics.endFill();
  graphics.beginFill(0xffffff);
  graphics.drawCircle(50, 75, 40);
  graphics.endFill();
  card.addChild(graphics);

  text.x = (100 - text.width) / 2;
  text.y = (150 - text.height) / 2;
  card.addChild(text);

  return card;
};

export default Card;
