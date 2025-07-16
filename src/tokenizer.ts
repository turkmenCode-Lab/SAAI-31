import natural from "natural";
import Lemmatizer from "./lemmatizer";
import synonymController from "./synonym";
import stopWords from "./stopwords";
import Search from "./search";

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

  const search = mergedWords.length ? await Search(mergedWords) : [];

  return { tokens: tokens || [], lemmatise, synonym, stopwords, search };
}
