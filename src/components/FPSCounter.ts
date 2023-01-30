import * as PIXI from "pixi.js";

const FPSCounter = () => {
  const fpsText = new PIXI.Text("FPS: 0", {
    fontFamily: "Arial",
    fontSize: 14,
    fill: 0xffffff,
  });
  const container = new PIXI.Container();
  const ticker = new PIXI.Ticker();
  let frameCount = 0;
  let lastTime = Date.now();

  container.addChild(fpsText);

  const updateFPS = (delta: number) => {
    frameCount++;

    const now = Date.now();
    if (now - lastTime >= 1000) {
      const fps = frameCount / ((now - lastTime) / 1000);
      fpsText.text = `FPS: ${fps.toFixed(2)}`;
      frameCount = 0;
      lastTime = now;
    }
  };

  ticker.add((delta) => updateFPS(delta));
  ticker.start();
  return container;
};

export default FPSCounter;
