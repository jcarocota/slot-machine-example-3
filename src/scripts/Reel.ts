import * as PIXI from "pixi.js";
import { Slot } from "./Slot";
import { globals } from "./Globals";
import { config } from "../Config";

export class Reel extends PIXI.Container {
  private slots: Slot[];

  private getRandomIdTexture = () => {
    const numFruit: number = Math.ceil(
      Math.random() * globals.numberOfSlotsInTextureSheet
    );
    const tagSlot: string = numFruit.toString();

    return tagSlot;
  };

  private createBackground = () => {
    const background: PIXI.Graphics = new PIXI.Graphics();
    background.beginFill(config.backgroundReelColor);
    background.drawRect(0, 0, config.reelWidth, config.reelHeight);
    background.endFill();
    this.addChild(background);
  };

  private setSlotsOnReadyPosition = () => {
    this.slots.forEach((slot: Slot, i: number) => {
      slot.x = 0;
      slot.y = i * config.slotHeight;
    });
  };

  private bounceReel = () => {
    const promise = new Promise<void>((resolve) => {
      const ticker = new PIXI.Ticker();
      ticker.autoStart = false;
      ticker.stop();

      let remainingBounceEffectDuration = config.bounceEffectDuration;
      let sineAngle = 0;

      this.slots.forEach((slot) => slot.showSemiBlurredTexture());

      ticker.add((dt: number) => {
        let bounceYAxis =
          config.maxBounceStepYAxis * Math.sin(sineAngle) -
          config.maxBounceStepYAxis;
        bounceYAxis *=
          remainingBounceEffectDuration / config.bounceEffectDuration;

        sineAngle += 0.5;
        this.y = bounceYAxis * dt;

        remainingBounceEffectDuration -= ticker.elapsedMS;

        if (remainingBounceEffectDuration <= 0) {
          this.y = 0;
          ticker.stop();
          ticker.destroy();
          this.setSlotsOnReadyPosition();
          this.slots.forEach((slot) => slot.showIdleTexture());
          resolve();
        }
      });

      ticker.start();
    });

    return promise;
  };

  private animateReel = () => {
    const promise = new Promise<void>((resolve) => {
      let elapsedTime = 0;

      const ticker = new PIXI.Ticker();
      ticker.autoStart = false;
      ticker.stop();

      const realReelDuration =
        config.spinDurationInMilliseconds -
        config.delayBetweenReelSpin * config.numberOfReels;
      //let spinSpeed = config.spinSpeedIndex;

      let stopMode = false;

      ticker.add((dt: number) => {
        //spinSpeed = elapsedTime > realReelDuration*config.spinCompletionPercentageForDeceleration ? spinSpeed*0.9 : spinSpeed;

        this.slots.forEach((slot: Slot, i: Number) => {
          slot.showBlurredTexture();
          slot.moveVertical(config.spinSpeedIndex * dt);
        });

        if (!stopMode && this.slots[0].top > 0) {
          const yPositionNewSlot = this.slots[0].y - config.slotHeight;
          const idTexture: string = this.getRandomIdTexture();
          const slot = new Slot(idTexture);
          this.slots.splice(0, 0, slot);
          this.addChild(slot);
          slot.y = yPositionNewSlot;
        }

        if (this.slots[this.slots.length - 1].top > config.reelHeight) {
          this.removeChild(this.slots[this.slots.length - 1]);
          this.slots.pop();
        }

        elapsedTime += ticker.elapsedMS;
        //console.log("elapsedTime:", elapsedTime);
        stopMode = elapsedTime >= realReelDuration;

        if (stopMode && this.slots[0].top >= 0) {
          ticker.stop();
          ticker.destroy();
          this.setSlotsOnReadyPosition();
          this.bounceReel().then(() => {
            resolve();
          });
        }
      });

      ticker.start();
    });

    return promise;
  };

  fireSpinReel = async () => {
    await this.animateReel();
  };

  private createReel = () => {
    this.createBackground();

    this.slots = [];

    for (let i = 0; i < config.numberOfSlotsByReel + config.slotOffset; i++) {
      const idTexture: string = this.getRandomIdTexture();

      const slot = new Slot(idTexture);
      this.slots.push(slot);
      this.addChild(slot);
    }

    this.setSlotsOnReadyPosition();
  };

  constructor() {
    super();
    this.createReel();
  }
}
