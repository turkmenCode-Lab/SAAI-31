# Powered by: @merdanusa

---

## Turkmen Code Lab - SAAI-31

---

# Version: Beta MA-1

# Turkmen NLP Tokenizer & Semantic Search

**A Turkmen language text processing library that tokenizes input, lemmatizes words, identifies synonyms, removes stopwords, and performs semantic search over a knowledge base, with optional AI model integrations.**

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

This project is a **Natural Language Processing (NLP)** pipeline tailored for the **Turkmen language**. It processes Turkmen text through tokenization, lemmatization, synonym detection, stopword removal, and semantic search over a knowledge base. Built with **TypeScript**, **Node.js**, and the [`natural`](https://www.npmjs.com/package/natural) library, it includes custom dictionaries for Turkmen suffixes, synonyms, names, and conjunctions.

The pipeline supports local semantic search and optional integration with multiple AI models for enhanced query processing:

- **Google Gemini API** (`gemini-1.5-flash`)
- **OpenRouterAI** (`meta-llama/llama-3-8b-instruct`)
- **DeepSeek** (`deepseek/deepseek-r1-0528:free`)
- **KimiAI** (`moonshotai/kimi-k2:free`)

This library is ideal for applications requiring text analysis, search, or chatbot-like interactions in Turkmen.

---

## Features

- **Tokenizer**: Splits Turkmen text into words using `natural.WordTokenizer`.
- **Lemmatizer**: Extracts word roots by removing common Turkmen suffixes (e.g., `yňyz`, `lar`, `da`).
- **Synonym Controller**: Maps words to synonym groups for richer text understanding.
- **Stopword Filter**: Removes common conjunctions (e.g., `we`, `ýa`, `çünki`) to improve search accuracy.
- **Semantic Search**: Performs fuzzy matching with `string-similarity` over a knowledge base, considering categories, tags, and text.
- **AI Model Integration**: Supports Google Gemini, OpenRouterAI, DeepSeek, and KimiAI for advanced query processing (requires API keys).
- **Custom Turkmen Data**: Includes dictionaries for suffixes, synonyms, names, conjunctions, greetings, and farewells.
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

3. **Set up environment variables**:

   Create a `.env` file in the project root and add API keys for the AI models you plan to use:

   ```env
   GEMINI_API_KEY=your-gemini-api-key-here
   OPENROUTER_API_KEY=your-openrouter-api-key-here
   ```

4. **Prepare the knowledge base**:

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

Next, choose an AI model for search (or none):

```
AI search ulanjakmy?
1) Gemini AI - 1
2) Open Router AI - 2
3) DeepSeek AI - 3
4) KIMI K2 AI - 4
n) YOK - n
Sayla (1-4/n): n
```

If you select `n`, the pipeline uses local semantic search. Otherwise, the chosen AI model processes the query. The output includes:

- **Tokens**: Split words from the input.
- **Lemmatized Words**: Root forms of words.
- **Synonyms**: Mapped synonymous words.
- **Stopwords**: Filtered conjunctions.
- **Search Result**: Best matching knowledge base entry (if found).
- **Answer**: Formatted response with a random greeting and farewell.

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

   - **Output**: Maps `maşyn` to `["maşyn", "awto", "awtomobil"]`, processes with AI model (if selected) or local search.

4. **Query**: `Eýer kitaby nädip satyn alsam?`

   - **Output**: Filters `eýer`, maps `kitaby` to `kitap`, and searches for relevant entries.

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

3. **AI model saýlaň**:

   Soragdan soň, programma AI ulanmak isleýändigiňizi sorar:

   ```
   AI search ulanjakmy?
   1) Gemini AI - 1
   2) Open Router AI - 2
   3) DeepSeek AI - 3
   4) KIMI K2 AI - 4
   n) YOK - n
   Sayla (1-4/n): n
   ```

   - `1-4`: Seçilen AI model (Gemini, OpenRouterAI, DeepSeek, ýa-da KimiAI) soragy prosessirleyär.
   - `n`: Ýerli bilim bazasynda semantik gözleg ulanylýar.

4. **Netijeleri göruň**:

   Programma aşakdaky maglumatlary çykarar:

   - **Tokenlar**: Soragyň sözleri bölünýär (mysal üçin, `["VPN-de", "WS", "nädip"]`).
   - **Lemmalar**: Sözleriň kökleri tapylýar (mysal üçin, `bilerin` → `bil`).
   - **Sinonimler**: Synonim sözler tapylýar (mysal üçin, `maşyn` → `awto`).
   - **Stopwordlar**: Gerek däl sözler aýrylýar (mysal üçin, `nädip`, `eýer`).
   - **Bilim bazasy netijesi**: Soraga iň ýakyn maglumat tapylýar.
   - **Jogap**: Tötän salam we hoşlaşyk bilen formatlanan jogap.

**Mysallar**:

- **Sorag**: `VPN-de WS barada maglumat`
  - **Netije**: WS bilen baglanyşykly bilim bazasyndaky maglumat we `https://vpn.ws.com/docs` sahypasyna salgylanma.
- **Sorag**: `Salam, kitaby nädip satyn alyp bilerin?`
  - **Netije**: `kitaby` → `kitap`, `eýer` aýrylýar, sinonimler tapylýar, degişli maglumat ýa-da AI netijesi.
- **Sorag**: `xHTTP näme?`
  - **Netije**: xHTTP bilen baglanyşykly bilim bazasyndaky maglumat we `https://vpn.xhttp.com/docs` sahypasyna salgylanma.

**Üns beriň**:

- Bilim bazasy faýly (`knowledge.json`) dogry ýerde bolmaly.
- AI ulanmak üçin `.env` faýlynda `GEMINI_API_KEY` ýa-da `OPENROUTER_API_KEY` bolmaly.

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

5. **Semantic Search**:

   - Uses `string-similarity` to compare tokens against knowledge base entries (`knowledge.json`).
   - Scores entries based on category (20%), tags (30%), and text similarity (50%).
   - Returns the highest-scoring entry above a 0.1 threshold.

6. **AI Model Integration**:

   - If selected, sends the query to the chosen AI model (Gemini, OpenRouterAI, DeepSeek, or KimiAI).
   - Requires valid API keys in `.env`.

7. **Response Formatting**:
   - Wraps the result with a random greeting and farewell (from `greetings` and `farewells` in `syntax.ts`).
   - Example: `Salam! [search result] Hoş sag bol!`

---

## Data

The project uses custom data in `src/data/syntax.ts`:

- **Suffixes**: Turkmen suffixes for lemmatization (e.g., `yňyz`, `lar`, `da`).
- **Synonyms**: Word groups (e.g., `["maşyn", "awto", "awtomobil"]`).
- **Names**: Proper nouns to exclude from lemmatization (e.g., `Merdan`, `Serdar`).
- **Conjunctions**: Stopwords (e.g., `we`, `çünki`, `şonda`).
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
 │   └─ runner.ts      # CLI runner for user input
 ├─ lib/
 │   ├─ tokenizer.ts   # Main NLP pipeline
 │   ├─ lemmatizer.ts  # Word root extraction
 │   ├─ synonym.ts     # Synonym mapping
 │   ├─ stopwords.ts   # Stopword filtering
 │   ├─ search.ts      # Semantic search
 │   └─ answer.ts      # Response formatting
 ├─ services/
 │   ├─ gemAI.ts       # Google Gemini API integration
 │   └─ openRouter.ts  # OpenRouterAI, DeepSeek, KimiAI integrations
 ├─ data/
 │   └─ syntax.ts      # Suffixes, synonyms, names, conjunctions
 └─ knowledge.json     # Knowledge base entries
```

---

## Troubleshooting

- **Error: "Cannot find knowledge.json"**:
  - Ensure the file exists at `D:\Shit\TS AI\data\knowledge.json` or update the path in `src/lib/search.ts`.
- **Error: "GEMINI_API_KEY not found"**:
  - Add `GEMINI_API_KEY` to the `.env` file.
- **Error: "OPENROUTER_API_KEY not found"**:
  - Add `OPENROUTER_API_KEY` to the `.env` file.
- **No search results**:
  - Check that the knowledge base contains relevant entries.
  - Try broader or simpler queries (e.g., `WS` instead of `VPN-de WS nädip`).
- **AI model fails**:
  - Verify API keys and internet connectivity.
  - Ensure the selected model is supported (`gemini-1.5-flash`, `meta-llama/llama-3-8b-instruct`, etc.).

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

### Changes Made

1. **Updated Features**: Added support for OpenRouterAI, DeepSeek, and KimiAI models.
2. **Improved Usage Section**: Clarified the CLI flow and AI model selection process.
3. **Enhanced Turkmen User Guide**: Added more examples and clearer instructions.
4. **Added Troubleshooting Section**: Included common errors and solutions.
5. **Streamlined Structure**: Organized the project structure section and updated file paths.
6. **Clarified AI Integration**: Explained the four AI model options and their requirements.
7. **Maintained Original Content**: Kept the core functionality, data, and examples intact while improving readability.

Let me know if you need further refinements, additional sections, or specific changes to the README or code!
