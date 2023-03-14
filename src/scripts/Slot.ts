import * as PIXI from "pixi.js";
import { config } from "../Config";
import { globals } from "./Globals";

export class Slot extends PIXI.Sprite {
  private textureSemiBlurred: PIXI.Texture;
  private textureBlurred: PIXI.Texture;
  private textureIdle: PIXI.Texture;

  moveVertical = (step: number) => {
    this.y += step;
  };

  showIdleTexture = () => {
    this.texture = this.textureIdle;
  };

  showBlurredTexture = () => {
    this.texture = this.textureBlurred;
  };

  showSemiBlurredTexture = () => {
    this.texture = this.textureSemiBlurred;
  };

  get top(): number {
    return this.y;
  }

  get bottom(): number {
    return this.y + this.height;
  }

  get left(): number {
    return this.x;
  }

  get right(): number {
    return this.x + this.width;
  }

  private getSlotTexture = (idTexture: string) => {
    let textureIdle = globals.slotTextureSheet?.textures[idTexture];
    textureIdle = textureIdle ? textureIdle : globals.questionMarkTexture;

    let textureBlurred = globals.slotBlurredTextureSheet?.textures[idTexture]; //TODO: Complete blurred textures;
    textureBlurred = textureBlurred
      ? textureBlurred
      : globals.questionMarkTexture;

    let textureSemiBlurred =
      globals.slotSemiBlurredTextureSheet?.textures[idTexture]; //TODO: Complete blurred textures;
    textureSemiBlurred = textureSemiBlurred
      ? textureSemiBlurred
      : globals.questionMarkTexture;

    const textures: PIXI.Texture[] = [];
    textures.push(textureIdle);
    textures.push(textureBlurred);
    textures.push(textureSemiBlurred);

    return textures;
  };

  constructor(idTexture: string) {
    super();

    const textures: PIXI.Texture[] = this.getSlotTexture(idTexture);
    this.textureIdle = textures[0];
    this.textureBlurred = textures[1];
    this.textureSemiBlurred = textures[2];
    this.width = config.slotWidth;
    this.height = config.slotHeight;

    this.showIdleTexture();
  }
}
