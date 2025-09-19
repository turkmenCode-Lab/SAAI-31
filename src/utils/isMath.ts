import stringSimilarity from "string-similarity";
import { mathOperators, mathOperatorsInTurkmen } from "../assets/syntax";

export default function isMath(prompt: string): boolean {
  const lowerPrompt = prompt.toLowerCase();

  if (mathOperators.some((op) => lowerPrompt.includes(op))) return true;

  if (
    Object.keys(mathOperatorsInTurkmen).some((key) => lowerPrompt.includes(key))
  )
    return true;

  const turkmenKeys = Object.keys(mathOperatorsInTurkmen);
  const threshold = 0.8;
  for (const key of turkmenKeys) {
    const similarity = stringSimilarity.compareTwoStrings(key, lowerPrompt);
    if (similarity >= threshold) return true;
  }

  if (!/\d/.test(lowerPrompt)) return false;

  if (/[a-z0-9]+\s*[\+\-\*\/\%\^]\s*[a-z0-9]+/.test(lowerPrompt)) return true;
  if (/(sin|cos|tan|log|exp|sqrt|cbrt)\s*\(?\d+\)?/.test(lowerPrompt))
    return true;

  return false;
}
