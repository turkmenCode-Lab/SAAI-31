const operators: string[] = [
    "+", "-", "*", "/", "%", "^", "=", ">", "<", ">=", "<=", "!", "&", "|", "~",
    "pi", "e", "ln", "log", "exp", "sin", "cos", "tan", "cot", "sec", "csc",
    "asin", "acos", "atan", "sqrt", "cbrt", "abs", "factorial", "gamma",
    "∫", "∂", "lim", "sum", "prod", "→", "←", "↔", "∀", "∃", "¬", "∧", "∨",
    "mod", "≈", "≠", "≡", "⋅", "×", "d/dx", "∇", "∆"
];

const mathOperatorsInTurkmen: Record<string, string> = {
    gosmak: "+",           // addition
    ayyrmak: "-",         // subtraction
    jemi: "+",            // sum
    köpeltmek: "*",       // multiplication
    hasyly: "*",          // product
    bolunji: "/",         // division
    bolmek: "/",          // division
    tapawut: "-",         // difference
    uly: ">",             // greater than
    kiçi: "<",            // less than
    "uly ýa deň": ">=",   // greater than or equal
    "kiçi ýa deň": "<=",  // less than or equal
    galan: "%",           // modulus
    üsti: "^",            // exponentiation (Algebrite uses ^)
    kwadrat: "^2",        // square
    kub: "^3",            // cube
    "kwadrat kök": "sqrt", // square root
    "kub kök": "cbrt",    // cube root
    faiz: "%",            // percentage
    ulylykda: "abs",      // absolute value
    faktor: "factorial",  // factorial
    sinus: "sin",         // sine
    kosinus: "cos",       // cosine
    tangens: "tan",       // tangent
    kotangens: "cot",     // cotangent
    sekant: "sec",        // secant
    kosekant: "csc",      // cosecant
    arksinus: "asin",     // arcsine
    arkkosinus: "acos",   // arccosine
    arktangens: "atan",   // arctangent
    logarifm: "log",      // logarithm (base 10)
    "natural log": "ln",  // natural logarithm
    eksponent: "exp",     // exponential
    türewi: "derivative", // derivative
    integral: "integral", // integral
    limit: "lim",         // limit
    summa: "sum",         // sum
    hasyl: "prod",        // product
    geometriýa: "geometry", // geometry (contextual, may not be evaluated)
    burç: "angle",        // angle (contextual)
    radius: "radius",     // radius (contextual)
    diametr: "diameter",  // diameter (contextual)
    perimetr: "perimeter", // perimeter (contextual)
    ýüz: "area",          // area (contextual)
    göwrüm: "volume",     // volume (contextual)
    matris: "matrix",     // matrix (Algebrite supports matrices)
    wektor: "vector",     // vector (contextual)
    faktorlaşdyrmak: "factor", // factor polynomial
    polinom: "polynomial", // polynomial (contextual)
    "kwadratik deňleme": "solve", // solve quadratic equation
    gamma: "gamma",       // gamma function
    faktorial: "factorial", // factorial
    kombinasiýa: "combinations", // combinations (not directly supported)
    permutasiýa: "permutations", // permutations (not directly supported)
    binomial: "binomial", // binomial (contextual)
};

export { operators, mathOperatorsInTurkmen}