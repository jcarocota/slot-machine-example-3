export interface PrimaryConfig {
  accelerationIndex: number;
  appHeight: number;
  appWidth: number;
  backgroundAppColor: number;
  backgroundReelColor: number;
  blurStrengthIndex: number;
  buttonColor: number;
  buttonColorDisabled: number;
  buttonColorHover: number;
  buttonHeight: number;
  buttonWidth: number;
  bounceEffectDuration: number;
  componentSeparator: number;
  delayBetweenReelSpin: number;
  delayBetweenFPSUpdate: number;
  maxBounceStepYAxis: number;
  numberOfReels: number;
  numberOfSlotsByReel: number;
  questionMarkAsset: string;
  slotMachineHeight: number;
  slotMachineWidth: number;
  slotMachineSheet: string;
  slotMachineBlurredSheet: string;
  slotMachineSemiBlurredSheet: string;
  spinDurationInMilliseconds: number;
  spinCompletionPercentageForDeceleration: number;
  spinSpeedIndex: number;
}

//This part must be set by the user
export const primaryConfig: PrimaryConfig = {
  accelerationIndex: 0.2, //Amount of pixels for speed increment during reel spinning
  appHeight: 450, // Height in pixels for APP
  appWidth: 600, // Width in pixels for APP
  backgroundAppColor: 0xd5d8dc, //Hex color for App background
  backgroundReelColor: 0x0d2331, //Hex color for Reel background
  blurStrengthIndex: 20, //Blur index for Slots during spinning
  buttonColor: 0x2ecc71,
  buttonColorDisabled: 0x566573,
  buttonColorHover: 0xf4d03f,
  buttonHeight: 80,
  buttonWidth: 180,
  bounceEffectDuration: 1000, //Duration in Milliseconds for reel bouncing effect
  componentSeparator: 10, //Pixels of separation between components
  delayBetweenReelSpin: 300, //Delay in Milliseconds to start a new reel spinning
  delayBetweenFPSUpdate: 500, //Delay in Milliseconds for updating FPS Info
  maxBounceStepYAxis: 30, //Max step in pixels that a reel could experiment during bouncing animation
  numberOfReels: 5, //Number of reels in slot machine
  numberOfSlotsByReel: 3, //Number of slots by reel
  questionMarkAsset: "./assets/sprites/question_mark.png",
  slotMachineHeight: 360, //Height in pixels for the slot machine
  slotMachineWidth: 600, //Width in pixels for the slot machine
  slotMachineSheet: "./assets/sprites/slot-machine.json", //Path of slot machine sprites' atlas
  slotMachineBlurredSheet: "./assets/sprites/slot-machine-blur.json", //Path of slot machine sprites' atlas
  slotMachineSemiBlurredSheet: "./assets/sprites/slot-machine-semi-blur.json", //Path of slot machine sprites' atlas
  spinDurationInMilliseconds: 3000, //Duration in Milliseconds of spin event for each reel
  spinCompletionPercentageForDeceleration: 0.6, //When spin animations reach this percentage, reel speed will decrease
  spinSpeedIndex: 15, //Pixels, the size of step each slot is needed to move each spin
};
