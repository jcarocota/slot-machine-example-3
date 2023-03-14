import * as PIXI from "pixi.js";
import { Assets, Spritesheet } from "pixi.js";
import { SlotMachine } from "./SlotMachine";
import { Button } from "./Button";
import { InfoBar } from "./InfoBar";
import { ButtonState } from "./ButtonState";
import { config } from "../Config";
import { globals } from "./Globals";

export class App extends PIXI.Application {
  private loadScene = () => {
    let slotMachine: SlotMachine = new SlotMachine();
    this.stage.addChild(slotMachine);
    const activeColor: number = config.buttonColor;
    const disableColor: number = config.buttonColorDisabled;
    const hoverColor: number = config.buttonColorHover;
    const buttonWidth: number = config.buttonWidth; //pixels
    const buttonHeight: number = config.buttonHeight; // pixels

    let button: Button = new Button(
      "Play!",
      "Spinning...",
      "Click to play!",
      activeColor,
      disableColor,
      hoverColor,
      buttonWidth,
      buttonHeight,
      slotMachine.fireSlotMachinePlay
    );

    document.addEventListener("spinning", () => {
      button.setState(ButtonState.Disabled);
    });

    document.addEventListener("spin-end", () => {
      button.setState(ButtonState.Active);
    });

    this.stage.addChild(button);

    button.x = config.appWidth - buttonWidth;
    button.y = config.appHeight - buttonHeight;

    let infoBar = new InfoBar();
    this.stage.addChild(infoBar);

    infoBar.x = 0;
    infoBar.y = config.appHeight;
  };

  private loadApp = () => {
    let urlSpriteSheets: string[] = [];
    urlSpriteSheets.push(config.slotMachineSheet);
    urlSpriteSheets.push(config.slotMachineBlurredSheet);
    urlSpriteSheets.push(config.slotMachineSemiBlurredSheet);

    Assets.load(urlSpriteSheets).then((sheets: Record<string, Spritesheet>) => {
      //globals.app = app;
      globals.slotTextureSheet = sheets[config.slotMachineSheet];
      globals.slotBlurredTextureSheet = sheets[config.slotMachineBlurredSheet];
      globals.slotSemiBlurredTextureSheet =
        sheets[config.slotMachineSemiBlurredSheet];

      globals.numberOfSlotsInTextureSheet = Object.keys(
        globals.slotTextureSheet.textures
      ).length;

      //console.log('globals.numberOfSlotsInTextureSheet: ', globals.numberOfSlotsInTextureSheet);

      //mainScene(app);

      document.body.appendChild(this.view as HTMLCanvasElement);

      this.loadScene();
    });
  };

  constructor() {
    super({
      backgroundColor: config.backgroundAppColor,
      width: config.appWidth,
      height: config.appHeight,
    });
    this.loadApp();
  }
}
