import * as PIXI from "pixi.js";
import { config } from "../Config";
//import { PlayButton } from "./PlayButton";

interface Globals {
  app?: PIXI.Application;
  numberOfSlotsInTextureSheet: number;
  slotTextureSheet?: PIXI.Spritesheet;
  slotBlurredTextureSheet?: PIXI.Spritesheet;
  slotSemiBlurredTextureSheet?: PIXI.Spritesheet;
  reelsStoppedAfterPlay: number;
  questionMarkTexture: PIXI.Texture;
  //playButton?: PlayButton;
}

export const globals: Globals = {
  numberOfSlotsInTextureSheet: 0,
  reelsStoppedAfterPlay: config.numberOfReels,
  questionMarkTexture: PIXI.Texture.from(config.questionMarkAsset),
};
