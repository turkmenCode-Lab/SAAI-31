import dotenv from "dotenv";

dotenv.config({ quiet: true });

import Runner from "./utils/runner";
import readlineSync from "readline-sync";

Runner(readlineSync.question(`Nadip komek edip bilern ? \nInput here: `));
