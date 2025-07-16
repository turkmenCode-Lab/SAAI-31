---
# Poweredby: @merdanusa
## Turkmen Code Lab - SAAI-31 

# Version: Beta MA-1
# Turkmen NLP Tokenizer & Semantic Search

**A Turkmen language text processing library that tokenizes input, lemmatizes, finds synonyms, removes stopwords, and performs semantic search over a knowledge base.**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Data](#data)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## About

This project provides an NLP pipeline tailored for the Turkmen language, enabling:

- Tokenization
- Lemmatization (word root extraction)
- Synonym recognition
- Stopword filtering
- Semantic fuzzy search over a knowledge base

It is built using TypeScript, Node.js, and the [`natural`](https://www.npmjs.com/package/natural) library, with a custom dictionary of suffixes, synonyms, and stopwords (conjunctions) specifically for Turkmen.

---

## Features

- **Tokenizer:** Splits Turkmen text into tokens.
- **Lemmatizer:** Extracts root forms of words by removing common suffixes.
- **Synonym Controller:** Maps words to their synonymous groups.
- **Stopwords Filter:** Removes common conjunctions and stopwords to improve search accuracy.
- **Semantic Search:** Performs fuzzy matching to find the best knowledge base entry matching the user input.

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/turkmen-nlp.git
   cd turkmen-nlp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make sure your data file is located at `D:\Shit\TS AI\data\knowledge.json` or update the path in `search.ts`.

---

## Usage

A simple CLI example:

```bash
npm start
```

Then enter your query in Turkmen, e.g.:

```
Nadip komek edip bilerin?
```

The program will output tokenized, lemmatized words, synonyms, filtered stopwords, and the best knowledge base match.

---

### Example code snippet:

```typescript
import Runner from "./utils/runner";
import readlineSync from "readline-sync";

Runner(readlineSync.question(`Nadip komek edip bilerin ? \nInput here: `));
```

---

## How It Works

1. **Tokenization:** Breaks input into words using `natural.WordTokenizer`.
2. **Lemmatization:** Removes suffixes to find root words based on a predefined list.
3. **Synonym Detection:** Matches words with their synonym groups.
4. **Stopword Removal:** Filters out conjunctions and common filler words.
5. **Semantic Search:** Uses fuzzy string matching (`string-similarity`) against your knowledge base entries to find the best match.

The search considers category, tags, and text content to compute a weighted similarity score for best results.

---

## Data

The project uses custom data files (`syntax.ts`) for:

- Suffixes (common Turkmen suffixes)
- Synonyms (groups of related words)
- Names (proper nouns to exclude from lemmatization)
- Conjunctions (stopwords to ignore)

Knowledge base JSON (`knowledge.json`) stores entries with:

- `id`
- `category`
- `tags`
- `text` (description or information)

---

## Project Structure

```
src/
 ├─ utils/
 │   └─ runner.ts      # CLI runner
 ├─ tokenizer.ts       # Main tokenizer pipeline
 ├─ lemmatizer.ts      # Lemmatization logic
 ├─ synonym.ts         # Synonym controller
 ├─ stopwords.ts       # Stopwords filter
 ├─ search.ts          # Semantic search logic
 ├─ data/
 │   └─ syntax.ts      # Suffixes, synonyms, names, conjunctions data
 └─ knowledge.json     # Knowledge base entries
```

---

## Contributing

Contributions are welcome! Please:

- Open issues for bugs or feature requests
- Submit pull requests with clear descriptions
- Add tests for new features or fixes

---

## License

Mozilla License © MERDAN @merdanusa

---

## Contact

For help or questions, please reach out: [shamerpubgjum@gmail.com](mailto:shamerpubgjum@gmail.com)

---

If you want, I can also help you write a **Turkmen language user guide** or add example queries to the README — just ask!
