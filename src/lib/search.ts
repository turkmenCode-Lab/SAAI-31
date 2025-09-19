import * as fs from "fs/promises";
import * as path from "path";
import stringSimilarity from "string-similarity";

export type Entry = {
  id: number;
  category: string;
  tags: string[];
  text: string;
};

export default async function Search(words: string[]): Promise<Entry[]> {
  const filePath = path.join("data", "knowledge.json");

  let jsonData: { data: Entry[] };
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    jsonData = JSON.parse(rawData);
  } catch (err: any) {
    console.error("Error reading or parsing JSON:", err);
    return [];
  }

  const entries = jsonData.data;
  const scoredEntries: { entry: Entry; score: number }[] = [];

  for (const entry of entries) {
    const searchableTokens = [
      ...entry.category.split(/\s+/).map((t) => t.toLowerCase()),
      ...entry.tags.map((t) => t.toLowerCase()),
      ...entry.text.split(/\s+/).map((t) => t.toLowerCase()),
      entry.text.toLowerCase(),
    ].filter((t) => t.length > 0);

    const inputTokens = words
      .flatMap((word) => {
        const lowerWord = word.toLowerCase();
        return lowerWord.includes(".") ? lowerWord.split(".") : [lowerWord];
      })
      .filter((t) => t.length > 0);

    const scores = inputTokens.map((token) => {
      const bestMatch = stringSimilarity.findBestMatch(
        token,
        searchableTokens
      ).bestMatch;
      return bestMatch.rating;
    });

    const tagMatches = entry.tags
      .map((t) => t.toLowerCase())
      .filter((t) => inputTokens.includes(t)).length;

    const categoryMatch = inputTokens.includes(entry.category.toLowerCase())
      ? 1
      : 0;

    const maxSimilarity = Math.max(...scores);

    const weightedScore =
      0.5 * maxSimilarity + 0.3 * tagMatches + 0.2 * categoryMatch;

    scoredEntries.push({ entry, score: weightedScore });
  }

  scoredEntries.sort((a, b) => b.score - a.score);

  const topMatches = scoredEntries
    .filter((s) => s.score > 0.1)
    .slice(0, 4)
    .map((s) => s.entry);

  console.log("Top Matches:", topMatches);
  return topMatches;
}
