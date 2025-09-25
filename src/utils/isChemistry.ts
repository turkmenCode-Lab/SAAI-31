import stringSimilarity from "string-similarity";
import elements from "../assets/chemistry/elements";
import chemistryKeywords from "../assets/chemistry/operators";

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/ý/g, "y")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ň/g, "n")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isChemistry(prompt: string): boolean {
  const lowerPrompt = normalizeString(prompt);
  const words = lowerPrompt.split(/\s+/);

  if (
    Object.values(chemistryKeywords).some((k: string) =>
      words.includes(normalizeString(k))
    )
  ) {
    return true;
  }

  const exactMatch = elements.some((el) =>
    [el.english, el.turkmen, el.greek ?? "", el.latin ?? "", el.symbol].some(
      (name) => words.includes(normalizeString(name))
    )
  );
  if (exactMatch) return true;

  const threshold = 0.85;
  for (const word of words) {
    if (word.length <= 2) continue;
    for (const el of elements) {
      const names = [
        el.english,
        el.turkmen,
        el.greek ?? "",
        el.latin ?? "",
        el.symbol,
      ].map(normalizeString);

      if (
        names.some(
          (name) => stringSimilarity.compareTwoStrings(name, word) >= threshold
        )
      ) {
        return true;
      }
    }
  }

  return false;
}

export default isChemistry;
