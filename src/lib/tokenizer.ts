import natural from "natural";
import Lemmatizer from "../lib/lemmatizer";
import synonymController from "../lib/synonym";
import stopWords from "../lib/stopwords";
import Search, { Entry } from "../lib/search";
import Answer from "../lib/answer";
import mathIntentDetector from "./mathIntentDetector";
import runMathCalculation from "../services/runMathCalculation";

export default async function Tokenizer(string: string) {
  const tokens = new natural.WordTokenizer().tokenize(string);

  const lemmatise = tokens ? Lemmatizer(tokens) : [];
  const synonym = lemmatise ? synonymController(lemmatise) : [];
  const stopwords = synonym ? stopWords(synonym) : [];

  const mergedWords = Array.from(
    new Set([
      ...(stopwords ?? []),
      ...(synonym ?? []),
      ...(lemmatise ?? []),
      ...(tokens ?? []),
    ])
  );

  const mathintentdetector: boolean = mergedWords.length
    ? mathIntentDetector(mergedWords.join(" "))
    : false;

  const search: Entry[] = mergedWords.length ? await Search(mergedWords) : [];

  let answer = "";
  if (mathintentdetector) {
    answer = await runMathCalculation(string);
  } else if (search.length > 0) {
    answer = await Answer(search[0].text);
  }

  return {
    tokens: tokens || [],
    lemmatise,
    synonym,
    stopwords,
    search,
    answer,
  };
}
