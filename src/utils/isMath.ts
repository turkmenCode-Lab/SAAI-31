import stringSimilarity from "string-similarity";
import { operators, mathOperatorsInTurkmen } from "../assets/math/operators";

export default function isMath(prompt: string): boolean {
    const lowerPrompt = prompt.toLowerCase().trim();

    if (!/\d/.test(lowerPrompt)) return false;

    if (operators.some(op => lowerPrompt.includes(op))) return true;

    if (Object.keys(mathOperatorsInTurkmen).some(key => lowerPrompt.includes(key))) return true;

    const threshold = 0.9;
    for (const key of Object.keys(mathOperatorsInTurkmen)) {
        if (stringSimilarity.compareTwoStrings(key, lowerPrompt) >= threshold) return true;
    }

    if (/[0-9]+\s*[\+\-\*\/\%\^]\s*[0-9]+/.test(lowerPrompt)) return true;

    if (/(sin|cos|tan|cot|sec|csc|asin|acos|atan|log|ln|exp|sqrt|cbrt|pi)\s*\(?[0-9]*\)?/.test(lowerPrompt)) {
        return true;
    }

    return false;
}
