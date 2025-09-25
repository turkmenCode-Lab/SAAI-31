const physicsKeywords = {
    velocity: "Tizlik",
    acceleration: "Tizlenme",
    force: "Güýç",
    mass: "Massa",
    energy: "Energiýa",
    power: "Güýç",
    pressure: "Basyş",
    temperature: "Temperatura",
    heat: "Ýylylyk",
    work: "Iş",
    momentum: "Impuls",
    frequency: "Ýygylyk",
    wavelength: "Tolkun uzynlygy",
    amplitude: "Amplituda",
    electric_field: "Elektrik meýdany",
    magnetic_field: "Magnit meýdany",
    current: "Tok",
    voltage: "Naprýaženie",
    resistance: "Garşylyk",
    capacitance: "Sygymlylyk",
    inductance: "Induktiwlik",
    gravity: "Agyrlyk güýji",
    friction: "Sürtülme",
    torque: "Moment",
    angular_velocity: "Burç tizligi",
    kinetic_energy: "Kinetik energiýa",
    potential_energy: "Potensial energiýa",
    entropy: "Entropiýa",
    enthalpy: "Entalpiýa",
    density: "Dykyzlyk",
    specific_heat: "Aýratyn ýylylyk",
    thermal_conductivity: "Ýylylyk geçirijilik",
    refractive_index: "Döwme indeksi",
    speed_of_light: "Ýagtylygyň tizligi",
    planck_constant: "Plank konstanta",
    boltzmann_constant: "Bolsman konstanta",
    avogadro_number: "Awogadro sany",
    gas_constant: "Gaz konstanta",
    unknown: "Bellik ýok"
} as const;

const physicsFormulas = {
    // Mechanics
    "F = ma": "Güýç = massa × tizlenme",
    "v = u + at": "Tizlik = başlangyç tizlik + tizlenme × wagt",
    "s = ut + (1/2)at²": "Aralyk = başlangyç tizlik × wagt + (1/2) × tizlenme × wagt²",
    "v² = u² + 2as": "Tizlik² = başlangyç tizlik² + 2 × tizlenme × aralyk",
    "p = mv": "Impuls = massa × tizlik",
    "KE = (1/2)mv²": "Kinetik energiýa = (1/2) × massa × tizlik²",
    "PE = mgh": "Potensial energiýa = massa × agyrlyk × beýiklik",
    "W = Fd": "Iş = güýç × aralyk",
    "P = W/t": "Güýç = iş / wagt",
    
    // Thermodynamics
    "PV = nRT": "Basyş × göwrüm = mol sany × gaz konstanta × temperatura",
    "Q = mcΔT": "Ýylylyk = massa × aýratyn ýylylyk × temperatura üýtgemesi",
    
    // Electricity
    "V = IR": "Naprýaženie = tok × garşylyk",
    "P = VI": "Güýç = naprýaženie × tok",
    "E = Pt": "Energiýa = güýç × wagt",
    
    // Waves
    "v = fλ": "Tizlik = ýygylyk × tolkun uzynlygy",
    "f = 1/T": "Ýygylyk = 1 / period",
    
    // Modern Physics
    "E = mc²": "Energiýa = massa × ýagtylygyň tizligi²",
    "E = hf": "Energiýa = Plank konstanta × ýygylyk"
};

export { physicsKeywords, physicsFormulas };