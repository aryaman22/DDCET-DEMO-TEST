import { useState, useEffect, useCallback, useRef } from 'react';

// ─── DEFAULT QUESTION BANK (100 questions: 50 Science + 30 Math + 20 English) ─
const DEFAULT_QUESTIONS = [
  // SECTION 1 – Science & Engineering (50 questions)
  {
    id: 1,
    section: 'Science',
    text: 'CaCO₃(s) → CaO(s) + CO₂(g). Which kind of reaction is this?',
    options: [
      'Displacement reaction',
      'Oxidation reaction',
      'Thermal decomposition reaction',
      'Precipitation reaction',
    ],
    answer: 2,
  },
  {
    id: 2,
    section: 'Science',
    text: 'What is the formula of lead sulphate?',
    options: ['Pb₂SO₄', 'Pb(SO₄)₂', 'PbSO₄', 'Pb₂(SO₄)₃'],
    answer: 2,
  },
  {
    id: 3,
    section: 'Science',
    text: 'Which is the balanced equation of Al + HCl → AlCl₃ + H₂?',
    options: [
      'Al + 2HCl → AlCl₂ + H₂',
      '2Al + 6HCl → 2AlCl₃ + 3H₂',
      '3Al + 2HCl → 2AlCl₂ + 3H₂',
      '4Al + 3HCl → AlCl₃ + 3H₂',
    ],
    answer: 1,
  },
  {
    id: 4,
    section: 'Science',
    text: 'Main product of NaOH reacting with zinc metal?',
    options: ['NaZnO₂', 'NaZn₂O', 'Na₂ZnO₂', 'Zn(OH)₂'],
    answer: 2,
  },
  {
    id: 5,
    section: 'Science',
    text: 'Which type of oxide is called basic oxide?',
    options: [
      'Non-metallic oxide',
      'Metallic oxide',
      'Both A and B',
      'Inactive oxide',
    ],
    answer: 1,
  },
  {
    id: 6,
    section: 'Science',
    text: 'Which compound is known as milk of magnesia?',
    options: ['Mn(OH)₂', 'Mg(OH)₂', 'MgO', 'Mg(OH)'],
    answer: 1,
  },
  {
    id: 7,
    section: 'Science',
    text: 'Chemical formula of bleaching powder is:',
    options: ['Ca(OH)₂', 'CaOCl₂', 'Ca₂OCl', 'CaCO₃·2H₂O'],
    answer: 1,
  },
  {
    id: 8,
    section: 'Science',
    text: 'Which is the lustrous non-metal?',
    options: ['Iodine', 'Carbon', 'Nitrogen', 'Bromine'],
    answer: 0,
  },
  {
    id: 9,
    section: 'Science',
    text: 'Which metal neither reacts with cold/hot water but reacts with steam?',
    options: ['Aluminium', 'Iron', 'Zinc', 'All of the above'],
    answer: 3,
  },
  {
    id: 10,
    section: 'Science',
    text: 'Correct order of reactivity of metals:',
    options: [
      'Mg > Al > Zn > Fe',
      'Mg > Fe > Zn > Al',
      'Fe > Zn > Al > Mg',
      'Mg > Al > Fe > Zn',
    ],
    answer: 0,
  },
  {
    id: 11,
    section: 'Science',
    text: 'The smallest unit of data in a computer:',
    options: ['Byte', 'Bit', 'Nibble', 'GB'],
    answer: 1,
  },
  {
    id: 12,
    section: 'Science',
    text: 'Ctrl+Home in MS-Word moves cursor to:',
    options: [
      'End of document',
      'Beginning of line',
      'Beginning of paragraph',
      'Beginning of document',
    ],
    answer: 3,
  },
  {
    id: 13,
    section: 'Science',
    text: 'Which is a relative link in HTML?',
    options: [
      'href="http://www.blog.com"',
      'href="../index.html"',
      'href="http://index.html"',
      'All of the above',
    ],
    answer: 1,
  },
  {
    id: 14,
    section: 'Science',
    text: 'Correct MS-Excel formula for total of A2,B2,C2,D2:',
    options: [
      '=SUM(A2:D2)',
      '=SUM(A2,B2,C2,D2)',
      'Both A and B',
      'None of the above',
    ],
    answer: 2,
  },
  {
    id: 15,
    section: 'Science',
    text: 'Which is NOT a valid View menu option in MS-PowerPoint?',
    options: ['Tree view', 'Outline view', 'Notes page', 'Reading view'],
    answer: 0,
  },
  {
    id: 16,
    section: 'Science',
    text: 'Green plants that make their own food are known as:',
    options: ['Heterotrophs', 'Autotrophs', 'Saprotrophs', 'Omnivores'],
    answer: 1,
  },
  {
    id: 17,
    section: 'Science',
    text: 'Bag filters are used to:',
    options: [
      'Reduce noise pollution',
      'Reduce sludge from waste water',
      'Remove particulate matter from gas stream',
      'Reduce soil pollution',
    ],
    answer: 2,
  },
  {
    id: 18,
    section: 'Science',
    text: 'Energy produced using heat trapped inside earth is:',
    options: [
      'Geo-Thermal energy',
      'Hydrothermal energy',
      'Solar energy',
      'Wave energy',
    ],
    answer: 0,
  },
  {
    id: 19,
    section: 'Science',
    text: 'Device that converts solar energy directly into electricity:',
    options: ['Fuel cell', 'Hydrogen cell', 'Solar array', 'Photovoltaic cell'],
    answer: 3,
  },
  {
    id: 20,
    section: 'Science',
    text: 'Paris Agreement aims to keep global temperature rise below ___ above pre-industrial levels.',
    options: ['1.0°C', '1.5°C', '2.0°C', '2.5°C'],
    answer: 2,
  },
  {
    id: 21,
    section: 'Science',
    text: 'Number of significant digits in 2025 is:',
    options: ['3', '4', '2', '5'],
    answer: 1,
  },
  {
    id: 22,
    section: 'Science',
    text: 'Zero error is an example of _____ error.',
    options: ['Systematic', 'Random', 'Maximum', 'Minimum'],
    answer: 0,
  },
  {
    id: 23,
    section: 'Science',
    text: '1 joule = _____ erg.',
    options: ['10³', '10⁵', '10⁷', '10⁹'],
    answer: 2,
  },
  {
    id: 24,
    section: 'Science',
    text: 'Density of water in CGS system is:',
    options: ['1000', '100', '10', '1'],
    answer: 3,
  },
  {
    id: 25,
    section: 'Science',
    text: '% error in mass=0.3%, radius=0.5%. % error in density of sphere:',
    options: ['1.8%', '1.5%', '1.2%', '1.1%'],
    answer: 0,
  },
  {
    id: 26,
    section: 'Science',
    text: 'Pitch of micrometer=1mm, 100 divisions on circular scale. Least count:',
    options: ['1 mm', '0.1 mm', '0.01 mm', '0.001 mm'],
    answer: 3,
  },
  {
    id: 27,
    section: 'Science',
    text: 'SI Unit of linear momentum:',
    options: ['Kg s/m', 'Kg m/s', 'm s/Kg', 'Kg s m'],
    answer: 1,
  },
  {
    id: 28,
    section: 'Science',
    text: 'Centripetal force always acts:',
    options: [
      'Away from centre',
      'In tangential direction',
      'Perpendicular to motion',
      'Towards centre',
    ],
    answer: 3,
  },
  {
    id: 29,
    section: 'Science',
    text: 'When external force on a body is zero, its acceleration:',
    options: ['Increases', 'Decreases', 'Equals zero', 'Remains constant'],
    answer: 2,
  },
  {
    id: 30,
    section: 'Science',
    text: 'Angular velocity of body moving at speed v in circle of radius r:',
    options: ['v/r', 'vr', 'vr²', 'vr³'],
    answer: 0,
  },
  {
    id: 31,
    section: 'Science',
    text: 'Body: mass 10 kg, acceleration 9.8 m/s². Force produced:',
    options: ['9.8 N', '98 N', '0.98 N', '980 N'],
    answer: 1,
  },
  {
    id: 32,
    section: 'Science',
    text: '50 kg object, radius 2 m, speed 60 m/s. Centripetal acceleration:',
    options: ['6000 m/s²', '3000 m/s²', '1800 m/s²', '1500 m/s²'],
    answer: 2,
  },
  {
    id: 33,
    section: 'Science',
    text: 'SI Unit of electric flux:',
    options: ['C²/Nm', 'Nm/C', 'Nm/C²', 'Nm²/C'],
    answer: 3,
  },
  {
    id: 34,
    section: 'Science',
    text: 'Electric field lines are:',
    options: ['Imaginary', 'Real', 'Ideal', 'None of the above'],
    answer: 0,
  },
  {
    id: 35,
    section: 'Science',
    text: 'Number of electrons in 1 coulomb charge:',
    options: ['6.25×10¹⁷', '6.25×10¹⁸', '6.25×10¹⁹', '6.25×10²⁰'],
    answer: 1,
  },
  {
    id: 36,
    section: 'Science',
    text: 'When dielectric placed between capacitor plates, capacitance:',
    options: ['Increases', 'Decreases', 'Remains constant', 'Becomes zero'],
    answer: 0,
  },
  {
    id: 37,
    section: 'Science',
    text: 'If distance between two charges is doubled, electric force becomes:',
    options: ['Half', 'Double', 'One fourth', 'Four times'],
    answer: 2,
  },
  {
    id: 38,
    section: 'Science',
    text: 'Effective resistance of 5Ω, 10Ω, 15Ω in series:',
    options: ['10 Ω', '30 Ω', '20 Ω', '5.5 Ω'],
    answer: 1,
  },
  {
    id: 39,
    section: 'Science',
    text: 'Heat capacity per unit mass is known as:',
    options: ['Specific heat', 'Relative heat', 'Cp', 'Cv'],
    answer: 0,
  },
  {
    id: 40,
    section: 'Science',
    text: '1 KCal = _____ J.',
    options: ['4.186', '4186', '41.86', '418.6'],
    answer: 1,
  },
  {
    id: 41,
    section: 'Science',
    text: 'Glass piece heated then cooled — crack forms. Most likely reason:',
    options: [
      'High melting point',
      'Large thermal conductivity',
      'Large specific heat',
      'Small thermal conductivity',
    ],
    answer: 3,
  },
  {
    id: 42,
    section: 'Science',
    text: 'When heat is given to boiling water, temperature:',
    options: ['Increases', 'Decreases', 'Remains constant', 'None of above'],
    answer: 2,
  },
  {
    id: 43,
    section: 'Science',
    text: '37°C = _____ °F.',
    options: ['98.6', '98.8', '97.6', '96.8'],
    answer: 0,
  },
  {
    id: 44,
    section: 'Science',
    text: 'SI Unit of coefficient of thermal conductivity:',
    options: ['J/m K', 'N/m K', 'W/m K', 'm K/W'],
    answer: 2,
  },
  {
    id: 45,
    section: 'Science',
    text: 'Audible wave frequency range:',
    options: ['20 Hz–10 KHz', '20 Hz–20 KHz', '10 Hz–10 KHz', '10 Hz–20 KHz'],
    answer: 1,
  },
  {
    id: 46,
    section: 'Science',
    text: 'Speed of light in vacuum:',
    options: ['3×10⁵ m/s', '3×10⁶ m/s', '3×10⁷ m/s', '3×10⁸ m/s'],
    answer: 3,
  },
  {
    id: 47,
    section: 'Science',
    text: 'Periodic time of wave with frequency 20 Hz:',
    options: ['0.05 s', '0.5 s', '5 s', '50 s'],
    answer: 0,
  },
  {
    id: 48,
    section: 'Science',
    text: 'LASER is extremely _____ radiation.',
    options: [
      'Unidirectional',
      'Focused',
      'Coherent and Stimulated',
      'All of above',
    ],
    answer: 3,
  },
  {
    id: 49,
    section: 'Science',
    text: 'Auditorium: volume 5000 m³, absorption 900 O.W.U. Reverberation time:',
    options: ['8.094 s', '0.729 s', '0.894 s', '1.003 s'],
    answer: 2,
  },
  {
    id: 50,
    section: 'Science',
    text: 'If n₁,n₂ are refractive indices of core and cladding, numerical aperture formula:',
    options: ['√(n₁²−n₂²)', '√(n₂²−n₁²)', '√(n₁−n₂)', 'n₁−n₂'],
    answer: 0,
  },
  // SECTION 2 – Mathematics (30 questions)
  {
    id: 51,
    section: 'Math',
    text: 'd/dx [log(sin x)] =',
    options: ['cot x', '–cot x', 'tan x', '–tan x'],
    answer: 0,
  },
  {
    id: 52,
    section: 'Math',
    text: 'If x + y = –2 then dy/dx =',
    options: ['0', '1', '2', '–1'],
    answer: 3,
  },
  {
    id: 53,
    section: 'Math',
    text: '∫(1/eˣ)dx = _____ + C',
    options: ['e⁻ˣ', '–e⁻ˣ', 'eˣ', '–eˣ'],
    answer: 1,
  },
  {
    id: 54,
    section: 'Math',
    text: 'log125 / log5 =',
    options: ['log125–log5', 'log120', '25', '3'],
    answer: 3,
  },
  {
    id: 55,
    section: 'Math',
    text: 'log2 + 2log3 =',
    options: ['2log6', 'log8', 'log18', 'log12'],
    answer: 2,
  },
  {
    id: 56,
    section: 'Math',
    text: 'Mean of first five negative integers:',
    options: ['15', '–15', '3', '–3'],
    answer: 3,
  },
  {
    id: 57,
    section: 'Math',
    text: '225° = _____ radian.',
    options: ['3π/4', '5π/4', '7π/4', '9π/4'],
    answer: 1,
  },
  {
    id: 58,
    section: 'Math',
    text: 'If sinθ = 2/5, then cotθ =',
    options: ['1', '1/2', '2', '1/5'],
    answer: 0,
  },
  {
    id: 59,
    section: 'Math',
    text: 'Principal period of cos(3+4x) =',
    options: ['π/4', '–π/4', 'π/2', '–π/2'],
    answer: 2,
  },
  {
    id: 60,
    section: 'Math',
    text: '|î + ĵ + k̂| =',
    options: ['3', '–3', '√3', '9'],
    answer: 2,
  },
  {
    id: 61,
    section: 'Math',
    text: 'If lines x–2y=3 and 3y+px–1=0 are perpendicular, p =',
    options: ['3/2', '–3/2', '6', '–6'],
    answer: 2,
  },
  {
    id: 62,
    section: 'Math',
    text: 'Centre of circle (x+3)² + y² – 2 = 0 is:',
    options: ['(3,0)', '(0,3)', '(–3,0)', '(0,–3)'],
    answer: 2,
  },
  {
    id: 63,
    section: 'Math',
    text: 'If f(x) = eˡᵒᵍˣ, f(1) =',
    options: ['0', '1', 'e', '–e'],
    answer: 1,
  },
  {
    id: 64,
    section: 'Math',
    text: 'lim(x→0) sin2x/tanx =',
    options: ['1', '1/2', '2', '3'],
    answer: 2,
  },
  {
    id: 65,
    section: 'Math',
    text: 'd/dx[log(5sinθ+3)] =',
    options: ['0', 'cosθ/(5sinθ+3)', '–cosθ/(5sinθ+3)', 'cosθ/3'],
    answer: 0,
  },
  {
    id: 66,
    section: 'Math',
    text: 'd/dx(cos²x) =',
    options: ['sin2x', '–sin2x', 'cos2x', '–cos2x'],
    answer: 1,
  },
  {
    id: 67,
    section: 'Math',
    text: '∫cos(10x+17)dx = _____ + C',
    options: [
      '10sin(10x+17)',
      '–10sin(10x+17)',
      '(1/10)sin(10x+17)',
      '–(1/10)sin(10x+17)',
    ],
    answer: 2,
  },
  {
    id: 68,
    section: 'Math',
    text: 'f(x) = log₄x. Find f(64).',
    options: ['3', '–3', '6', '1/3'],
    answer: 0,
  },
  {
    id: 69,
    section: 'Math',
    text: 'If vectors (2,3,a) and (3,–1,4) are perpendicular, a =',
    options: ['–3/4', '3/4', '4/3', '–4/3'],
    answer: 1,
  },
  {
    id: 70,
    section: 'Math',
    text: 'If centre of x²+y²–6my+11=0 is (0,–3), m =',
    options: ['2', '–2', '1', '–1'],
    answer: 0,
  },
  {
    id: 71,
    section: 'Math',
    text: 'Equation of line through (1,–1) and (–1,1):',
    options: ['2x+y–1=0', 'x+2y–1=0', 'x+y=0', 'x+2y+1=0'],
    answer: 2,
  },
  {
    id: 72,
    section: 'Math',
    text: '∫3x/(x²+6x+40)dx = _____ + C',
    options: [
      '(1/2)log|x²+6x+40|',
      '–(1/2)log|x²+6x+40|',
      '2log|x²+6x+40|',
      '–2log|x²+6x+40|',
    ],
    answer: 0,
  },
  {
    id: 73,
    section: 'Math',
    text: 'log₁/₉(81) =',
    options: ['–2', '2', '–1/2', '1/2'],
    answer: 0,
  },
  {
    id: 74,
    section: 'Math',
    text: 'log₂3 + log₈27 + 4·2 =',
    options: ['9', '10', '11', '12'],
    answer: 2,
  },
  {
    id: 75,
    section: 'Math',
    text: 'Mean of 19,15,12,k,8,3 is 11. Find k.',
    options: ['8', '9', '10', '11'],
    answer: 1,
  },
  {
    id: 76,
    section: 'Math',
    text: 'd/dx(sin5x·cos3x) at standard form:',
    options: [
      '5cos5x·cos3x – 3sin5x·sin3x',
      '5cos5x·cos3x + 3sin5x·sin3x',
      '–5cos5x·cos3x – 3sin5x·sin3x',
      'cos5x·cos3x',
    ],
    answer: 0,
  },
  {
    id: 77,
    section: 'Math',
    text: '|A| where A = [1 2 –1; 2 1 3; –1 1 0]',
    options: ['–3', '3', '–4', '4'],
    answer: 2,
  },
  {
    id: 78,
    section: 'Math',
    text: 'If A=[2 –1; 3 1], then A⁻¹ =',
    options: [
      '(1/5)[1 1; –3 2]',
      '(1/5)[2 1; –3 1]',
      '(1/5)[–1 1; 3 2]',
      '(1/5)[2 3; 1 1]',
    ],
    answer: 0,
  },
  {
    id: 79,
    section: 'Math',
    text: 'sin(225°) =',
    options: ['–1/√2', '1/√2', '√3/2', '1/2'],
    answer: 0,
  },
  {
    id: 80,
    section: 'Math',
    text: 'If A=[2 –1; 1 0] and B=[1 0; 2 3], then 3B–2A =',
    options: ['[–1 2; 4 9]', '[–1 –2; 4 9]', '[1 2; 4 9]', '[1 –2; 4 9]'],
    answer: 2,
  },
  // SECTION 2 – English & Soft Skills (20 questions)
  {
    id: 81,
    section: 'English',
    text: "'The talented singer danced quickly.' Identify the adverb.",
    options: ['talented', 'quickly', 'danced', 'singer'],
    answer: 1,
  },
  {
    id: 82,
    section: 'English',
    text: "'The captain along with ten players _____ arrived.' Choose correct verb.",
    options: ['has', 'have', 'is', 'are'],
    answer: 0,
  },
  {
    id: 83,
    section: 'English',
    text: "'None of the products _____ up to the mark.'",
    options: ['is', 'are', 'was', 'were'],
    answer: 3,
  },
  {
    id: 84,
    section: 'English',
    text: "'There is a church _____ the lake.'",
    options: ['over', 'on', 'between', 'above'],
    answer: 3,
  },
  {
    id: 85,
    section: 'English',
    text: "'He _____ to the gym every morning before work.'",
    options: ['goes', 'went', 'is going', 'go'],
    answer: 0,
  },
  {
    id: 86,
    section: 'English',
    text: 'Select the correct spelling:',
    options: ['Fahrenhit', 'Ferrenhit', 'Fahrenheit', 'Fahrenheat'],
    answer: 2,
  },
  {
    id: 87,
    section: 'English',
    text: 'Select the correct spelling:',
    options: [
      'Inconvenience',
      'Inconveninse',
      'Inconvinience',
      'Inconviniance',
    ],
    answer: 0,
  },
  {
    id: 88,
    section: 'English',
    text: 'Understanding the original idea of a message during communication is:',
    options: ['Decoding', 'Feedback', 'Encoding', 'Transmission'],
    answer: 0,
  },
  {
    id: 89,
    section: 'English',
    text: 'Study of body language including facial expressions and gestures:',
    options: ['Proxemics', 'Chronemics', 'Paralanguage', 'Kinesics'],
    answer: 3,
  },
  {
    id: 90,
    section: 'English',
    text: 'Which is NOT an example of verbal communication?',
    options: [
      'Manager giving oral instructions',
      'Man shaking hands',
      'Student writing a letter',
      'Old man reading newspaper',
    ],
    answer: 1,
  },
  {
    id: 91,
    section: 'English',
    text: 'A letter of adjustment is written in response to:',
    options: [
      'Letter of inquiry',
      'Request letter',
      'Order letter',
      'Complaint letter',
    ],
    answer: 3,
  },
  {
    id: 92,
    section: 'English',
    text: 'A letter of inquiry is written to:',
    options: [
      'Offer a product',
      'Seek details about product/service',
      'Start an investigation',
      'Raise a complaint',
    ],
    answer: 1,
  },
  {
    id: 93,
    section: 'English',
    text: 'Which is an essential part of a business letter?',
    options: [
      'Executive summary',
      'Identification initials',
      'Inside address',
      'Carbon copy notation',
    ],
    answer: 2,
  },
  {
    id: 94,
    section: 'English',
    text: "Full form of 'PS' in letter writing:",
    options: ['Please', 'Post Service', 'Personnel Service', 'Post Script'],
    answer: 3,
  },
  {
    id: 95,
    section: 'English',
    text: "'Hurrah! I have passed the examination.' Identify the interjection.",
    options: ['Examination', 'Passed', 'Hurrah!', 'The whole sentence'],
    answer: 2,
  },
  {
    id: 96,
    section: 'English',
    text: "'The dog is sitting _____ the cot.'",
    options: ['under', 'into', 'between', 'up'],
    answer: 0,
  },
  {
    id: 97,
    section: 'English',
    text: "'The Sun _____ in the East.'",
    options: ['raise', 'rises', 'rise', 'raised'],
    answer: 1,
  },
  {
    id: 98,
    section: 'English',
    text: "'Your family _____ a happy family.'",
    options: ['are', 'is', 'has', 'have'],
    answer: 1,
  },
  {
    id: 99,
    section: 'English',
    text: 'Choose the correct grammatical sentence:',
    options: [
      'People were coming, going and ignorant him.',
      'People were coming, going and ignoring him.',
      'People where coming, going and ignoring him.',
      'People were coming, going and ignored him.',
    ],
    answer: 1,
  },
  {
    id: 100,
    section: 'English',
    text: 'Verbal communication can be in _____ form.',
    options: ['written', 'oral and written', 'oral', 'none of these'],
    answer: 1,
  },
];

