import natural from "natural";
import Lemmatizer from "../lib/lemmatizer";
import synonymController from "../lib/synonym";
import stopWords from "../lib/stopwords";
import Search, { Entry } from "../lib/search";
import Answer from "../lib/answer";
import runGemini from "../services/gemAI";
import {
  runDeepSeek,
  runOpenRouterAI,
  runKimiAI,
} from "../services/openRouter";

export default async function Tokenizer(
  string: string,
  gemAISearch: boolean,
  orAISearch: boolean,
  deepseekAISearch: boolean,
  kimiAISearch: boolean
) {
  if (gemAISearch) {
    runGemini(string);
    return null;
  } else if (orAISearch) {
    runOpenRouterAI(string);
    return null;
  } else if (deepseekAISearch) {
    runDeepSeek(string);
    return null;
  } else if (kimiAISearch) {
    runKimiAI(string);
    return null;
  } else {
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

    const search: Entry[] = mergedWords.length ? await Search(mergedWords) : [];

    const answer = search.length > 0 ? await Answer(search[0].text) : "";

    return {
      tokens: tokens || [],
      lemmatise,
      synonym,
      stopwords,
      search,
      answer,
    };
  }
}
