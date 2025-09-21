Thank you for sharing the existing README and the context of the changes from Beta MA-1 to MA-2. Based on your request, it seems you want to update the README to reflect the recent changes made to the `Runner` and `Tokenizer` functions, specifically the addition of the `thinking` message being displayed in both dev and production modes. Below, I’ll update the README to incorporate these changes while preserving the existing structure and content, ensuring the updates are clear and consistent with the project’s evolution to Beta MA-3.

### Updated README

```markdown
# Powered by: @merdanusa

---

## Turkmen Code Lab - SAAI-31

---

# Version: Beta MA-3

# Turkmen NLP Tokenizer & Semantic Search

**A Turkmen language text processing library that tokenizes input, lemmatizes words, identifies synonyms, removes stopwords, performs semantic search over a knowledge base, detects math intents, solves mathematical expressions, and provides thinking messages for user feedback.**

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
- [Changes Made](#changes-made-from-beta-ma-2-to-ma-3)

---

## About

This project is a **Natural Language Processing (NLP)** pipeline tailored for the **Turkmen language**. It processes Turkmen text through tokenization, lemmatization, synonym detection, stopword removal, semantic search over a knowledge base, math intent detection with calculation, and provides thinking messages to enhance user interaction. Built with **TypeScript**, **Node.js**, and libraries like [`natural`](https://www.npmjs.com/package/natural), [`string-similarity`](https://www.npmjs.com/package/string-similarity), and [`mathjs`](https://www.npmjs.com/package/mathjs), it includes custom dictionaries for Turkmen suffixes, synonyms, names, conjunctions, and math operators.

This library is ideal for applications requiring text analysis, search, math calculations, or chatbot-like interactions in Turkmen.

---

## Features

- **Tokenizer**: Splits Turkmen text into words using `natural.WordTokenizer`.
- **Lemmatizer**: Extracts word roots by removing common Turkmen suffixes (e.g., `yňyz`, `lar`, `da`).
- **Synonym Controller**: Maps words to synonym groups for richer text understanding.
- **Stopword Filter**: Removes common conjunctions (e.g., `we`, `ýa`, `çünki`) to improve search accuracy.
- **Semantic Search**: Performs fuzzy matching with `string-similarity` over a knowledge base, considering categories, tags, and text.
- **Math Intent Detection & Calculation**: Detects math-related queries (e.g., operators like `gosmak` for `+`) and evaluates expressions using `mathjs`, supporting arithmetic, trigonometry, algebra, and more advanced functions.
- **Thinking Messages**: Provides random thinking messages (e.g., "Let me crunch the numbers..." or "Searching for the latest updates...") to inform users of processing steps in both dev and production modes.
- **Custom Turkmen Data**: Includes dictionaries for suffixes, synonyms, names, conjunctions, greetings, farewells, and math operators.
- **Interactive CLI**: Processes user queries with random greetings, farewells, and thinking messages for a friendly experience.

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

If math is detected, it computes the result directly. Otherwise, it proceeds to local semantic search. The output includes:

- **Tokens**: Split words from the input.
- **Lemmatized Words**: Root forms of words.
- **Synonyms**: Mapped synonymous words.
- **Stopwords**: Filtered conjunctions.
- **Thinking Message**: A random message indicating processing (e.g., "Let me crunch the numbers..." for math or "Searching for the latest updates..." for search).
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

    - **Output**:
      ```
      Prompt: VPN-de WS nädip ulanyp bilerin?
      Thinking: Searching for the latest updates...
      [Random greeting]
      Tokenizes to ["VPN-de", "WS", "nädip", "ulanyp", "bilerin"], lemmatizes (e.g., `bilerin` → `bil`), finds synonyms, removes `nädip`, matches WS entry with link to https://vpn.ws.com/docs
      [Random farewell]
      ```

2. **Query**: `SSH hyzmaty barada maglumat beriň`

    - **Output**:
      ```
      Prompt: SSH hyzmaty barada maglumat beriň
      Thinking: Searching for the latest updates...
      [Random greeting]
      Matches SSH entry with link to https://vpn.ssh.com/docs
      [Random farewell]
      ```

3. **Query**: `Salam, maşyn satyn almak isleýärin`

    - **Output**:
      ```
      Prompt: Salam, maşyn satyn almak isleýärin
      Thinking: Searching for the latest updates...
      [Random greeting]
      Maps `maşyn` to ["maşyn", "awto", "awtomobil"], processes with local search
      [Random farewell]
      ```

4. **Query**: `Eýer kitaby nädip satyn alsam?`

    - **Output**:
      ```
      Prompt: Eýer kitaby nädip satyn alsam?
      Thinking: Searching for the latest updates...
      [Random greeting]
      Filters `eýer`, maps `kitaby` to `kitap`, searches for relevant entries
      [Random farewell]
      ```

5. **Math Query**: `10 gosmak 10`

    - **Output**:
      ```
      Prompt: 10 gosmak 10
      Thinking: Let me crunch the numbers for you...
      10 + 10 = 20
      ```

6. **Advanced Math Query**: `sinus 30 gosmak kwadrat kök 9`

    - **Output**:
      ```
      Prompt: sinus 30 gosmak kwadrat kök 9
      Thinking: Let me crunch the numbers for you...
      sin(30 deg) + sqrt(9) = 0.5 + 3 = 3.5
      ```

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

   Eger sorag matematika bilen baglanyşykly bolsa (mysal üçin, `gosmak`, `ayyrmak`), programma awtomatiki hasaplaýar we degişli pikir ýazgysyny görkezýär (mysal üçin, "Sanlary hasaplaýaryn..."). Başga ýagdaýda ýerli bilim bazasynda semantik gözleg ulanylýar we gözleg pikir ýazgysy görkezilýär (mysal üçin, "Iň täze maglumatlary gözleýärin...").

4. **Netijeleri göruň**:

   Programma aşakdaky maglumatlary çykarar:

    - **Tokenlar**: Soragyň sözleri bölünýär (mysal üçin, `["VPN-de", "WS", "nädip"]`).
    - **Lemmalar**: Sözleriň kökleri tapylýar (mysal üçin, `bilerin` → `bil`).
    - **Sinonimler**: Synonim sözler tapylýar (mysal üçin, `maşyn` → `awto`).
    - **Stopwordlar**: Gerek däl sözler aýrylýar (mysal üçin, `nädip`, `eýer`).
    - **Pikir ýazgysy**: Soragy prosessirlemek barada tötän ýazgy (mysal üçin, "Sanlary hasaplaýaryn..." ýa-da "Iň täze maglumatlary gözleýärin...").
    - **Bilim bazasy netijesi**: Soraga iň ýakyn maglumat tapylýar.
    - **Jogap**: Tötän salam we hoşlaşyk bilen formatlanan jogap, ýa-da matematika netijesi.

**Mysallar**:

- **Sorag**: `VPN-de WS barada maglumat`
    - **Netije**:
      ```
      Prompt: VPN-de WS barada maglumat
      Thinking: Iň täze maglumatlary gözleýärin...
      [Tötän salam]
      WS bilen baglanyşykly bilim bazasyndaky maglumat we https://vpn.ws.com/docs sahypasyna salgylanma
      [Tötän hoşlaşyk]
      ```
- **Sorag**: `Salam, kitaby nädip satyn alyp bilerin?`
    - **Netije**:
      ```
      Prompt: Salam, kitaby nädip satyn alyp bilerin?
      Thinking: Iň täze maglumatlary gözleýärin...
      [Tötän salam]
      `kitaby` → `kitap`, `eýer` aýrylýar, sinonimler tapylýar, degişli maglumat
      [Tötän hoşlaşyk]
      ```
- **Sorag**: `xHTTP näme?`
    - **Netije**:
      ```
      Prompt: xHTTP näme?
      Thinking: Iň täze maglumatlary gözleýärin...
      [Tötän salam]
      xHTTP bilen baglanyşykly bilim bazasyndaky maglumat we https://vpn.xhttp.com/docs sahypasyna salgylanma
      [Tötän hoşlaşyk]
      ```
- **Matematika Sorag**: `10 gosmak 5 ayyrmak 2`
    - **Netije**:
      ```
      Prompt: 10 gosmak 5 ayyrmak 2
      Thinking: Sanlary hasaplaýaryn...
      10 + 5 - 2 = 13
      ```
- **Çylşyrymly Matematika**: `kub 3 gosmak sinus 90`
    - **Netije**:
      ```
      Prompt: kub 3 gosmak sinus 90
      Thinking: Sanlary hasaplaýaryn...
      3**3 + sin(90 deg) = 27 + 1 = 28
      ```

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
    - If detected, translates to standard math expressions, evaluates with `mathjs`, and generates a math-specific thinking message.
    - Example: `10 gosmak 10` → `10 + 10` → `20`, with "Let me crunch the numbers...".

6. **Semantic Search**:

    - Uses `string-similarity` to compare tokens against knowledge base entries (`knowledge.json`).
    - Scores entries based on category (20%), tags (30%), and text similarity (50%).
    - Returns the highest-scoring entry above a 0.1 threshold, with a search-specific thinking message.
    - Example: "Searching for the latest updates...".

7. **Thinking Messages**:

    - Generates random thinking messages from `mathThinkings` or `searchThinkings` in `syntax.ts`, displayed in both dev and production modes.
    - Example: Math query → "Let me crunch the numbers for you..."; Search query → "Searching for the latest updates...".

8. **Response Formatting**:

    - Wraps the result with a random greeting and farewell (from `greetings` and `farewells` in `syntax.ts`) in production mode.
    - Example: `Salam! [search result] Hoş sag bol!` or direct math output with thinking message.

---

## Data

The project uses custom data in `src/data/syntax.ts`:

- **Suffixes**: Turkmen suffixes for lemmatization (e.g., `yňyz`, `lar`, `da`).
- **Synonyms**: Word groups (e.g., `["maşyn", "awto", "awtomobil"]`).
- **Names**: Proper nouns to exclude from lemmatization (e.g., `Merdan`, `Serdar`).
- **Conjunctions**: Stopwords (e.g., `we`, `çünki`, `şonda`).
- **Math Operators**: English operators (e.g., `+`, `sin`) and Turkmen mappings (e.g., `gosmak` → `+`, `sinus` → `sin`).
- **Greetings/Farewells**: Lists for response formatting.
- **Thinking Messages**: Lists of `mathThinkings` (e.g., "Let me crunch the numbers...") and `searchThinkings` (e.g., "Searching for the latest updates...") for user feedback.

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
 │   ├─ runner.ts      # CLI runner for user input with dev/prod modes
 │   ├─ isMath.ts      # Math intent detection
 │   └─ mathIntentDetector.ts  # Math mode activation
 ├─ lib/
 │   ├─ tokenizer.ts   # Main NLP pipeline with thinking messages
 │   ├─ lemmatizer.ts  # Word root extraction
 │   ├─ synonym.ts     # Synonym mapping
 │   ├─ stopwords.ts   # Stopword filtering
 │   ├─ search.ts      # Semantic search
 │   └─ answer.ts      # Response formatting
 ├─ services/
 │   ├─ thinker.ts     # Processes math or search with thinking messages
 │   └─ runMathCalculation.ts  # Math expression evaluation
 ├─ data/
 │   └─ syntax.ts      # Suffixes, synonyms, names, conjunctions, math operators, thinking messages
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
- **Thinking Message Not Displayed**:
    - Verify that `thinker.ts` returns a non-empty `thinking` string.
    - Ensure `runner.ts` includes `thinking` in production mode output.

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

## Changes Made (from Beta MA-2 to MA-3)

1. **Added Thinking Messages in Production Mode**:
    - Updated `runner.ts` to display the `thinking` message (e.g., "Let me crunch the numbers..." or "Searching for the latest updates...") in production mode, matching the dev mode behavior.
    - Ensures users receive feedback on processing steps for both math and search queries in all modes.

2. **Enhanced Tokenizer Output**:
    - Modified `tokenizer.ts` to include the `thinking` string in its return object, propagated from `thinker.ts`.

3. **Updated Features & How It Works**:
    - Added details about thinking messages in the Features and How It Works sections.
    - Clarified that thinking messages are displayed in both dev and production modes.

4. **Enhanced Example Queries**:
    - Updated example outputs to include thinking messages in both dev and production modes.

5. **Turkmen Language User Guide**:
    - Added references to thinking messages (e.g., "Sanlary hasaplaýaryn..." for math, "Iň täze maglumatlary gözleýärin..." for search) in the Turkmen guide.

6. **Data Updates**:
    - Added `mathThinkings` and `searchThinkings` to the data description in `syntax.ts`.

7. **Project Structure**:
    - Updated to reflect the role of `thinker.ts` in generating thinking messages.

8. **Troubleshooting**:
    - Added a troubleshooting item for missing thinking messages.

9. **Version Bump**:
    - Updated to Beta MA-3.

10. **Maintained Core Content**:
    - Preserved core NLP functionality, math processing, and local search while improving user feedback with thinking messages.

```

