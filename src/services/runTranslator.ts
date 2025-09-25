import stringSimilarity from "string-similarity";
import { runTranslateFromEngToTm } from "../assets/translator/translatorKeys";
import translate from "@vitalets/google-translate-api";

export default async function runTranslator(prompt: string): Promise<string> {
    const lowerPrompt = prompt.toLowerCase().trim();

    if (runTranslateFromEngToTm.some(op => lowerPrompt.includes(op.toLowerCase()))) {
        const res = await translate(prompt, { from: "en", to: "tk" });
        return res.text;
    }

    const threshold = 0.85;
    if (runTranslateFromEngToTm.some(op => stringSimilarity.compareTwoStrings(op.toLowerCase(), lowerPrompt) >= threshold)) {
        const res = await translate(prompt, { from: "en", to: "tk" });
        return res.text;
    }

    const res = await translate(prompt, { from: "tk", to: "en" });
    return res.text;
}
