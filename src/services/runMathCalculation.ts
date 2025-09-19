import { create, all } from "mathjs";
import { mathOperatorsInTurkmen } from "../assets/syntax";

const math = create(all);

export default async function runMathCalculation(
  input: string
): Promise<string> {
  try {
    let expr = input.toLowerCase();

    for (const [tm, en] of Object.entries(mathOperatorsInTurkmen)) {
      const regex = new RegExp(`\\b${tm}\\b`, "g");
      expr = expr.replace(regex, en);
    }

    expr = expr.replace(
      /(sin|cos|tan|cot|sec|csc|asin|acos|atan|log|ln|exp|sqrt|cbrt)\s*(\d+)/g,
      "$1($2)"
    );

    expr = expr.replace(/(sin|cos|tan|cot|sec|csc)\(/g, "$1(");
    if (/(sin|cos|tan|cot|sec|csc)/.test(expr)) {
      expr = expr.replace(/(\d+)\)/g, "$1 deg)");
    }

    const result = math.evaluate(expr);
    return result.toString();
  } catch (error) {
    console.error("Math calculation error:", error);
    return "Hasaplamakda ýalňyşlyk: Math result not implemented or invalid input";
  }
}