### Key Updates in Beta MA-3
1. **Version Bump**: Updated the version to Beta MA-3 to reflect the new changes.
2. **Thinking Messages**:
   - Added to the **Features** section to highlight their role in user feedback.
   - Included in the **How It Works** section with details on how they’re generated from `mathThinkings` and `searchThinkings` in `syntax.ts`.
   - Updated **Example Queries** to show thinking messages in output examples.
   - Added to the **Turkmen Language User Guide** with Turkmen translations of thinking messages.
3. **Data Section**:
   - Added `mathThinkings` and `searchThinkings` to the description of `syntax.ts`.
4. **Project Structure**:
   - Clarified the role of `thinker.ts` in processing math or search queries and generating thinking messages.
5. **Troubleshooting**:
   - Added a new item to address potential issues with missing thinking messages.
6. **Changes Made Section**:
   - Created a new section to document changes from Beta MA-2 to MA-3, focusing on the addition of thinking messages in production mode and related updates.
7. **Example Outputs**:
   - Modified to include thinking messages in production mode outputs, ensuring consistency with the updated `Runner` function.
8. **Maintained Core Content**:
   - Kept all existing functionality (tokenization, lemmatization, synonym detection, stopword removal, semantic search, math calculations) intact.
   - Preserved the structure and style of the README for consistency.

### Notes
- **Assumptions**:
  - I assumed you wanted to keep the existing README structure and content, only adding updates related to the `thinking` message feature and incrementing the version to MA-3.
  - The thinking messages are assumed to be stored in `mathThinkings` and `searchThinkings` arrays in `syntax.ts`, as referenced in the `thinker` function.
- **Turkmen Translations**:
  - Added Turkmen translations for thinking messages (e.g., "Sanlary hasaplaýaryn..." for math, "Iň täze maglumatlary gözleýärin..." for search) in the **Turkmen Language User Guide** to align with the project’s focus on Turkmen NLP.
- **Consistency**:
  - Ensured that the README reflects the code changes in `runner.ts` and `tokenizer.ts` from your previous questions.
  - Maintained the same level of detail and formatting as the original README.
- **Future Improvements**:
  - If you plan to add more features (e.g., new thinking messages, additional modes, or enhanced search), let me know, and I can suggest further README updates.
  - If you want to include specific examples of `mathThinkings` or `searchThinkings` from `syntax.ts`, provide them, and I can add them to the README.

If you need further tweaks, additional sections, or specific examples (e.g., actual thinking messages from `syntax.ts`), please let me know, and I’ll refine the README accordingly!