const ADMIN_PW = 'ddcet@admin2025';
const TIMER_SEC = 150 * 60;
const BRANCHES = [
  'Civil Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Electronics & Communication',
  'Computer Engineering',
  'Chemical Engineering',
  'IT Engineering',
  'Automobile Engineering',
  'Other',
];
const SECTIONS = ['Science', 'Math', 'English'];

// ─── STORAGE ──────────────────────────────────────────────────────────────────
async function loadQ() {
  try {
    const r = await window.storage.get('admin:questions', true);
    if (r) {
      const q = JSON.parse(r.value);
      if (Array.isArray(q) && q.length > 0) return q;
    }
  } catch {}
  return DEFAULT_QUESTIONS;
}
async function saveQ(qs) {
  try {
    await window.storage.set('admin:questions', JSON.stringify(qs), true);
  } catch {}
}
async function saveScore(e) {
  try {
    await window.storage.set(
      `scores:${Date.now()}_${Math.random().toString(36).slice(2)}`,
      JSON.stringify(e),
      true
    );
  } catch {}
}
async function loadScores() {
  try {
    const res = await window.storage.list('scores:', true);
    if (!res) return [];
    const all = await Promise.all(
      res.keys.map(async (k) => {
        try {
          const r = await window.storage.get(k, true);
          return r ? JSON.parse(r.value) : null;
        } catch {
          return null;
        }
      })
    );
    return all.filter(Boolean).sort((a, b) => b.score - a.score);
  } catch {
    return [];
  }
}
const fmtTime = (s) => {
  const h = Math.floor(s / 3600),
    m = Math.floor((s % 3600) / 60),
    sec = s % 60;
  return `${h > 0 ? h + ':' : ''}${String(m).padStart(2, '0')}:${String(
    sec
  ).padStart(2, '0')}`;
};
const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2)}`;
const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadQ().then((q) => {
      setQuestions(q);
      setLoading(false);
    });
  }, []);
  const refreshQ = async () => {
    const q = await loadQ();
    setQuestions(q);
  };
  if (loading)
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#060c18',
        }}
      >
        <CSS />
        <Dots />
      </div>
    );
  return (
    <>
      <CSS />
      {screen === 'home' && (
        <Home setScreen={setScreen} questions={questions} />
      )}
      {screen === 'test' && (
        <Test setScreen={setScreen} questions={questions} />
      )}
      {screen === 'result' && <Result setScreen={setScreen} />}
      {screen === 'leaderboard' && <Leaderboard setScreen={setScreen} />}
      {screen === 'admin' && (
        <Admin
          setScreen={setScreen}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}
    </>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({ setScreen, questions }) {
  const [info, setInfo] = useState({ name: '', branch: '', college: '' });
  const [err, setErr] = useState({});
  const [showAdm, setShowAdm] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState('');
  const sci = questions.filter((q) => q.section === 'Science').length;
  const math = questions.filter((q) => q.section === 'Math').length;
  const eng = questions.filter((q) => q.section === 'English').length;
  const start = () => {
    const e = {};
    if (!info.name.trim()) e.name = 'Name is required';
    if (!info.branch) e.branch = 'Select your branch';
    if (Object.keys(e).length) {
      setErr(e);
      return;
    }
    setErr({});
    sessionStorage.setItem('ddcet_student', JSON.stringify(info));
    setScreen('test');
  };
  return (
    <div className="pg home-pg">
      <div className="home-grid">
        <div className="home-left">
          <div className="brand-pill">GTU · DDCET</div>
          <h1 className="home-h1">
            Mock Test
            <br />
            Platform
          </h1>
          <p className="home-sub">
            Diploma to Degree Common Entrance Test — Official Pattern Practice
          </p>
          <div className="info-pills">
            <div className="ipill">
              <b>{questions.length}</b>Questions
            </div>
            <div className="ipill">
              <b>150</b>Minutes
            </div>
            <div className="ipill">
              <b>200</b>Marks
            </div>
          </div>
          <div className="dist-grid">
            {[
              ['Science', sci, '#3b82f6'],
              ['Math', math, '#8b5cf6'],
              ['English', eng, '#10b981'],
            ].map(([s, n, c]) => (
              <div key={s} className="dist-row">
                <div
                  className="dist-bar"
                  style={{
                    width: `${(n / questions.length) * 100}%`,
                    background: c,
                  }}
                />
                <span className={`sec-tag sec-${s}`}>{s}</span>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '.75rem',
                    color: '#64748b',
                  }}
                >
                  {n} Q
                </span>
              </div>
            ))}
          </div>
          <div className="mark-row">
            <div className="mk green">+2 Correct</div>
            <div className="mk red">−0.5 Wrong</div>
            <div className="mk gray">0 Skipped</div>
          </div>
        </div>
        <div className="home-right">
          <div className="form-card">
            <h2 className="fc-h">Begin Your Test</h2>
            <Fg label="Full Name *">
              <input
                className={`fi${err.name ? ' fi-e' : ''}`}
                placeholder="Enter your full name"
                value={info.name}
                onChange={(e) =>
                  setInfo((s) => ({ ...s, name: e.target.value }))
                }
                onKeyDown={(e) => e.key === 'Enter' && start()}
              />
              {err.name && <Fe>{err.name}</Fe>}
            </Fg>
            <Fg label="Engineering Branch *">
              <select
                className={`fi${err.branch ? ' fi-e' : ''}`}
                value={info.branch}
                onChange={(e) =>
                  setInfo((s) => ({ ...s, branch: e.target.value }))
                }
              >
                <option value="">— Select branch —</option>
                {BRANCHES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              {err.branch && <Fe>{err.branch}</Fe>}
            </Fg>
            <Fg label="College Name (optional)">
              <input
                className="fi"
                placeholder="Your college / institute name"
                value={info.college}
                onChange={(e) =>
                  setInfo((s) => ({ ...s, college: e.target.value }))
                }
              />
            </Fg>
            <button className="btn-prim" onClick={start}>
              Start Test →
            </button>
            <div className="divider">
              <span>or</span>
            </div>
            <button
              className="btn-out w100"
              onClick={() => setScreen('leaderboard')}
            >
              🏆 View Leaderboard
            </button>
            <button className="btn-ghost" onClick={() => setShowAdm((v) => !v)}>
              ⚙ Admin Panel
            </button>
            {showAdm && (
              <div className="adm-box">
                <input
                  className="fi"
                  type="password"
                  placeholder="Admin password"
                  value={pw}
                  onChange={(e) => {
                    setPw(e.target.value);
                    setPwErr('');
                  }}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    (pw === ADMIN_PW
                      ? setScreen('admin')
                      : setPwErr('Incorrect password'))
                  }
                />
                {pwErr && <Fe>{pwErr}</Fe>}
                <button
                  className="btn-adm"
                  onClick={() => {
                    pw === ADMIN_PW
                      ? setScreen('admin')
                      : setPwErr('Incorrect password');
                  }}
                >
                  Enter Admin →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TEST ─────────────────────────────────────────────────────────────────────
function Test({ setScreen, questions }) {
  const student = JSON.parse(
    sessionStorage.getItem('ddcet_student') ||
      '{"name":"Student","branch":"—","college":"—"}'
  );
  // Pick exactly 100: up to 50 Science, 30 Math, 20 English (fill remaining from any section if bank is small)
  const [testQs] = useState(() => {
    const pick = (arr, n) => shuffle(arr).slice(0, Math.min(n, arr.length));
    const sci = pick(
      questions.filter((q) => q.section === 'Science'),
      50
    );
    const math = pick(
      questions.filter((q) => q.section === 'Math'),
      30
    );
    const eng = pick(
      questions.filter((q) => q.section === 'English'),
      20
    );
    return shuffle([...sci, ...math, ...eng]);
  });
  const [ans, setAns] = useState({});
  const [flag, setFlag] = useState({});
  const [cur, setCur] = useState(0);
  const [tLeft, setTLeft] = useState(TIMER_SEC);
  const [done, setDone] = useState(false);
  const [panel, setPanel] = useState(false);
  const [sf, setSf] = useState('All');
  const ref = useRef();
  useEffect(() => {
    if (!done) {
      ref.current = setInterval(
        () =>
          setTLeft((t) => {
            if (t <= 1) {
              clearInterval(ref.current);
              submit(true);
              return 0;
            }
            return t - 1;
          }),
        1000
      );
    }
    return () => clearInterval(ref.current);
  }, [done]);
  const submit = useCallback(
    (auto = false) => {
      if (done) return;
      clearInterval(ref.current);
      setDone(true);
      let c = 0,
        w = 0,
        u = 0;
      testQs.forEach((q, i) => {
        if (ans[i] === undefined) u++;
        else if (ans[i] === q.answer) c++;
        else w++;
      });
      const score = Math.max(0, c * 2 - w * 0.5);
      const entry = {
        name: student.name,
        branch: student.branch,
        college: student.college || '—',
        score,
        correct: c,
        wrong: w,
        unattempted: u,
        total: testQs.length,
        timeTaken: TIMER_SEC - tLeft,
        date: new Date().toLocaleDateString('en-IN'),
      };
      sessionStorage.setItem('ddcet_result', JSON.stringify(entry));
      saveScore(entry).then(() => setScreen('result'));
    },
    [done, testQs, ans, tLeft, student]
  );
  const q = testQs[cur];
  const attempted = Object.keys(ans).length;
  const flagged = Object.values(flag).filter(Boolean).length;
  const tc = tLeft > 600 ? 't-ok' : tLeft > 180 ? 't-warn' : 't-danger';
  const chipCls = (i) => {
    const a = ans[i] !== undefined,
      f = flag[i];
    return a && f
      ? 'chip-both'
      : f
      ? 'chip-flag'
      : a
      ? 'chip-ans'
      : i === cur
      ? 'chip-cur'
      : 'chip-none';
  };
  const navQs =
    sf === 'All'
      ? testQs.map((q, i) => ({ q, i }))
      : testQs.map((q, i) => ({ q, i })).filter(({ q }) => q.section === sf);
  return (
    <div className="test-root">
      {/* HEADER */}
      <div className="t-hdr">
        <div className="thdr-l">
          <span className="t-logo">DDCET</span>
          <span className="t-name">{student.name}</span>
          <span className="t-branch">
            {student.branch.split(' ').slice(0, 2).join(' ')}
          </span>
        </div>
        <div className="thdr-m">
          <Pill c="green">{attempted} done</Pill>
          <Pill c="amber">{flagged} flagged</Pill>
          <Pill c="gray">{testQs.length - attempted} left</Pill>
        </div>
        <div className="thdr-r">
          <div className={`timer ${tc}`}>{fmtTime(tLeft)}</div>
          <button className="btn-tog" onClick={() => setPanel((v) => !v)}>
            ☰
          </button>
          <button
            className="btn-sub"
            onClick={() => {
              if (
                window.confirm(
                  `Submit?\n${
                    testQs.length - attempted
                  } unanswered question(s).`
                )
              )
                submit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="prog">
        <div
          className="prog-f"
          style={{ width: `${((cur + 1) / testQs.length) * 100}%` }}
        />
      </div>
      <div className="t-body">
        {/* QUESTION */}
        <div className="q-main">
          <div className="q-meta-row">
            <span className={`sec-tag sec-${q.section}`}>{q.section}</span>
            <span className="q-num">
              Q {cur + 1} / {testQs.length}
            </span>
          </div>
          <div className="q-txt">{q.text}</div>
          <div className="opts-col">
            {q.options.map((o, i) => (
              <button
                key={i}
                className={`opt${ans[cur] === i ? ' opt-sel' : ''}`}
                onClick={() => setAns((a) => ({ ...a, [cur]: i }))}
              >
                <div className="opt-l">{['A', 'B', 'C', 'D'][i]}</div>
                <div className="opt-t">{o}</div>
              </button>
            ))}
          </div>
          <div className="q-foot">
            <button
              className={`btn-flag${flag[cur] ? ' fl-on' : ' fl-off'}`}
              onClick={() => setFlag((f) => ({ ...f, [cur]: !f[cur] }))}
            >
              {flag[cur] ? '🚩 Flagged' : '🏳 Flag'}
            </button>
            <div className="nav-r">
              {ans[cur] !== undefined && (
                <button
                  className="btn-clr"
                  onClick={() =>
                    setAns((a) => {
                      const n = { ...a };
                      delete n[cur];
                      return n;
                    })
                  }
                >
                  ✕ Clear
                </button>
              )}
              <button
                className="btn-nav"
                disabled={cur === 0}
                onClick={() => setCur((c) => c - 1)}
              >
                ← Prev
              </button>
              <button
                className="btn-nav prim"
                disabled={cur === testQs.length - 1}
                onClick={() => setCur((c) => c + 1)}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
        {/* NAVIGATOR */}
        <div className={`nav-panel${panel ? ' pan-open' : ''}`}>
          <div className="np-hdr">
            <span className="np-ttl">Navigator</span>
            <button className="np-cls" onClick={() => setPanel(false)}>
              ✕
            </button>
          </div>
          <div className="np-flt">
            {['All', ...SECTIONS].map((s) => (
              <button
                key={s}
                className={`nfb${sf === s ? ' nfa' : ''}`}
                onClick={() => setSf(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="np-leg">
            <span className="lg chip-ans">Answered</span>
            <span className="lg chip-flag">Flagged</span>
            <span className="lg chip-both">Both</span>
            <span className="lg chip-none">Pending</span>
          </div>
          <div className="np-grid">
            {navQs.map(({ q: nq, i }) => (
              <div
                key={i}
                className={`chip ${chipCls(i)}${i === cur ? ' chip-cur' : ''}`}
                onClick={() => {
                  setCur(i);
                  if (window.innerWidth < 900) setPanel(false);
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        {panel && <div className="ov" onClick={() => setPanel(false)} />}
      </div>
    </div>
  );
}

// ─── RESULT ───────────────────────────────────────────────────────────────────
function Result({ setScreen }) {
  const r = JSON.parse(sessionStorage.getItem('ddcet_result') || 'null');
  if (!r)
    return (
      <div
        className="pg"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <p style={{ color: '#64748b' }}>No result found.</p>
      </div>
    );
  const pct = Math.round((r.score / (r.total * 2)) * 100);
  const grade =
    pct >= 75
      ? 'A+'
      : pct >= 60
      ? 'A'
      : pct >= 45
      ? 'B'
      : pct >= 30
      ? 'C'
      : 'D';
  const gc =
    pct >= 75
      ? '#4ade80'
      : pct >= 60
      ? '#60a5fa'
      : pct >= 45
      ? '#fbbf24'
      : pct >= 30
      ? '#f97316'
      : '#f87171';
  const em = pct >= 75 ? '🎉' : pct >= 55 ? '👍' : pct >= 35 ? '📖' : '💪';
  const circ = 2 * Math.PI * 50;
  return (
    <div className="pg res-pg">
      <div className="res-card">
        <div className="res-top">
          <div style={{ fontSize: '2.6rem' }}>{em}</div>
          <div className="res-nm">{r.name}</div>
          <div className="res-br">
            {r.branch}
            {r.college !== '—' ? ` · ${r.college}` : ''} · {r.date}
          </div>
        </div>
        <div className="ring-wrap">
          <svg viewBox="0 0 120 120" style={{ width: 140, height: 140 }}>
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#1e293b"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={gc}
              strokeWidth="10"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct / 100)}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 1.2s ease' }}
            />
          </svg>
          <div className="ring-in">
            <div className="ring-sc">{r.score.toFixed(1)}</div>
            <div className="ring-tot">/{r.total * 2}</div>
          </div>
        </div>
        <div className="grade-bdg" style={{ color: gc, borderColor: gc }}>
          Grade {grade} · {pct}%
        </div>
        <div className="res-grid">
          {[
            ['Correct', r.correct, '#4ade80'],
            ['Wrong', r.wrong, '#f87171'],
            ['Skipped', r.unattempted, '#94a3b8'],
            ['+Marks', (r.correct * 2).toFixed(1) + '', '#fbbf24'],
            ['−Marks', (r.wrong * 0.5).toFixed(1) + '', '#f87171'],
            ['Time', `${Math.floor(r.timeTaken / 60)}m`, '#60a5fa'],
          ].map(([l, v, c]) => (
            <div key={l} className="rg-cell">
              <div className="rg-v" style={{ color: c }}>
                {v}
              </div>
              <div className="rg-l">{l}</div>
            </div>
          ))}
        </div>
        <div className="res-acts">
          <button
            className="btn-prim"
            style={{ flex: 1 }}
            onClick={() => setScreen('home')}
          >
            Try Again
          </button>
          <button className="btn-out" onClick={() => setScreen('leaderboard')}>
            🏆 Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LEADERBOARD ──────────────────────────────────────────────────────────────
function Leaderboard({ setScreen }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flt, setFlt] = useState('All');
  useEffect(() => {
    loadScores().then((s) => {
      setScores(s);
      setLoading(false);
    });
  });
  const branches = ['All', ...new Set(scores.map((s) => s.branch))];
  const shown = flt === 'All' ? scores : scores.filter((s) => s.branch === flt);
  return (
    <div className="pg lb-pg">
      <div className="lb-wrap">
        <div className="lb-hdr-row">
          <button className="btn-bk" onClick={() => setScreen('home')}>
            ← Back
          </button>
          <h2 className="lb-ttl">🏆 Leaderboard</h2>
          <span className="lb-cnt">{scores.length} attempts</span>
        </div>
        <div className="lb-flt">
          {branches.slice(0, 8).map((b) => (
            <button
              key={b}
              className={`nfb${flt === b ? ' nfa' : ''}`}
              style={{ fontSize: '.71rem' }}
              onClick={() => setFlt(b)}
            >
              {b === 'All' ? b : b.split(' ')[0]}
            </button>
          ))}
        </div>
        {loading ? (
          <Dots />
        ) : shown.length === 0 ? (
          <div className="empty">No scores yet — be the first!</div>
        ) : (
          <div className="lb-tbl">
            <div className="lb-head">
              <div>#</div>
              <div>Student</div>
              <div>Branch</div>
              <div>Score</div>
              <div>%</div>
              <div>C/W/S</div>
            </div>
            {shown.slice(0, 60).map((s, i) => {
              const pct = Math.round((s.score / (s.total * 2)) * 100);
              return (
                <div key={i} className={`lb-row${i < 3 ? ' lb-top' : ''}`}>
                  <div className={`lbr${i < 3 ? i + 1 : ''}`}>
                    {i === 0
                      ? '🥇'
                      : i === 1
                      ? '🥈'
                      : i === 2
                      ? '🥉'
                      : `#${i + 1}`}
                  </div>
                  <div>
                    <div className="lb-nm">{s.name}</div>
                    <div className="lb-cl">
                      {s.college !== '—' ? s.college + ' · ' : ''}
                      {s.date}
                    </div>
                  </div>
                  <div className="lb-br">
                    {s.branch.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <div className="lb-sc">{s.score.toFixed(1)}</div>
                  <div
                    className="lb-pc"
                    style={{
                      color:
                        pct >= 60
                          ? '#4ade80'
                          : pct >= 40
                          ? '#fbbf24'
                          : '#f87171',
                    }}
                  >
                    {pct}%
                  </div>
                  <div className="lb-cws">
                    <span style={{ color: '#4ade80' }}>{s.correct}✓</span>{' '}
                    <span style={{ color: '#f87171' }}>{s.wrong}✗</span>{' '}
                    <span style={{ color: '#94a3b8' }}>{s.unattempted}−</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function Admin({ setScreen, questions, setQuestions }) {
  const [tab, setTab] = useState('list');
  const [editQ, setEditQ] = useState(null);
  const [search, setSearch] = useState('');
  const [fSec, setFSec] = useState('All');
  const [importTxt, setImportTxt] = useState('');
  const [impErr, setImpErr] = useState('');
  const [impOk, setImpOk] = useState('');
  const [msg, setMsg] = useState('');
  const sci = questions.filter((q) => q.section === 'Science').length;
  const math = questions.filter((q) => q.section === 'Math').length;
  const eng = questions.filter((q) => q.section === 'English').length;
  const doSave = async (qs) => {
    setQuestions(qs);
    await saveQ(qs);
    setMsg('Saved ✓');
    setTimeout(() => setMsg(''), 2500);
  };
  const del = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    await doSave(questions.filter((q) => q.id !== id));
  };
  const onSaveQ = async (q) => {
    const updated = questions.find((x) => x.id === q.id)
      ? questions.map((x) => (x.id === q.id ? q : x))
      : [...questions, q];
    await doSave(updated);
    setTab('list');
    setEditQ(null);
  };
  const doImport = async () => {
    setImpErr('');
    setImpOk('');
    const lines = importTxt
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    const nqs = [];
    for (let i = 0; i < lines.length; i++) {
      const p = lines[i].split('|');
      if (p.length !== 7) {
        setImpErr(`Line ${i + 1}: Need 7 fields separated by |`);
        return;
      }
      const [sec, text, a, b, c, d, ans] = p.map((x) => x.trim());
      if (!SECTIONS.includes(sec)) {
        setImpErr(`Line ${i + 1}: Section must be Science, Math, or English`);
        return;
      }
      const ai = parseInt(ans);
      if (isNaN(ai) || ai < 0 || ai > 3) {
        setImpErr(`Line ${i + 1}: Answer must be 0, 1, 2, or 3`);
        return;
      }
      nqs.push({
        id: uid(),
        section: sec,
        text,
        options: [a, b, c, d],
        answer: ai,
      });
    }
    await doSave([...questions, ...nqs]);
    setImpOk(`✓ Imported ${nqs.length} questions successfully!`);
    setImportTxt('');
  };
  const filtered = questions.filter(
    (q) =>
      (fSec === 'All' || q.section === fSec) &&
      (!search || q.text.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="pg adm-pg">
      <div className="adm-wrap">
        <div className="adm-hdr">
          <div className="adm-hl">
            <button className="btn-bk" onClick={() => setScreen('home')}>
              ← Exit Admin
            </button>
            <h2 className="adm-ttl">⚙ Admin Panel</h2>
            {msg && <span className="save-ok">{msg}</span>}
          </div>
          <div className="adm-stats">
            <span className="asp blue">{sci} Science</span>
            <span className="asp purple">{math} Math</span>
            <span className="asp green">{eng} English</span>
            <span className="asp amber">{questions.length} Total</span>
          </div>
        </div>
        <div className="adm-note">
          Test picks: <b>50 Science</b> + <b>30 Math</b> + <b>20 English</b> ={' '}
          <b>100 questions</b> randomly each time.
        </div>
        <div className="tabs">
          {[
            ['list', '📋 All Questions'],
            ['add', '➕ Add Question'],
            ['import', '📥 Bulk Import'],
          ].map(([t, l]) => (
            <button
              key={t}
              className={`tab${tab === t ? ' tab-a' : ''}`}
              onClick={() => {
                setTab(t);
                setEditQ(null);
              }}
            >
              {l}
            </button>
          ))}
          <button
            className="tab tab-d"
            onClick={() => {
              if (
                window.confirm(
                  'Reset ALL questions to default 100 built-in questions? This cannot be undone.'
                )
              )
                doSave(DEFAULT_QUESTIONS);
            }}
          >
            ↺ Reset to Default
          </button>
        </div>
        {tab === 'list' && (
          <div className="adm-box">
            <div className="adm-tb">
              <input
                className="fi"
                placeholder="🔍 Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1 }}
              />
              {['All', ...SECTIONS].map((s) => (
                <button
                  key={s}
                  className={`nfb${fSec === s ? ' nfa' : ''}`}
                  onClick={() => setFSec(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="ql-note">
              Showing {filtered.length} of {questions.length} questions
            </div>
            <div className="ql">
              {filtered.map((q) => (
                <div key={q.id} className="ql-item">
                  <div className="ql-top">
                    <span className={`sec-tag sec-${q.section}`}>
                      {q.section}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        fontSize: '.9rem',
                        color: '#e2e8f0',
                        margin: '0 .6rem',
                      }}
                    >
                      {q.text}
                    </div>
                    <button
                      className="btn-ed"
                      onClick={() => {
                        setEditQ(q);
                        setTab('add');
                      }}
                    >
                      ✏
                    </button>
                    <button className="btn-dl" onClick={() => del(q.id)}>
                      🗑
                    </button>
                  </div>
                  <div className="ql-opts">
                    {q.options.map((o, j) => (
                      <span
                        key={j}
                        className={`ql-o${j === q.answer ? ' ql-ok' : ''}`}
                      >
                        {['A', 'B', 'C', 'D'][j]}. {o}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="empty">No questions match your filter.</div>
              )}
            </div>
          </div>
        )}
        {tab === 'add' && (
          <QForm
            key={editQ?.id || 'new'}
            initial={editQ}
            onSave={onSaveQ}
            onCancel={() => {
              setTab('list');
              setEditQ(null);
            }}
          />
        )}
        {tab === 'import' && (
          <div className="adm-box">
            <div className="imp-guide">
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  color: '#f1f5f9',
                  marginBottom: '.5rem',
                }}
              >
                📥 Bulk Import Format
              </h3>
              <p
                style={{
                  fontSize: '.82rem',
                  color: '#94a3b8',
                  marginBottom: '.75rem',
                }}
              >
                One question per line, 7 fields separated by <code>|</code>
              </p>
              <div className="imp-fmt">
                <code>
                  Section | Question text | Option A | Option B | Option C |
                  Option D | Answer (0=A, 1=B, 2=C, 3=D)
                </code>
              </div>
              <div className="imp-ex">
                <div
                  style={{
                    fontSize: '.68rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: '.3rem',
                  }}
                >
                  Example lines:
                </div>
                <code>
                  Science|What is the SI unit of
                  force?|Newton|Joule|Watt|Pascal|0
                </code>
                <br />
                <code>Math|What is d/dx(x²)?|x|2x|x²|2x²|1</code>
                <br />
                <code>
                  English|Select correct
                  spelling:|Recieve|Receive|Recevie|Reciave|1
                </code>
              </div>
              <p
                style={{
                  fontSize: '.73rem',
                  color: '#64748b',
                  marginTop: '.5rem',
                }}
              >
                <b>Sections:</b> Science, Math, English &nbsp;|&nbsp;{' '}
                <b>Answer index:</b> 0, 1, 2, or 3
              </p>
            </div>
            <textarea
              className="imp-ta"
              rows={13}
              placeholder={
                'Science|Question text here|Option A|Option B|Option C|Option D|0\nMath|Another question|A|B|C|D|2\n...'
              }
              value={importTxt}
              onChange={(e) => {
                setImportTxt(e.target.value);
                setImpErr('');
                setImpOk('');
              }}
            />
            {impErr && <div className="imp-err">⚠ {impErr}</div>}
            {impOk && <div className="imp-ok">{impOk}</div>}
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button
                className="btn-prim"
                style={{ flex: 1 }}
                onClick={doImport}
                disabled={!importTxt.trim()}
              >
                Import Questions
              </button>
              <button className="btn-out" onClick={() => setImportTxt('')}>
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QUESTION FORM ────────────────────────────────────────────────────────────
function QForm({ initial, onSave, onCancel }) {
  const blank = {
    id: uid(),
    section: 'Science',
    text: '',
    options: ['', '', '', ''],
    answer: 0,
  };
  const [f, setF] = useState(
    initial ? { ...initial, options: [...initial.options] } : blank
  );
  const [e, setE] = useState({});
  const submit = () => {
    const er = {};
    if (!f.text.trim()) er.text = 'Question text is required';
    f.options.forEach((o, i) => {
      if (!o.trim()) er[`o${i}`] = 'Option required';
    });
    if (Object.keys(er).length) {
      setE(er);
      return;
    }
    onSave({
      ...f,
      text: f.text.trim(),
      options: f.options.map((o) => o.trim()),
    });
  };
  return (
    <div className="adm-box">
      <h3
        style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          color: '#f1f5f9',
          marginBottom: '1.2rem',
          fontSize: '1.05rem',
        }}
      >
        {initial ? '✏ Edit Question' : '➕ Add New Question'}
      </h3>
      <Fg label="Section *">
        <select
          className="fi"
          value={f.section}
          onChange={(e) => setF((x) => ({ ...x, section: e.target.value }))}
        >
          {SECTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Fg>
      <Fg label="Question Text *">
        <textarea
          className={`fi fi-ta${e.text ? ' fi-e' : ''}`}
          rows={3}
          placeholder="Enter the full question text here..."
          value={f.text}
          onChange={(ev) => setF((x) => ({ ...x, text: ev.target.value }))}
        />
        {e.text && <Fe>{e.text}</Fe>}
      </Fg>
      <div className="fg">
        <label className="fl">
          Options *{' '}
          <span
            style={{ color: '#475569', fontWeight: 400, textTransform: 'none' }}
          >
            — click letter to mark correct answer
          </span>
        </label>
        {f.options.map((opt, i) => (
          <div key={i} className={`of-row${f.answer === i ? ' of-ok' : ''}`}>
            <button
              className={`of-rb${f.answer === i ? ' of-rb-on' : ''}`}
              onClick={() => setF((x) => ({ ...x, answer: i }))}
            >
              {f.answer === i ? '✓' : ['A', 'B', 'C', 'D'][i]}
            </button>
            <input
              className={`fi${e[`o${i}`] ? ' fi-e' : ''}`}
              placeholder={`Option ${['A', 'B', 'C', 'D'][i]}`}
              value={opt}
              onChange={(ev) =>
                setF((x) => ({
                  ...x,
                  options: x.options.map((o, j) =>
                    j === i ? ev.target.value : o
                  ),
                }))
              }
            />
          </div>
        ))}
        <div style={{ fontSize: '.72rem', color: '#4ade80', marginTop: 5 }}>
          Correct answer: Option {['A', 'B', 'C', 'D'][f.answer]}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button className="btn-prim" style={{ flex: 1 }} onClick={submit}>
          {initial ? 'Save Changes' : 'Add Question'}
        </button>
        <button className="btn-out" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── MINI COMPONENTS ─────────────────────────────────────────────────────────
const Fg = ({ label, children }) => (
  <div className="fg">
    <label className="fl">{label}</label>
    {children}
  </div>
);
const Fe = ({ children }) => <span className="fe">{children}</span>;
const Pill = ({ c, children }) => (
  <span className={`pill ${c}`}>{children}</span>
);
const Dots = () => (
  <div className="dots">
    <span />
    <span />
    <span />
  </div>
);

// ─── CSS ──────────────────────────────────────────────────────────────────────
function CSS() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Outfit:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Outfit',sans-serif;background:#060c18;color:#e2e8f0;-webkit-font-smoothing:antialiased;}
textarea,input,select,button{font-family:'Outfit',sans-serif;}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#060c18}::-webkit-scrollbar-thumb{background:#1e293b;border-radius:3px}
code{font-size:.83em;background:#1e293b;padding:1px 6px;border-radius:4px;color:#a78bfa;}

/* SHARED */
.pg{min-height:100vh;padding:1.5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.fl{display:block;font-size:.71rem;font-weight:700;color:#94a3b8;margin-bottom:5px;text-transform:uppercase;letter-spacing:.05em;}
.fi{width:100%;background:#131e30;border:1.5px solid #1e2d45;border-radius:10px;padding:.6rem .9rem;color:#f1f5f9;font-size:.93rem;outline:none;transition:border-color .2s;}
.fi:focus{border-color:#3b82f6;} .fi-e{border-color:#ef4444!important;} .fe{font-size:.7rem;color:#ef4444;margin-top:3px;display:block;}
.fi-ta{resize:vertical;min-height:80px;}
.fg{margin-bottom:.9rem;}
.btn-prim{width:100%;padding:.8rem;background:linear-gradient(135deg,#1d4ed8,#6d28d9);border:none;border-radius:12px;color:#fff;font-size:.95rem;font-weight:700;font-family:'Bricolage Grotesque',sans-serif;cursor:pointer;transition:opacity .2s,transform .1s;}
.btn-prim:hover{opacity:.9;transform:translateY(-1px);} .btn-prim:disabled{opacity:.45;cursor:not-allowed;transform:none;}
.btn-out{padding:.72rem 1.3rem;background:transparent;border:1.5px solid #1e2d45;border-radius:12px;color:#94a3b8;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;}
.btn-out:hover{border-color:#60a5fa;color:#60a5fa;} .w100{width:100%;}
.btn-ghost{width:100%;padding:.55rem;background:transparent;border:none;color:#475569;font-size:.8rem;cursor:pointer;margin-top:4px;transition:color .2s;}
.btn-ghost:hover{color:#94a3b8;}
.btn-bk{padding:.45rem .95rem;background:#131e30;border:1.5px solid #1e2d45;border-radius:8px;color:#94a3b8;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;}
.btn-bk:hover{border-color:#60a5fa;color:#60a5fa;}
.divider{text-align:center;color:#1e2d45;font-size:.78rem;margin:.65rem 0;position:relative;}
.divider::before,.divider::after{content:"";position:absolute;top:50%;width:43%;height:1px;background:#131e30;}
.divider::before{left:0}.divider::after{right:0}
.sec-tag{font-size:.67rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:2px 9px;border-radius:20px;display:inline-block;}
.sec-Science{background:#1e3a5f;color:#60a5fa;} .sec-Math{background:#2d1b4e;color:#a78bfa;} .sec-English{background:#14352a;color:#4ade80;}
.nfb{padding:3px 9px;border-radius:20px;border:1px solid #1e2d45;background:transparent;color:#64748b;font-size:.74rem;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;}
.nfa{border-color:#3b82f6;background:#132040;color:#60a5fa;}
.pill{padding:3px 9px;border-radius:20px;font-size:.71rem;font-weight:700;background:#131e30;}
.pill.green{color:#4ade80;} .pill.amber{color:#fbbf24;} .pill.gray{color:#94a3b8;}
.dots{display:flex;gap:6px;padding:2rem;} .dots span{width:8px;height:8px;border-radius:50%;background:#1e2d45;animation:ld .8s infinite;}
.dots span:nth-child(2){animation-delay:.2s;} .dots span:nth-child(3){animation-delay:.4s;}
@keyframes ld{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
.empty{padding:2.5rem;text-align:center;color:#475569;font-size:.88rem;}

/* HOME */
.home-pg{background:radial-gradient(ellipse at 12% 55%,#1e3a5f22,transparent 55%),radial-gradient(ellipse at 88% 15%,#4f1b7a18,transparent 55%),#060c18;padding:2rem 1.5rem;}
.home-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;max-width:940px;width:100%;align-items:center;}
@media(max-width:680px){.home-grid{grid-template-columns:1fr;gap:2rem;}}
.brand-pill{display:inline-block;font-family:'Bricolage Grotesque',sans-serif;font-size:.7rem;font-weight:800;color:#3b82f6;background:#132040;border-radius:6px;padding:3px 10px;letter-spacing:.12em;margin-bottom:1.1rem;}
.home-h1{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(2.4rem,5.5vw,4rem);font-weight:800;line-height:.95;color:#f8fafc;margin-bottom:.7rem;}
.home-sub{font-size:.85rem;color:#64748b;line-height:1.6;margin-bottom:1.6rem;}
.info-pills{display:flex;gap:8px;margin-bottom:1.4rem;flex-wrap:wrap;}
.ipill{background:#0e1a2e;border:1px solid #1e2d45;border-radius:10px;padding:.55rem .9rem;text-align:center;min-width:70px;}
.ipill b{display:block;font-family:'Bricolage Grotesque',sans-serif;font-size:1.4rem;font-weight:800;color:#60a5fa;}
.ipill{font-size:.67rem;color:#64748b;text-transform:uppercase;letter-spacing:.05em;}
.dist-grid{display:flex;flex-direction:column;gap:6px;margin-bottom:1.3rem;}
.dist-row{display:flex;align-items:center;gap:8px;font-size:.75rem;}
.dist-bar{height:5px;border-radius:3px;min-width:3px;}
.mark-row{display:flex;gap:7px;}
.mk{flex:1;text-align:center;padding:.4rem;border-radius:8px;font-size:.73rem;font-weight:700;}
.mk.green{background:#0d2b1e;color:#4ade80;} .mk.red{background:#2d0a0a;color:#f87171;} .mk.gray{background:#131e30;color:#94a3b8;}
.form-card{background:#0e1a2e;border:1px solid #1e2d45;border-radius:20px;padding:1.9rem;box-shadow:0 30px 80px #00000070;}
.fc-h{font-family:'Bricolage Grotesque',sans-serif;font-size:1.25rem;font-weight:800;color:#f1f5f9;margin-bottom:1.3rem;}
.adm-box-sm{margin-top:.65rem;display:flex;flex-direction:column;gap:6px;}
.btn-adm{padding:.5rem;background:#131e30;border:1.5px solid #1e2d45;border-radius:8px;color:#94a3b8;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;}
.btn-adm:hover{border-color:#f59e0b;color:#f59e0b;}

/* TEST */
.test-root{display:flex;flex-direction:column;height:100vh;overflow:hidden;background:#060c18;}
.t-hdr{background:#0a1120;border-bottom:1px solid #131e30;padding:.6rem 1.2rem;display:flex;align-items:center;gap:.75rem;flex-shrink:0;flex-wrap:wrap;}
.thdr-l{display:flex;align-items:center;gap:7px;} .thdr-m{display:flex;gap:5px;flex:1;flex-wrap:wrap;} .thdr-r{display:flex;align-items:center;gap:7px;margin-left:auto;}
.t-logo{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:.95rem;color:#60a5fa;}
.t-name{font-size:.8rem;color:#e2e8f0;font-weight:600;} .t-branch{font-size:.7rem;color:#64748b;background:#131e30;border-radius:20px;padding:2px 8px;}
.timer{font-family:'Bricolage Grotesque',sans-serif;font-size:.97rem;font-weight:700;padding:4px 13px;border-radius:8px;min-width:76px;text-align:center;}
.t-ok{background:#0d2b1e;color:#4ade80;} .t-warn{background:#2d1800;color:#fbbf24;animation:pu .9s infinite;} .t-danger{background:#2d0a0a;color:#f87171;animation:pu .45s infinite;}
@keyframes pu{0%,100%{opacity:1}50%{opacity:.5}}
.btn-tog{padding:.38rem .75rem;background:#131e30;border:1.5px solid #1e2d45;border-radius:7px;color:#94a3b8;font-size:.8rem;cursor:pointer;display:none;}
@media(max-width:900px){.btn-tog{display:inline-flex;}}
.btn-sub{padding:.42rem 1rem;background:#c81e1e;border:none;border-radius:8px;color:#fff;font-weight:700;font-size:.82rem;cursor:pointer;transition:opacity .2s;white-space:nowrap;}
.btn-sub:hover{opacity:.85;}
.prog{height:3px;background:#131e30;flex-shrink:0;} .prog-f{height:100%;background:linear-gradient(90deg,#1d4ed8,#7c3aed);transition:width .4s;}
.t-body{flex:1;display:flex;overflow:hidden;position:relative;}
.q-main{flex:1;overflow-y:auto;padding:1.8rem 1.5rem;max-width:740px;}
.q-meta-row{display:flex;align-items:center;gap:9px;margin-bottom:.75rem;}
.q-num{font-size:.7rem;color:#64748b;font-weight:700;background:#131e30;border-radius:20px;padding:2px 9px;}
.q-txt{font-size:1.03rem;font-weight:500;color:#f1f5f9;line-height:1.65;margin-bottom:1.3rem;}
.opts-col{display:flex;flex-direction:column;gap:8px;}
.opt{display:flex;align-items:center;gap:11px;padding:.78rem 1rem;background:#131e30;border:1.5px solid #1e2d45;border-radius:12px;cursor:pointer;text-align:left;transition:all .15s;}
.opt:hover{border-color:#3b82f6;background:#132040;}
.opt-sel{border-color:#2563eb;background:#132040;}
.opt-l{width:27px;height:27px;border-radius:50%;background:#1e2d45;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;color:#94a3b8;flex-shrink:0;transition:all .15s;}
.opt-sel .opt-l{background:#1d4ed8;color:#fff;}
.opt-t{font-size:.9rem;color:#cbd5e1;} .opt-sel .opt-t{color:#f1f5f9;}
.q-foot{display:flex;justify-content:space-between;align-items:center;margin-top:1.4rem;padding-top:1.1rem;border-top:1px solid #131e30;flex-wrap:wrap;gap:8px;}
.btn-flag{padding:.42rem .9rem;border-radius:8px;border:1.5px solid;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s;}
.fl-off{border-color:#1e2d45;background:transparent;color:#64748b;} .fl-on{border-color:#f59e0b;background:#2d1800;color:#fbbf24;}
.nav-r{display:flex;gap:7px;align-items:center;}
.btn-nav{padding:.42rem 1rem;background:#131e30;border:1.5px solid #1e2d45;border-radius:8px;color:#94a3b8;font-weight:600;cursor:pointer;font-size:.82rem;transition:all .2s;}
.btn-nav:hover:not(:disabled){border-color:#60a5fa;color:#60a5fa;} .btn-nav:disabled{opacity:.3;cursor:not-allowed;}
.btn-nav.prim{background:linear-gradient(135deg,#1d4ed8,#6d28d9);border-color:transparent;color:#fff;}
.btn-nav.prim:hover:not(:disabled){opacity:.88;}
.btn-clr{padding:.38rem .75rem;background:transparent;border:1px solid #1e2d45;border-radius:7px;color:#64748b;font-size:.72rem;cursor:pointer;transition:all .2s;}
.btn-clr:hover{border-color:#ef4444;color:#f87171;}
/* nav panel */
.nav-panel{width:265px;background:#08111e;border-left:1px solid #131e30;display:flex;flex-direction:column;flex-shrink:0;overflow:hidden;}
@media(max-width:900px){.nav-panel{position:fixed;right:0;top:0;height:100%;z-index:200;transform:translateX(100%);transition:transform .3s;}.pan-open{transform:translateX(0)!important;}.ov{position:fixed;inset:0;background:#00000075;z-index:199;}}
.np-hdr{padding:.8rem 1rem;border-bottom:1px solid #131e30;display:flex;justify-content:space-between;align-items:center;}
.np-ttl{font-family:'Bricolage Grotesque',sans-serif;font-size:.82rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;}
.np-cls{background:transparent;border:none;color:#64748b;font-size:1rem;cursor:pointer;padding:2px 5px;}
.np-flt{display:flex;gap:4px;flex-wrap:wrap;padding:.55rem .9rem;border-bottom:1px solid #131e30;}
.np-leg{display:flex;flex-wrap:wrap;gap:4px;padding:.45rem .9rem;border-bottom:1px solid #131e30;}
.lg{font-size:.6rem;font-weight:700;padding:2px 7px;border-radius:4px;}
.np-grid{flex:1;overflow-y:auto;padding:.7rem .9rem;display:grid;grid-template-columns:repeat(5,1fr);gap:4px;align-content:start;}
.chip{aspect-ratio:1;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.67rem;font-weight:700;cursor:pointer;transition:all .15s;border:1.5px solid transparent;}
.chip-ans{background:#132040;border-color:#1d4ed8;color:#60a5fa;} .chip-flag{background:#2d1800;border-color:#d97706;color:#fbbf24;}
.chip-both{background:linear-gradient(135deg,#132040 50%,#2d1800 50%);border-color:#6d28d9;color:#c4b5fd;}
.chip-cur{background:#1e1040;border-color:#6d28d9;color:#c4b5fd;} .chip-none{background:#131e30;border-color:#1e2d45;color:#475569;}

/* RESULT */
.res-pg{background:radial-gradient(ellipse at 35% 25%,#1e3a5f1a,transparent 55%),#060c18;}
.res-card{background:#0e1a2e;border:1px solid #1e2d45;border-radius:22px;padding:2.1rem;box-shadow:0 40px 100px #00000070;width:100%;max-width:490px;}
.res-top{text-align:center;margin-bottom:1.4rem;}
.res-nm{font-family:'Bricolage Grotesque',sans-serif;font-size:1.35rem;font-weight:800;color:#f1f5f9;margin-top:.3rem;}
.res-br{font-size:.75rem;color:#64748b;margin-top:3px;}
.ring-wrap{position:relative;width:140px;height:140px;margin:0 auto .9rem;}
.ring-in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.ring-sc{font-family:'Bricolage Grotesque',sans-serif;font-size:1.85rem;font-weight:800;color:#f1f5f9;}
.ring-tot{font-size:.68rem;color:#64748b;margin-top:-2px;}
.grade-bdg{font-size:.8rem;font-weight:700;border:1.5px solid;border-radius:20px;padding:3px 14px;width:max-content;margin:0 auto 1.4rem;display:flex;align-items:center;}
.res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:1.4rem;}
.rg-cell{background:#131e30;border-radius:10px;padding:.8rem .4rem;text-align:center;}
.rg-v{font-family:'Bricolage Grotesque',sans-serif;font-size:1.35rem;font-weight:800;}
.rg-l{font-size:.62rem;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-top:2px;}
.res-acts{display:flex;gap:9px;} .res-acts .btn-prim{margin:0;}

/* LEADERBOARD */
.lb-pg{background:#060c18;align-items:flex-start;padding:1.5rem;}
.lb-wrap{width:100%;max-width:840px;}
.lb-hdr-row{display:flex;align-items:center;gap:.9rem;margin-bottom:.9rem;flex-wrap:wrap;}
.lb-ttl{font-family:'Bricolage Grotesque',sans-serif;font-size:1.45rem;font-weight:800;color:#f1f5f9;flex:1;}
.lb-cnt{font-size:.72rem;color:#64748b;background:#131e30;border-radius:20px;padding:3px 11px;}
.lb-flt{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:.9rem;}
.lb-tbl{background:#0e1a2e;border:1px solid #1e2d45;border-radius:16px;overflow:hidden;}
.lb-head{display:grid;grid-template-columns:46px 1fr 130px 65px 50px 90px;gap:.5rem;padding:.6rem 1.2rem;background:#131e30;font-size:.67rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;}
.lb-row{display:grid;grid-template-columns:46px 1fr 130px 65px 50px 90px;gap:.5rem;align-items:center;padding:.8rem 1.2rem;border-bottom:1px solid #0a111e;transition:background .15s;}
.lb-row:hover{background:#131e3022;} .lb-row:last-child{border-bottom:none;}
.lb-top{background:linear-gradient(90deg,#0d1f0d18,transparent);}
@media(max-width:580px){.lb-head,.lb-row{grid-template-columns:38px 1fr 55px 45px;} .lb-br,.lb-cws{display:none;}}
.lbr{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:.95rem;}
.lbr1{color:#fbbf24;} .lbr2{color:#94a3b8;} .lbr3{color:#f97316;}
.lb-nm{font-weight:600;color:#e2e8f0;font-size:.88rem;} .lb-cl{font-size:.67rem;color:#64748b;margin-top:1px;}
.lb-br{font-size:.73rem;color:#94a3b8;}
.lb-sc{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:1rem;color:#60a5fa;}
.lb-pc{font-weight:700;font-size:.82rem;}
.lb-cws{font-size:.7rem;display:flex;gap:4px;}

/* ADMIN */
.adm-pg{background:#04090f;align-items:flex-start;justify-content:flex-start;padding:1.5rem;}
.adm-wrap{width:100%;max-width:960px;}
.adm-hdr{display:flex;align-items:center;gap:.9rem;margin-bottom:.6rem;flex-wrap:wrap;}
.adm-hl{display:flex;align-items:center;gap:9px;flex:1;flex-wrap:wrap;}
.adm-ttl{font-family:'Bricolage Grotesque',sans-serif;font-size:1.25rem;font-weight:800;color:#f1f5f9;}
.save-ok{font-size:.75rem;color:#4ade80;background:#0d2b1e;border-radius:20px;padding:2px 10px;}
.adm-stats{display:flex;gap:5px;flex-wrap:wrap;}
.asp{font-size:.7rem;font-weight:700;border-radius:20px;padding:3px 9px;}
.asp.blue{background:#1e3a5f;color:#60a5fa;} .asp.purple{background:#2d1b4e;color:#a78bfa;} .asp.green{background:#14352a;color:#4ade80;} .asp.amber{background:#2d1800;color:#fbbf24;}
.adm-note{font-size:.77rem;color:#64748b;margin-bottom:.9rem;padding:.55rem .85rem;background:#0e1a2e;border-radius:8px;border:1px solid #131e30;}
.adm-note b{color:#e2e8f0;}
.tabs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:1rem;}
.tab{padding:.48rem 1rem;border-radius:10px;border:1.5px solid #1e2d45;background:transparent;color:#64748b;font-size:.81rem;font-weight:600;cursor:pointer;transition:all .2s;}
.tab-a{border-color:#3b82f6;background:#132040;color:#60a5fa;}
.tab-d{border-color:#4a1515;color:#f87171;}
.tab-d:hover{background:#2d0a0a;}
.adm-box{background:#0e1a2e;border:1px solid #1e2d45;border-radius:14px;padding:1.4rem;}
.adm-tb{display:flex;gap:8px;align-items:center;margin-bottom:.75rem;flex-wrap:wrap;}
.ql-note{font-size:.72rem;color:#64748b;margin-bottom:.75rem;}
.ql{display:flex;flex-direction:column;gap:7px;max-height:62vh;overflow-y:auto;}
.ql-item{background:#131e30;border-radius:10px;padding:.85rem 1rem;border:1px solid #1e2d45;}
.ql-top{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.ql-opts{display:flex;flex-wrap:wrap;gap:5px;margin-top:.45rem;}
.ql-o{font-size:.7rem;color:#64748b;background:#0a111e;border-radius:5px;padding:2px 8px;}
.ql-ok{background:#0d2b1e;color:#4ade80;font-weight:700;}
.btn-ed{padding:2px 9px;border-radius:6px;background:#132040;border:1px solid #1d4ed8;color:#60a5fa;font-size:.7rem;font-weight:600;cursor:pointer;}
.btn-dl{padding:2px 7px;border-radius:6px;background:#2d0a0a;border:1px solid #7f1d1d;color:#f87171;font-size:.78rem;cursor:pointer;}
.of-row{display:flex;align-items:center;gap:8px;margin-bottom:7px;}
.of-rb{width:30px;height:30px;border-radius:50%;background:#131e30;border:1.5px solid #1e2d45;color:#64748b;font-weight:700;font-size:.75rem;cursor:pointer;flex-shrink:0;transition:all .2s;display:flex;align-items:center;justify-content:center;}
.of-rb-on{background:#0d2b1e;border-color:#4ade80;color:#4ade80;}
.of-ok .fi{border-color:#4ade80;}
.imp-guide{background:#131e30;border-radius:10px;padding:1.1rem;margin-bottom:.9rem;}
.imp-fmt{background:#08111e;border-radius:7px;padding:.6rem .9rem;margin-bottom:.65rem;font-size:.76rem;overflow-x:auto;}
.imp-ex{background:#08111e;border-radius:7px;padding:.6rem .9rem;margin-bottom:.6rem;font-size:.73rem;line-height:1.85;}
.imp-ta{width:100%;background:#131e30;border:1.5px solid #1e2d45;border-radius:10px;padding:.7rem .9rem;color:#f1f5f9;font-size:.8rem;font-family:'Outfit',monospace;outline:none;resize:vertical;transition:border-color .2s;}
.imp-ta:focus{border-color:#3b82f6;}
.imp-err{background:#2d0a0a;border:1px solid #7f1d1d;color:#f87171;border-radius:8px;padding:.6rem .85rem;font-size:.78rem;margin-top:7px;}
.imp-ok{background:#0d2b1e;border:1px solid #166534;color:#4ade80;border-radius:8px;padding:.6rem .85rem;font-size:.78rem;margin-top:7px;}
.adm-box-sm{margin-top:.6rem;display:flex;flex-direction:column;gap:6px;}
`}</style>
  );
}
