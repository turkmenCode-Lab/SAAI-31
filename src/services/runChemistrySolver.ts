import OCL from "openchemlib";
import chemistryKeywords from "../assets/chemistry/operators";
import elements from "../assets/chemistry/elements";

interface ChemistryResult {
    success: boolean;
    formula?: string;
    keyword?: string;
    result?: number | string | Record<string, any>;
    rawInput: string;
    error?: string;
}

export default async function runChemistrySolver(prompt: string): Promise<ChemistryResult> {
    const lowerPrompt = prompt.toLowerCase().trim();

    try {
        for (const [formula, keywordTurkmen] of Object.entries(chemistryKeywords) as [string, string][]) {
            if (lowerPrompt.includes(keywordTurkmen.toLowerCase())) {

                if (formula === "molar_mass" || formula === "molecular_mass") {
                    const formulaMatch = prompt.match(/[A-Z][a-z]?\d*/g);
                    if (formulaMatch && formulaMatch.length > 0) {
                        const compoundStr = formulaMatch.join("");
                        const molecule = OCL.Molecule.fromSmiles(compoundStr);
                        const molWeight = molecule.getMolecularFormula().absoluteWeight;
                        return {
                            success: true,
                            formula: compoundStr,
                            keyword: formula,
                            result: molWeight,
                            rawInput: prompt
                        };
                    } else {
                        for (const el of elements) {
                            if (
                                lowerPrompt.includes(el.turkmen.toLowerCase()) ||
                                lowerPrompt.includes(el.english.toLowerCase()) ||
                                lowerPrompt.includes(el.symbol.toLowerCase()) ||
                                lowerPrompt.includes(el.greek?.toLowerCase() ?? '') ||
                                lowerPrompt.includes(el.latin?.toLowerCase() ?? '')
                            ) {
                                const symbol = el.symbol;
                                const molecule = OCL.Molecule.fromSmiles(symbol);
                                const molWeight = molecule.getMolecularFormula().absoluteWeight;
                                return {
                                    success: true,
                                    formula: symbol,
                                    keyword: formula,
                                    result: molWeight,
                                    rawInput: prompt
                                };
                            }
                        }
                    }
                }

                if (["atomic_mass", "density", "melting_point", "boiling_point", "electronegativity", "electron_configuration"].includes(formula)) {
                    for (const el of elements) {
                        if (
                            lowerPrompt.includes(el.turkmen.toLowerCase()) ||
                            lowerPrompt.includes(el.english.toLowerCase()) ||
                            lowerPrompt.includes(el.symbol.toLowerCase()) ||
                            lowerPrompt.includes(el.greek?.toLowerCase() ?? '') ||
                            lowerPrompt.includes(el.latin?.toLowerCase() ?? '')
                        ) {
                            const atomicNumber = el.atomicNumber;
                            const data = OCL.PeriodicTable.getAtomicData(atomicNumber);

                            const result: Record<string, any> = {
                                atomicMass: data.atomicMass,
                                density: data.density,
                                meltingPoint: data.meltingPoint,
                                boilingPoint: data.boilingPoint,
                                electronegativity: data.electronegativity,
                                electronConfiguration: data.electronConfiguration
                            };

                            return {
                                success: true,
                                formula: data.symbol,
                                keyword: formula,
                                result,
                                rawInput: prompt
                            };
                        }
                    }
                }

                return {
                    success: true,
                    keyword: formula,
                    rawInput: prompt,
                    result: "Bu keyword üçin hasaplama ýa-da maglumat goldawy ýok"
                };
            }
        }

        return { success: false, rawInput: prompt, result: "Himiýa keyword tapylmady" };

    } catch (err: any) {
        return { success: false, rawInput: prompt, error: err.message };
    }
}