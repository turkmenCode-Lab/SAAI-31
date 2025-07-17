import Tokenizer from "../tokenizer";
import readlineSync from "readline-sync";

export type Model = {
  openAISearch: boolean;
  prompt: string;
};

export default async function Runner(value: string): Promise<void> {
  const answer = readlineSync
    .question("OpenAI search ulanjakmy? (y/n): ")
    .toLowerCase();

  const gemAISearch = answer === "y";

  const result = await Tokenizer(value, gemAISearch);

  console.log({
    gemAISearch,
    prompt: value,
    result,
  });
}
