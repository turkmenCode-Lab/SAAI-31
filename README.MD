# Powered by: @merdanusa

---

## Turkmen Code Lab - SAAI-31

---

# Version: Beta MA-2

# Turkmen NLP Tokenizer & Semantic Search

**A Turkmen language text processing library that tokenizes input, lemmatizes words, identifies synonyms, removes stopwords, performs semantic search over a knowledge base, detects math intents, and solves mathematical expressions.**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Example Queries](#example-queries)
- [Turkmen Language User Guide](#turkmen-language-user-guide)
- [How It Works](#how-it-works)
- [Data](#data)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

This project is a **Natural Language Processing (NLP)** pipeline tailored for the **Turkmen language**. It processes Turkmen text through tokenization, lemmatization, synonym detection, stopword removal, semantic search over a knowledge base, and math intent detection with calculation. Built with **TypeScript**, **Node.js**, and libraries like [`natural`](https://www.npmjs.com/package/natural), [`string-similarity`](https://www.npmjs.com/package/string-similarity), and [`mathjs`](https://www.npmjs.com/package/mathjs), it includes custom dictionaries for Turkmen suffixes, synonyms, names, conjunctions, and math operators.

This library is ideal for applications requiring text analysis, search, math calculations, or chatbot-like interactions in Turkmen.

---

## Features

- **Tokenizer**: Splits Turkmen text into words using `natural.WordTokenizer`.
- **Lemmatizer**: Extracts word roots by removing common Turkmen suffixes (e.g., `yňyz`, `lar`, `da`).
- **Synonym Controller**: Maps words to synonym groups for richer text understanding.
- **Stopword Filter**: Removes common conjunctions (e.g., `we`, `ýa`, `çünki`) to improve search accuracy.
- **Semantic Search**: Performs fuzzy matching with `string-similarity` over a knowledge base, considering categories, tags, and text.
- **Math Intent Detection & Calculation**: Detects math-related queries (e.g., operators like `gosmak` for `+`) and evaluates expressions using `mathjs`, supporting arithmetic, trigonometry, algebra, and more advanced functions.
- **Custom Turkmen Data**: Includes dictionaries for suffixes, synonyms, names, conjunctions, greetings, farewells, and math operators.
- **Interactive CLI**: Processes user queries with random greetings and farewells for a friendly experience.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/turkmen-nlp.git
   cd turkmen-nlp
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   Key dependencies include:

   - `natural` for tokenization.
   - `string-similarity` for fuzzy matching in search and synonyms.
   - `mathjs` for advanced math calculations.
   - `readline-sync` for CLI input.
   - `fs`, `path` (built-in) for file handling.

3. **Prepare the knowledge base**:

   Ensure the knowledge base file is located at `D:\Shit\TS AI\data\knowledge.json` or update the file path in `src/lib/search.ts`. The knowledge base should follow this structure:

   ```json
   {
     "data": [
       {
         "id": 1,
         "category": "WS",
         "tags": ["websocket", "xray"],
         "text": "Siziň VPN hyzmatyňyzda WS goldawy bar..."
       },
       ...
     ]
   }
   ```

---

## Usage

Run the CLI application to process Turkmen text queries:

```bash
npm start
```

You’ll be prompted to enter a query in Turkmen, such as:

```
Nadip komek edip bilern?
Input here: VPN-de WS barada maglumat
```

Next, choose a mode (Dev or Production):

```
Mode sayla:
    1) Dev (Full logs)
    2) Production (Minimal logs)
    Sayla (1/2): 2
```

If math is detected, it will compute the result directly. Otherwise, it proceeds to local semantic search. The output includes:

- **Tokens**: Split words from the input.
- **Lemmatized Words**: Root forms of words.
- **Synonyms**: Mapped synonymous words.
- **Stopwords**: Filtered conjunctions.
- **Search Result**: Best matching knowledge base entry (if found).
- **Answer**: Formatted response with a random greeting and farewell, or math result.

### Example Code Snippet

```typescript
import Runner from "./utils/runner";
import readlineSync from "readline-sync";

Runner(readlineSync.question(`Nadip komek edip bilern? \nInput here: `));
```

---

## Example Queries

1. **Query**: `VPN-de WS nädip ulanyp bilerin?`

   - **Output**: Tokenizes to `["VPN-de", "WS", "nädip", "ulanyp", "bilerin"]`, lemmatizes (e.g., `bilerin` → `bil`), finds synonyms, removes `nädip`, and matches the WS entry with a link to `https://vpn.ws.com/docs`.

2. **Query**: `SSH hyzmaty barada maglumat beriň`

   - **Output**: Matches the SSH entry with a link to `https://vpn.ssh.com/docs`.

3. **Query**: `Salam, maşyn satyn almak isleýärin`

   - **Output**: Maps `maşyn` to `["maşyn", "awto", "awtomobil"]`, processes with local search.

4. **Query**: `Eýer kitaby nädip satyn alsam?`

   - **Output**: Filters `eýer`, maps `kitaby` to `kitap`, and searches for relevant entries.

5. **Math Query**: `10 gosmak 10`

   - **Output**: Detects math intent, translates to `10 + 10`, computes `20`.

6. **Advanced Math Query**: `sinus 30 gosmak kwadrat kök 9`

   - **Output**: Translates to `sin(30 deg) + sqrt(9)`, computes approximately `0.5 + 3 = 3.5`.

---

## Turkmen Language User Guide

**Türkmençe ulanyjy gollanmasy**

Bu programma Türkmen dilinde ýazylan soraglary prosessirlemek üçin niýetlenen. Programmany ulanmak üçin:

1. **Programmany başlatyň**:

   ```bash
   npm start
   ```

2. **Sorag giriziň**:

   Soragyňyzy Türkmen dilinde ýazyň, mysal üçin:

   ```
   Nadip komek edip bilern?
   Input here: VPN-de WS barada maglumat
   ```

3. **Mod saýlaň**:

   ```
   Mode sayla:
       1) Dev (Full logs)
       2) Production (Minimal logs)
       Sayla (1/2): 2
   ```

   Eger sorag matematika bilen baglanyşykly bolsa (mysal üçin, `gosmak`, `ayyrmak`), programma awtomatiki hasaplaýar. Başga ýagdaýda ýerli bilim bazasynda semantik gözleg ulanylýar.

4. **Netijeleri göruň**:

   Programma aşakdaky maglumatlary çykarar:

   - **Tokenlar**: Soragyň sözleri bölünýär (mysal üçin, `["VPN-de", "WS", "nädip"]`).
   - **Lemmalar**: Sözleriň kökleri tapylýar (mysal üçin, `bilerin` → `bil`).
   - **Sinonimler**: Synonim sözler tapylýar (mysal üçin, `maşyn` → `awto`).
   - **Stopwordlar**: Gerek däl sözler aýrylýar (mysal üçin, `nädip`, `eýer`).
   - **Bilim bazasy netijesi**: Soraga iň ýakyn maglumat tapylýar.
   - **Jogap**: Tötän salam we hoşlaşyk bilen formatlanan jogap, ýa-da matematika netijesi.

**Mysallar**:

- **Sorag**: `VPN-de WS barada maglumat`
  - **Netije**: WS bilen baglanyşykly bilim bazasyndaky maglumat we `https://vpn.ws.com/docs` sahypasyna salgylanma.
- **Sorag**: `Salam, kitaby nädip satyn alyp bilerin?`
  - **Netije**: `kitaby` → `kitap`, `eýer` aýrylýar, sinonimler tapylýar, degişli maglumat.
- **Sorag**: `xHTTP näme?`
  - **Netije**: xHTTP bilen baglanyşykly bilim bazasyndaky maglumat we `https://vpn.xhttp.com/docs` sahypasyna salgylanma.
- **Matematika Sorag**: `10 gosmak 5 ayyrmak 2`
  - **Netije**: `10 + 5 - 2 = 13`.
- **Çylşyrymly Matematika**: `kub 3 gosmak sinus 90`
  - **Netije**: `3**3 + sin(90 deg) = 27 + 1 = 28`.

**Üns beriň**:

- Bilim bazasy faýly (`knowledge.json`) dogry ýerde bolmaly.
- Matematika hasaplamalary üçin `mathjs` ulanylýar – köp funksiýalary (trigonometriýa, algebra, we ş.m.) goldaýar.

---

## How It Works

1. **Tokenization**:

   - Splits input text into words using `natural.WordTokenizer`.
   - Example: `Nadip komek edip bilern?` → `["Nadip", "komek", "edip", "bilern"]`.

2. **Lemmatization**:

   - Removes Turkmen suffixes (from `suffixes` in `syntax.ts`) to find word roots, preserving proper names.
   - Example: `bilerin` → `bil`, but `Merdan` remains unchanged.

3. **Synonym Detection**:

   - Maps words to synonym groups (from `synonyms` in `syntax.ts`) using `string-similarity`.
   - Example: `maşyn` → `["maşyn", "awto", "awtomobil"]`.

4. **Stopword Removal**:

   - Filters conjunctions (from `conjunctions` in `syntax.ts`) like `we`, `ýa`, `çünki`.
   - Example: `eýer kitaby alsam` → removes `eýer`.

5. **Math Intent Detection**:

   - Checks for math operators (English like `+`, or Turkmen like `gosmak`) using `isMath` with fuzzy matching.
   - If detected, translates to standard math expressions and evaluates with `mathjs`.
   - Example: `10 gosmak 10` → `10 + 10` → `20`.

6. **Semantic Search**:

   - Uses `string-similarity` to compare tokens against knowledge base entries (`knowledge.json`).
   - Scores entries based on category (20%), tags (30%), and text similarity (50%).
   - Returns the highest-scoring entry above a 0.1 threshold.

7. **Response Formatting**:
   - Wraps the result with a random greeting and farewell (from `greetings` and `farewells` in `syntax.ts`).
   - Example: `Salam! [search result] Hoş sag bol!` or direct math output.

---

## Data

The project uses custom data in `src/data/syntax.ts`:

- **Suffixes**: Turkmen suffixes for lemmatization (e.g., `yňyz`, `lar`, `da`).
- **Synonyms**: Word groups (e.g., `["maşyn", "awto", "awtomobil"]`).
- **Names**: Proper nouns to exclude from lemmatization (e.g., `Merdan`, `Serdar`).
- **Conjunctions**: Stopwords (e.g., `we`, `çünki`, `şonda`).
- **Math Operators**: English operators (e.g., `+`, `sin`) and Turkmen mappings (e.g., `gosmak` → `+`, `sinus` → `sin`).
- **Greetings/Farewells**: Lists for response formatting.

The knowledge base (`knowledge.json`) contains entries with:

- `id`: Unique identifier
- `category`: E.g., `WS`, `SSH`, `xHTTP`
- `tags`: Keywords for search
- `text`: Descriptive content

---

## Project Structure

```
src/
 ├─ utils/
 │   ├─ runner.ts      # CLI runner for user input
 │   ├─ isMath.ts      # Math intent detection
 │   └─ mathIntentDetector.ts  # Math mode activation
 ├─ lib/
 │   ├─ tokenizer.ts   # Main NLP pipeline
 │   ├─ lemmatizer.ts  # Word root extraction
 │   ├─ synonym.ts     # Synonym mapping
 │   ├─ stopwords.ts   # Stopword filtering
 │   ├─ search.ts      # Semantic search
 │   └─ answer.ts      # Response formatting
 ├─ services/
 │   └─ runMathCalculation.ts  # Math expression evaluation
 ├─ data/
 │   └─ syntax.ts      # Suffixes, synonyms, names, conjunctions, math operators
 └─ knowledge.json     # Knowledge base entries
```

---

## Troubleshooting

- **Error: "Cannot find knowledge.json"**:
  - Ensure the file exists at `D:\Shit\TS AI\data\knowledge.json` or update the path in `src/lib/search.ts`.
- **Math Calculation Error (SyntaxError)**:
  - Ensure the query has valid math terms; check for typos in operators like `gosmak`.
  - Update `mathOperatorsInTurkmen` if a term is missing.
- **No search results**:
  - Check that the knowledge base contains relevant entries.
  - Try broader or simpler queries (e.g., `WS` instead of `VPN-de WS nädip`).
- **Math Not Detected**:
  - Add more terms to `mathOperatorsInTurkmen` or lower the similarity threshold in `isMath`.

---

## Contributing

Contributions are welcome! To contribute:

1. Open an issue for bugs, features, or improvements.
2. Submit pull requests with clear descriptions.
3. Add tests for new features or fixes.
4. Follow TypeScript conventions and include comments.

---

## License

Mozilla Public License © MERDAN @merdanusa

---

## Contact

For questions or support, contact: [shamerpubgjum@gmail.com](mailto:shamerpubgjum@gmail.com)

---

### Changes Made (from Beta MA-1 to MA-2)

1. **Added Math Features**: Integrated math intent detection and calculation with `mathjs` for arithmetic, trig, algebra, etc.
2. **Removed AI Integrations**: Eliminated Google Gemini, OpenRouterAI, DeepSeek, and KimiAI integrations, focusing on local semantic search and math calculations.
3. **Updated Features & How It Works**: Included sections on math processing, removed AI-related content.
4. **Enhanced Examples**: Added math query examples in English and Turkmen sections.
5. **Data Updates**: Added math operators to the data description.
6. **Project Structure**: Removed AI-related files (e.g., `gemAI.ts`, `openRouter.ts`), kept math-related files like `isMath.ts` and `runMathCalculation.ts`.
7. **Troubleshooting**: Updated to focus on local search and math errors, removed AI-related issues.
8. **Version Bump**: Updated to Beta MA-2.
9. **Maintained Core Content**: Kept the core NLP functionality, data, and examples intact while improving readability.
