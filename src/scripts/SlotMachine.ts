import * as PIXI from "pixi.js";
import { Reel } from "./Reel";
import { config } from "../Config";

export class SlotMachine extends PIXI.Container {
  reels: Reel[];

  private createSlotMachine = () => {
    this.width = config.slotMachineWidth;
    this.height = config.slotMachineHeight;

    this.reels = [];

    for (let i = 0; i < config.numberOfReels; i++) {
      const reel: Reel = new Reel();
      reel.x = i * config.reelWidth;
      reel.y = 0; //-1*config.slotHeight;
      this.reels.push(reel);
      this.addChild(reel);
    }

    const visibleAreaSlotMachine = new PIXI.Graphics();
    visibleAreaSlotMachine.beginFill(0xffffff);
    visibleAreaSlotMachine.drawRect(
      0,
      0,
      config.slotMachineWidth,
      config.slotMachineHeight
    );
    visibleAreaSlotMachine.endFill();

    this.mask = visibleAreaSlotMachine;
  };

  fireSlotMachinePlay = () => {
    document.dispatchEvent(new Event("spinning"));

    const ticker = new PIXI.Ticker();
    ticker.autoStart = false;
    ticker.stop();

    config.delayBetweenReelSpin;
    let timerReelSpin = 0;
    let reelIndex = 0;
    let elapsedTime = 0;
    let reelsFinished = 0;
    ticker.add(() => {
      if (timerReelSpin == 0 && reelIndex < this.reels.length) {
        this.reels[reelIndex].fireSpinReel().then(() => {
          reelsFinished++;
        });
        reelIndex++;
      }

      timerReelSpin += ticker.elapsedMS;
      timerReelSpin =
        timerReelSpin >= config.delayBetweenReelSpin ? 0 : timerReelSpin;
      elapsedTime += ticker.elapsedMS;

      if (reelsFinished == config.numberOfReels) {
        ticker.stop();
        ticker.destroy();
        document.dispatchEvent(new Event("spin-end"));
      }
    });

    ticker.start();
  };

  constructor() {
    super();
    this.createSlotMachine();
  }
}
