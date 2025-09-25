import isMath from "../utils/isMath";
import isChemistry from "../utils/isChemistry";
import googleSearch, { GoogleEntry } from "../lib/googleSearch";
import Answer from "../lib/answer";
import runMathCalculation from "./runMathCalculation";
import runChemistrySolver from "./runChemistrySolver";
import mathThinkings from "../assets/thinkers/math";
import searchThinkings from "../assets/thinkers/search";
import chemistryThinkings from "../assets/thinkers/chemistry";
import translationThinkings from "../assets/thinkers/translationThinkings"
import runTranslator from "./runTranslator";

function randomItem(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function thinker(prompt: string[], isTranslate: boolean): Promise<{
    search: GoogleEntry[];
    answer: string;
    thinking: string;
}> {
    const joinedPrompt = prompt.join(" ");

    let answer = "";
    let searchResults: GoogleEntry[] = [];
    let thinking = "";

    if (isMath(joinedPrompt)) {
        thinking = randomItem(mathThinkings);
        try {
            const result = await runMathCalculation(joinedPrompt);
            answer = `${joinedPrompt} = ${result || "Hasaplap bolmady"}`;
        } catch (err) {
            console.error("Math error:", err);
            answer = "Matematika meselesini çözmekde ýalňyşlyk boldy. Webden gözleýärin...";
            searchResults = await googleSearch(joinedPrompt);
        }
    } else if (isChemistry(joinedPrompt)) {
        thinking = randomItem(chemistryThinkings);
        try {
            const result = await runChemistrySolver(joinedPrompt);
            answer = result.success
                ? `Jogap: ${result.result} (Formula: ${result.formula || 'Tapylmady'})`
                : "Himiýa maglumat tapylmady. Has giňişleýin sorag soraň.";
        } catch (err) {
            console.error("Chemistry error:", err);
            answer = "Himiýa meselesini çözmekde ýalňyşlyk boldy.";
        }
    } else if (isTranslate) {
        thinking = randomItem(translationThinkings);
        try {
            const translatedText = await runTranslator(joinedPrompt);
            answer = `Terjime: ${translatedText || "Terjime edilmadi"}`;
        } catch (err) {
            console.error("Translator error:", err);
            answer = "Terjime etmekde nasazlyk boldy. Täzeden synanyşyp görüň.";
        }
    } else {
        thinking = randomItem(searchThinkings);
        searchResults = await googleSearch(joinedPrompt);
        if (searchResults.length > 0) {
            answer = await Answer([thinking, searchResults[0].snippet]);
        } else {
            answer = "No relevant results found.";
        }
    }

    return {
        search: searchResults,
        answer,
        thinking,
    };
}

export default thinker;
