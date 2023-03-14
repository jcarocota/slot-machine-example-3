import { PrimaryConfig, primaryConfig } from "./PrimaryConfig";

interface Config extends PrimaryConfig {
  reelHeight: number;
  reelWidth: number;
  slotHeight: number;
  slotWidth: number;
  slotOffset: number;
}

//Final config - Do not change for a literal value
export const config: Config = {
  accelerationIndex: primaryConfig.accelerationIndex,
  appHeight: primaryConfig.appHeight,
  appWidth: primaryConfig.appWidth,
  backgroundAppColor: primaryConfig.backgroundAppColor,
  backgroundReelColor: primaryConfig.backgroundReelColor,
  blurStrengthIndex: primaryConfig.blurStrengthIndex,
  buttonColor: primaryConfig.buttonColor,
  buttonColorDisabled: primaryConfig.buttonColorDisabled,
  buttonColorHover: primaryConfig.buttonColorHover,
  buttonHeight: primaryConfig.buttonHeight,
  buttonWidth: primaryConfig.buttonWidth,
  bounceEffectDuration: primaryConfig.bounceEffectDuration,
  componentSeparator: primaryConfig.componentSeparator,
  delayBetweenReelSpin: primaryConfig.delayBetweenReelSpin,
  delayBetweenFPSUpdate: primaryConfig.delayBetweenFPSUpdate,
  maxBounceStepYAxis: primaryConfig.maxBounceStepYAxis,
  numberOfReels: primaryConfig.numberOfReels,
  numberOfSlotsByReel: primaryConfig.numberOfSlotsByReel,
  questionMarkAsset: primaryConfig.questionMarkAsset,
  reelHeight: 0,
  reelWidth: primaryConfig.slotMachineWidth / primaryConfig.numberOfReels,
  slotMachineHeight: primaryConfig.slotMachineHeight,
  slotMachineWidth: primaryConfig.slotMachineWidth,
  slotHeight:
    primaryConfig.slotMachineHeight / primaryConfig.numberOfSlotsByReel,
  slotWidth: primaryConfig.slotMachineWidth / primaryConfig.numberOfReels,
  slotMachineSheet: primaryConfig.slotMachineSheet,
  slotMachineBlurredSheet: primaryConfig.slotMachineBlurredSheet,
  slotMachineSemiBlurredSheet: primaryConfig.slotMachineSemiBlurredSheet,
  spinDurationInMilliseconds: primaryConfig.spinDurationInMilliseconds,
  spinSpeedIndex: primaryConfig.spinSpeedIndex,
  spinCompletionPercentageForDeceleration:
    primaryConfig.spinCompletionPercentageForDeceleration,
  slotOffset: 1, // number of not visible extra Slots to avoid blank spaces during reel animation
};

config.reelHeight =
  config.slotMachineHeight + config.slotHeight * config.slotOffset;
