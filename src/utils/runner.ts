import Tokenizer from "./tokenizer";
import readlineSync from "readline-sync";

export type Model = {
  openAISearch: boolean;
  prompt: string;
};

export default async function Runner(value: string): Promise<void> {
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

  console.log({
    prompt: value,
    result,
  });
}
