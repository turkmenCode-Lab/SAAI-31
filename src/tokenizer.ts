import natural from "natural";
import Lemmatizer from "./lemmatizer";
import synonymController from "./synonym";
import stopWords from "./stopwords";
import Search, { Entry } from "./search";
import Answer from "./answer";
import runGemini from "./middleware/chat";

export default async function Tokenizer(string: string, gemAISearch: boolean) {
  if (gemAISearch) {
    runGemini(string);
  }

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

  const search: Entry | null = mergedWords.length
    ? await Search(mergedWords)
    : null;

  const answer = search ? await Answer(search.text) : "";

  return {
    tokens: tokens || [],
    lemmatise,
    synonym,
    stopwords,
    search,
    answer,
  };
}
