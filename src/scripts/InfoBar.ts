import * as PIXI from "pixi.js";

export class InfoBar extends PIXI.Container {
  private initInfoBar = () => {
    const text: PIXI.Text = new PIXI.Text();
    text.style = {
      fontFamily: "Verdana",
      fontSize: 20,
      fill: ["#000000"],
    };

    text.anchor.set(0, 1);

    PIXI.Ticker.shared.add(
      () => (text.text = `FPS: ${Math.round(PIXI.Ticker.shared.FPS)}`)
    );

    this.addChild(text);
  };

  constructor() {
    super();
    this.initInfoBar();
  }
}
