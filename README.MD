# Powered by: @merdanusa

## Turkmen Code Lab - SAAI-31

---

# Version: Beta MA-1

# Turkmen NLP Tokenizer & Semantic Search

**A Turkmen language text processing library that tokenizes input, lemmatizes words, identifies synonyms, removes stopwords, and performs semantic search over a knowledge base.**

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
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

This project provides a Natural Language Processing (NLP) pipeline tailored for the **Turkmen language**. It processes Turkmen text by tokenizing, lemmatizing, identifying synonyms, filtering stopwords, and performing semantic fuzzy searches over a knowledge base. Built with **TypeScript**, **Node.js**, and the [`natural`](https://www.npmjs.com/package/natural) library, it includes custom dictionaries for Turkmen suffixes, synonyms, names, and conjunctions.

The library is designed for applications requiring text analysis, search, or chatbot-like interactions in Turkmen, with optional integration with the **Google Gemini API** for enhanced search capabilities.

---

## Features

- **Tokenizer**: Splits Turkmen text into individual words using `natural.WordTokenizer`.
- **Lemmatizer**: Extracts root forms of words by removing common Turkmen suffixes (e.g., `yňyz`, `lar`, `da`).
- **Synonym Controller**: Maps words to synonymous groups for richer text understanding.
- **Stopwords Filter**: Removes common conjunctions (e.g., `we`, `ýa`, `çünki`) to improve search accuracy.
- **Semantic Search**: Performs fuzzy matching (`string-similarity`) to find the best match in a knowledge base based on category, tags, and text content.
- **Gemini API Integration**: Optionally uses the Google Gemini API for advanced query processing (requires `GEMINI_API_KEY`).
- **Custom Turkmen Data**: Includes tailored dictionaries for suffixes, synonyms, names, and conjunctions.

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

3. **Set up environment variables**:

   Create a `.env` file in the project root and add your Google Gemini API key if you plan to use the Gemini search feature:

   ```env
   GEMINI_API_KEY=your-api-key-here
   ```

4. **Prepare the knowledge base**:

   Ensure the knowledge base file is located at `D:\Shit\TS AI\data\knowledge.json` or update the file path in `src/search.ts` to match your setup. The knowledge base should follow this structure:

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

You will be prompted to enter a query in Turkmen, such as:

```
Nadip komek edip bilerin?
```

You’ll then be asked if you want to use the **Google Gemini API** for search (`y/n`). The program will output:

- Tokenized words
- Lemmatized words
- Synonyms
- Filtered stopwords
- The best matching knowledge base entry (if found)
- A formatted response with a random greeting and farewell

### Example Code Snippet

```typescript
import Runner from "./utils/runner";
import readlineSync from "readline-sync";

Runner(readlineSync.question(`Nadip komek edip bilern? \nInput here: `));
```

---

## Example Queries

Here are some example queries you can try and their expected behavior:

1. **Query**: `VPN-de WS nädip ulanyp bilerin?`

   - **Expected Output**: Tokenizes to `["VPN-de", "WS", "nädip", "ulanyp", "bilerin"]`, lemmatizes (e.g., `bilerin` → `bil`), finds synonyms, removes stopwords like `nädip`, and matches the WS knowledge base entry with a link to `https://vpn.ws.com/docs`.

2. **Query**: `SSH hyzmaty barada maglumat beriň`

   - **Expected Output**: Tokenizes, lemmatizes, and matches the SSH knowledge base entry with a link to `https://vpn.ssh.com/docs`.

3. **Query**: `Salam, maşyn satyn almak isleýärin`

   - **Expected Output**: Recognizes synonyms like `maşyn` → `awto`, `awtomobil` and processes the query, potentially using Gemini API if enabled.

4. **Query**: `Eýer kitaby nädip satyn alsam?`
   - **Expected Output**: Filters out `eýer` (stopword), maps `kitaby` to `kitap`, and searches for relevant entries.

---

## Turkmen Language User Guide

**Türkmençe ulanyjy gollanmasy**

Bu programma Türkmen dilinde ýazylan soraglaryňyzy prosessirlemek üçin niýetlenen. Programmany ulanmak üçin:

1. **Programmany başlatyň**:

   ```bash
   npm start
   ```

2. **Sorag giriziň**:
   Soragyňyzy Türkmen dilinde ýazyň, mysal üçin:

   ```
   Nadip komek edip bilern?
   ```

3. **Gemini API ulanmak**:
   Soragdan soň, programma siziň Google Gemini API ulanmak isleýändigiňizi sorar (`y` ýa-da `n` ýazyň). `y` saýlasaňyz, soragyňyz Gemini API arkaly prosessirlenýär (API açary gerek).

4. **Netijeleri göruň**:
   Programma aşakdaky maglumatlary çykarar:
   - **Tokenlar**: Soragyňyzdaky sözler bölünýär.
   - **Lemmalar**: Sözleriň kökleri tapylýar (mysal üçin, `bilerin` → `bil`).
   - **Sinonimler**: Synonim sözler tapylýar (mysal üçin, `maşyn` → `awto`).
   - **Stopwordlar**: Gerek däl sözler aýrylýar (mysal üçin, `we`, `çünki`).
   - **Bilim bazasyndaky iň gowy netije**: Soragyňyza iň ýakyn maglumat tapylýar.

**Mysallar**:

- Sorag: `VPN-de WS barada maglumat`
  - Netije: WS bilen baglanyşykly bilim bazasyndaky maglumat we `https://vpn.ws.com/docs` sahypasyna salgylanma.
- Sorag: `Salam, kitaby nädip satyn alyp bilerin?`
  - Netije: `kitaby` → `kitap`, `eýer` aýrylýar, sinonimler tapylýar, we degişli maglumat çykarylýar.

**Üns beriň**:

- Bilim bazasy faýly (`knowledge.json`) dogry ýerde bolmaly.
- Gemini API ulanmak üçin `.env` faýlynda `GEMINI_API_KEY` bolmaly.

---

## How It Works

1. **Tokenization**:

   - Uses `natural.WordTokenizer` to split input text into words.
   - Example: `Nadip komek edip bilern?` → `["Nadip", "komek", "edip", "bilern"]`.

2. **Lemmatization**:

   - Removes common Turkmen suffixes (from `suffixes` in `syntax.ts`) to find word roots.
   - Example: `bilerin` → `bil`, but proper names like `Merdan` are preserved.
   - Code: `lemmatizer.ts` checks against the `suffixes` array and `names` list.

3. **Synonym Detection**:

   - Maps words to synonym groups (from `synonyms` in `syntax.ts`) using `string-similarity`.
   - Example: `maşyn` → `["maşyn", "awto", "awtomobil"]`.

4. **Stopword Removal**:

   - Filters out conjunctions (from `conjunctions` in `syntax.ts`) like `we`, `ýa`, `çünki`.
   - Example: `eýer kitaby alsam` → removes `eýer`.

5. **Semantic Search**:

   - Uses `string-similarity` to compare input tokens against knowledge base entries (`knowledge.json`).
   - Considers category, tags, and text content with a weighted score (0.5 for similarity, 0.3 for tag matches, 0.2 for category match).
   - Returns the entry with the highest score above a threshold (0.1).

6. **Gemini API Integration**:

   - If enabled, sends the query to the Google Gemini API (`gemini-1.5-flash` model) for processing.
   - Requires a valid `GEMINI_API_KEY` in the `.env` file.

7. **Response Formatting**:
   - Wraps the search result with a random greeting and farewell (from `greetings` and `farewells` in `syntax.ts`).
   - Example: `Salam! [search result] Hoş sag bol!`

---

## Data

The project relies on custom data in `src/data/syntax.ts`:

- **Suffixes**: Common Turkmen suffixes for lemmatization (e.g., `yňyz`, `lar`, `da`).
- **Synonyms**: Groups of related words (e.g., `["maşyn", "awto", "awtomobil"]`).
- **Names**: Proper nouns to exclude from lemmatization (e.g., `Merdan`, `Serdar`).
- **Conjunctions**: Stopwords to filter out (e.g., `we`, `çünki`, `şonda`).
- **Greetings/Farewells**: Lists for response formatting.

The knowledge base (`knowledge.json`) contains entries with:

- `id`: Unique identifier
- `category`: Category (e.g., `WS`, `SSH`, `xHTTP`)
- `tags`: Keywords for search
- `text`: Descriptive content

---

## Project Structure

```
src/
 ├─ utils/
 │   └─ runner.ts      # CLI runner for user input
 ├─ tokenizer.ts       # Main pipeline for tokenization and processing
 ├─ lemmatizer.ts      # Logic for word root extraction
 ├─ synonym.ts         # Synonym mapping logic
 ├─ stopwords.ts       # Stopword filtering logic
 ├─ search.ts          # Semantic search over knowledge base
 ├─ answer.ts          # Response formatting with greetings/farewells
 ├─ middleware/
 │   └─ chat.ts        # Google Gemini API integration
 ├─ data/
 │   └─ syntax.ts      # Suffixes, synonyms, names, conjunctions
 └─ knowledge.json     # Knowledge base entries
```

---

## Contributing

Contributions are welcome! To contribute:

1. Open an issue for bugs, feature requests, or improvements.
2. Submit pull requests with clear descriptions of changes.
3. Add tests for new features or bug fixes.
4. Ensure code follows TypeScript conventions and includes comments.

---

## License

Mozilla Public License © MERDAN @merdanusa

---

## Contact

For questions or support, contact: [shamerpubgjum@gmail.com](mailto:shamerpubgjum@gmail.com)

---

This updated README provides a clear, comprehensive guide to the project, including a dedicated **Turkmen Language User Guide** and example queries to help users understand its functionality. Let me know if you need further tweaks, additional sections, or help with specific features!
