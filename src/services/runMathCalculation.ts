import Algebrite from "algebrite";
import { mathOperatorsInTurkmen } from "../assets/math/operators";

export default async function runMathCalculation(input: string): Promise<string> {
    try {
        let expr = input.toLowerCase().trim();

        expr = expr.replace(/[=?]/g, "");

        for (const [tm, en] of Object.entries(mathOperatorsInTurkmen)) {
            if (tm === "kub") {
                const regex = new RegExp(`\\b(\\d+)\\s+${tm}\\b`, "g");
                expr = expr.replace(regex, "$1 ^ 3");
            } else {
                const regex = new RegExp(`\\b${tm}\\b`, "g");
                expr = expr.replace(regex, en);
            }
        }

        expr = expr.replace(
            /(sin|cos|tan|cot|sec|csc|asin|acos|atan|log|ln|exp|sqrt|cbrt)\s*(\d+)/g,
            "$1($2)"
        );

        if (/(sin|cos|tan|cot|sec|csc)/.test(expr)) {
            expr = expr.replace(/(\d+)\)/g, "($1 * pi / 180)");
        }

        const unsupportedOps = [
            "mean", "median", "max", "min", "std", "variance", "combinations", "permutations",
            "isPrime", "divisible", "mode", "frequency", "probability"
        ];
        if (unsupportedOps.some(op => expr.includes(op))) {
            throw new Error("Operation not supported in Algebrite");
        }

        if (!expr.match(/[\d+\-*/%^()]+/) && !/(sin|cos|tan|cot|sec|csc|asin|acos|atan|log|ln|exp|sqrt|cbrt|pi)/.test(expr)) {
            throw new Error("Invalid mathematical expression");
        }

        let result = Algebrite.run(expr);

        result = Algebrite.simplify(result).toString();

        const numericalResult = Algebrite.float(result).toString();
        if (numericalResult !== "0" && !isNaN(parseFloat(numericalResult))) {
            result = parseFloat(numericalResult).toString();
        }

        return result;
    } catch (error) {
        console.error("Math calculation error:", error);
        return "Hasaplamakda ýalňyşlyk: Invalid input or calculation not supported";
    }
}