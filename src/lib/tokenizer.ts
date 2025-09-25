import natural from "natural";
import Lemmatizer from "../lib/lemmatizer";
import synonymController from "../lib/synonym";
import stopWords from "../lib/stopwords";
import thinker from "../services/thinker";
import { runKeys } from "../assets/translator/translatorKeys";

export default async function Tokenizer(string: string) {
  const tokens = new natural.WordTokenizer().tokenize(string) || [];

  let isTranslate: boolean = false;

  if (tokens.some((token) => runKeys.includes(token.toLowerCase()))) {
    isTranslate = true;
  }

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

  const { search, answer, thinking } = mergedWords.length
    ? await thinker(mergedWords, isTranslate)
    : { search: [], answer: "", thinking: "" };

  return {
    tokens: tokens || [],
    lemmatise,
    synonym,
    stopwords,
    thinking,
    search,
    answer,
  };
}
