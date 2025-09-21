import isMath from "../utils/isMath";
import search, { Entry } from "../lib/search";
import Answer from "../lib/answer";
import runMathCalculation from "../services/runMathCalculation";
import { mathThinkings, searchThinkings } from "../assets/syntax";

function randomItem(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function thinker(prompt: string[]): Promise<{
    search: Entry[];
    answer: string;
    thinking: string;
}> {
    const joinedPrompt: string = prompt.join(" ");

    let answer = "";
    let searchResults: Entry[] = [];
    let thinking = "";

    if (isMath(joinedPrompt)) {
        thinking = randomItem(mathThinkings);
        const result = await runMathCalculation(joinedPrompt);
        answer = `${joinedPrompt} = ${result}`;
    } else {
        thinking = randomItem(searchThinkings);
        searchResults = await search(prompt);
        if (searchResults.length > 0) {
            answer = await Answer([thinking, searchResults[0].text ]);
        }
    }

    return {
        search: searchResults,
        answer,
        thinking,
    };
}

export default thinker;
