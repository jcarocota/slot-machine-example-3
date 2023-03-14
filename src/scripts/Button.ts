import * as PIXI from "pixi.js";
import { config } from "../Config";
import { ButtonState } from "./ButtonState";

export class Button extends PIXI.Container {
  buttonText: string;
  disabledText?: string;
  hoverText?: string;

  activeColor?: number;
  disabledColor?: number;
  hoverColor?: number;

  buttonWidth?: number;
  buttonHeight?: number;

  private defaultColor: number;
  private background: PIXI.Graphics;
  private text: PIXI.Text = new PIXI.Text();

  private initButton = () => {
    this.background = new PIXI.Graphics();
    this.text = new PIXI.Text();

    this.buttonWidth = this.buttonWidth ? this.buttonWidth : config.buttonWidth;
    this.buttonHeight = this.buttonHeight
      ? this.buttonHeight
      : config.buttonHeight;

    this.text.anchor.set(0.5);

    this.text.x = this.buttonWidth / 2;
    this.text.y = this.buttonHeight / 2;
    this.text.style = {
      fontFamily: "Verdana",
      fontSize: 20,
      fill: ["#FFFFFF"],
    };

    if (this.buttonText) {
      this.text.text = this.buttonText;
    }

    this.addChild(this.background);
    this.addChild(this.text);

    this.setState(ButtonState.Active);

    this.on("pointerenter", (e) => {
      if (this.eventMode == "static") {
        this.setState(ButtonState.Hover);
      }
    });

    this.on("pointerleave", (e) => {
      if (this.eventMode == "static") {
        this.setState(ButtonState.Active);
      }
    });
  };

  setState = (state: ButtonState) => {
    if (!this.buttonWidth || !this.buttonHeight) {
      return;
    }

    let buttonColor: number | undefined;
    let buttonText: string | undefined;

    switch (state) {
      case ButtonState.Hover:
        buttonColor = this.hoverColor;
        buttonText = this.hoverText;
        break;
      case ButtonState.Disabled:
        buttonColor = this.disabledColor;
        buttonText = this.disabledText;
        this.eventMode = "auto";
        break;
      default:
        buttonColor = this.activeColor;
        buttonText = this.buttonText;
        this.eventMode = "static";
        break;
    }

    buttonColor = buttonColor ? buttonColor : this.defaultColor;
    buttonText = buttonText ? buttonText : this.buttonText;

    this.background.clear();
    this.background.beginFill(buttonColor);
    this.background.drawRect(0, 0, this.buttonWidth, this.buttonHeight);
    this.background.endFill();
    this.text.text = buttonText;
  };

  set clickEvent(clickEvent: (e?: PIXI.FederatedPointerEvent) => void) {
    this.on("pointerdown", (e) => {
      clickEvent(e);
    });
  }

  constructor(
    buttonText?: string,
    disabledText?: string,
    hoverText?: string,
    activeColor?: number,
    disabledColor?: number,
    hoverColor?: number,
    buttonWidth?: number,
    buttonHeight?: number,
    clickEvent?: (e?: PIXI.FederatedPointerEvent) => void
  ) {
    super();
    this.buttonText = buttonText ? buttonText : "";
    this.disabledText = disabledText;
    this.hoverText = hoverText;
    this.activeColor = activeColor;
    this.disabledColor = disabledColor;
    this.hoverColor = hoverColor;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.defaultColor = config.buttonColor;

    if (clickEvent) {
      this.clickEvent = clickEvent;
    }

    this.initButton();
  }
}
