import Tokenizer from "./tokenizer";
import Answer from "../lib/answer";
import readlineSync from "readline-sync";
import { farewells, greetings } from "../assets/syntax";

export type Model = {
  openAISearch: boolean;
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

  const answer = readlineSync
    .question(
      `AI search ulanjakmy?
      1) Gemini AI - 1
      2) Open Router AI AI - 2
      3) DeepSeek AI - 3
      4) KIMI K2 AI - 4
      n) YOK - n
      Sayla (1-4/n): `
    )
    .toLowerCase();

  const gemAISearch = answer === "1";
  const orAISearch = answer === "2";
  const deepseekAISearch = answer === "3";
  const kimiAISearch = answer === "4";

  const result = await Tokenizer(
    value,
    gemAISearch,
    orAISearch,
    deepseekAISearch,
    kimiAISearch
  );

  if (mode === "dev") {
    console.log({
      prompt: value,
      result,
    });
  } else {
    console.log("Prompt:", value);
    if (result?.search?.length) {
      console.log(greetings[Math.floor(Math.random() * greetings.length)]);
      const answers = await Promise.all(
        result.search.map((entry) => Answer(entry.text))
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
