import Tokenizer from "../lib/tokenizer";
import Answer from "../lib/answer";
import readlineSync from "readline-sync";
import { farewells, greetings } from "../assets/syntax";

export type Model = {
    prompt: string;
};

export default async function Runner(value: string): Promise<void> {
    const modeAnswer = readlineSync.question(
        `Mode sayla: 
    1) Dev (Full logs)
    2) Production (Minimal logs)
    Sayla (1/2): `
    );

    const mode = modeAnswer === "1" ? "dev" : "prod";

    const result = await Tokenizer(value);

    if (mode === "dev") {
        console.log({
            prompt: value,
            result,
        });
    } else {
        console.log("Prompt:", value);
        console.log("Thinking:", result.thinking);
        if (result.answer) {
            console.log(result.answer);
        } else if (result?.search?.length) {
            console.log(greetings[Math.floor(Math.random() * greetings.length)]);
            const answers = await Promise.all(
                result.search.map((entry) => Answer([entry.text]))
            );
            answers.forEach((ans, i) => {
                console.log(ans);
            });
            console.log(farewells[Math.floor(Math.random() * farewells.length)]);
        } else {
            console.log("No matches found or AI search returned null.");
        }
    }
}