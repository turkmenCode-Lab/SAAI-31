import { conjunctions } from "../data/syntax";

export default function stopWords(words: string[]) {
  return words.filter((word) => {
    return !conjunctions.some(
      (conj) => conj.tm === word || conj.translit === word
    );
  });
}
