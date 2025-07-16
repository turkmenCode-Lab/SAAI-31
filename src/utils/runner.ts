import Tokenizer from "../tokenizer";

export default async function Runner(value: string): Promise<void> {
  const result = await Tokenizer(value);
  console.log(result);
}
