import * as PIXI from "pixi.js";

interface ButtonProps {
  label: string;
  width: number;
  height: number;
  callback: () => void;
  color?: number;
  backgroundColor?: number;
}

const Button = ({
  label,
  width,
  height,
  callback,
  color = 0xffffff,
  backgroundColor = 0xff0000,
}: ButtonProps) => {
  // Create the button object
  const button = new PIXI.Container();

  const radius = 20;

  // Create the graphics object
  const graphics = new PIXI.Graphics();
  graphics.beginFill(0x333333);
  graphics.drawRoundedRect(0, 0, width, height, radius);
  graphics.endFill();
  button.addChild(graphics);

  // Create the text object
  const style = new PIXI.TextStyle({
    fontFamily: "Impact",
    fill: color,
  });
  const text = new PIXI.Text(label, style);
  text.x = (width - text.width) / 2;
  text.y = (height - text.height) / 2;
  button.addChild(text);

  // Add interactivity
  button.interactive = true;
  button.on("pointerdown", callback);
  button.on("pointerover", () => {
    graphics.clear();
    graphics.beginFill(color);
    graphics.drawRoundedRect(0, 0, width, height, radius);
    graphics.endFill();
    graphics.beginFill(backgroundColor);
    graphics.drawRoundedRect(5, 5, width - 10, height - 10, radius / 1.5);
    graphics.endFill();
    text.x = (width - text.width) / 2;
    text.y = (height - text.height) / 2;
  });
  button.on("pointerout", () => {
    graphics.clear();
    graphics.beginFill(0x333333);
    graphics.drawRoundedRect(0, 0, width, height, radius);
    graphics.endFill();
    text.x = (width - text.width) / 2;
    text.y = (height - text.height) / 2;
  });

  // Return the button object
  return button;
};

export default Button;
