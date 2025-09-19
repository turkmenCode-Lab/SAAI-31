import isMath from "../utils/isMath";

export default function mathIntentDetector(prompt: string) {
  const mathDetected = isMath(prompt);

  if (mathDetected) {
    console.log("Math detected! Activating math mode...");
  } else {
    console.log("No math detected. Normal mode...");
  }

  return mathDetected;
}
