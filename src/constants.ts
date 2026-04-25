export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface Question {
  text: string;
  options: string[];
  answer: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  quizzes: Quiz[];
}

export const MODULES: Module[] = [
  {
    id: "grammar",
    title: "Advanced Grammar",
    icon: "🖋️",
    description: "First-year university level syntax, morphology, mechanics, and style.",
    lessons: [
      {
        id: "modal-verbs",
        title: "Modal Verbs",
        content: "Modal verbs like 'can', 'could', 'may', 'might', 'must', 'shall', 'should', 'will', and 'would' express possibility, necessity, or permission.\n\nExample: You must study hard for the exam."
      },
      {
        id: "past-perfect",
        title: "Past Perfect Tenses",
        content: "The Past Perfect is used to show that an action happened before another action in the past. Structure: had + past participle.\n\nExample: When I arrived at the station, the train had already left."
      }
    ],
    quizzes: [
      {
        id: "gram_1",
        title: "Morphology & Parts of Speech",
        questions: [
          { text: "In the sentence 'Running is excellent cardiovascular exercise,' what part of speech is the word 'Running'?", options: ["Present participle", "Gerund (Noun)", "Action verb", "Adjective"], answer: 1 },
          { text: "Which of the following sentences contains an intransitive verb?", options: ["She threw the ball.", "He built a house.", "The sun rises in the east.", "They painted the wall."], answer: 2 },
          { text: "Identify the subordinating conjunction in this sentence: 'We will stay indoors until the storm passes.'", options: ["will", "indoors", "until", "passes"], answer: 2 },
          { text: "What is the function of the word 'surprisingly' in the phrase 'surprisingly fast runner'?", options: ["It modifies the noun 'runner'.", "It acts as a preposition.", "It modifies the adjective 'fast'.", "It functions as a linking verb."], answer: 2 },
          { text: "In linguistics, what do we call a morpheme that cannot stand alone as an independent word, such as the 'un-' in 'unhappy'?", options: ["Free morpheme", "Bound morpheme", "Root word", "Lexeme"], answer: 1 }
        ]
      },
      {
        id: "gram_2",
        title: "Sentence Structure & Syntax",
        questions: [
          { text: "Which of the following is the best example of a 'comma splice'?", options: ["Because he was tired, he went to bed.", "I like apples, but I prefer oranges.", "She loves reading, she visits the library often.", "Walking in the park, I saw a rare bird."], answer: 2 },
          { text: "A sentence containing one independent clause and at least one dependent clause is known as a:", options: ["Simple sentence", "Compound sentence", "Complex sentence", "Compound-complex sentence"], answer: 2 },
          { text: "Identify the direct object in the following sentence: 'The professor handed the students their syllabus.'", options: ["The professor", "handed", "the students", "their syllabus"], answer: 3 },
          { text: "Which of the following effectively corrects a run-on sentence (fused sentence)?", options: ["Adding a comma between the clauses.", "Inserting a semicolon between the two independent clauses.", "Removing the subject from the second clause.", "Placing a dependent marker at the end."], answer: 1 },
          { text: "What syntactic error is present in this sentence: 'Looking out the window, the trees were swaying violently.'?", options: ["Subject-verb agreement error", "Dangling modifier", "Misplaced punctuation", "Faulty parallelism"], answer: 1 }
        ]
      }
    ]
  },
  {
    id: "culture",
    title: "Computing & Internet History",
    icon: "🌐",
    description: "From early mechanical calculators to ARPANET and the World Wide Web.",
    lessons: [],
    quizzes: [
      {
        id: "cult_1",
        title: "Early Theoretical Computing",
        questions: [
          { text: "Charles Babbage designed a massive, steam-powered mechanical computer in 1837. What was it called?", options: ["The Difference Engine", "The Antikythera Mechanism", "The Analytical Engine", "The Turing Machine"], answer: 2 },
          { text: "Who is widely recognized as the first computer programmer for her work on Babbage's machine?", options: ["Grace Hopper", "Katherine Johnson", "Margaret Hamilton", "Ada Lovelace"], answer: 3 },
          { text: "The Antikythera mechanism, an ancient Greek analog computer, was primarily used for what?", options: ["Calculating tax rates", "Predicting astronomical positions", "Navigating the open ocean", "Translating languages"], answer: 1 },
          { text: "What was the name of the electromechanical machine developed by Alan Turing to break the German Enigma code?", options: ["The Bombe", "Colossus", "ENIAC", "The Oracle"], answer: 0 },
          { text: "What conceptual mathematical machine reads and writes symbols on an infinite tape, forming the basis of modern computation?", options: ["The Von Neumann Architecture", "The Turing Machine", "The Babbage Engine", "The Quantum Simulator"], answer: 1 }
        ]
      }
    ]
  },
  {
    id: "literature",
    title: "Literature & Language",
    icon: "📚",
    description: "EBSCO-sourced Poetics, Prose, Drama, and Literary Devices.",
    lessons: [],
    quizzes: [
      {
        id: "lit_1",
        title: "Literary Terms & Genres",
        questions: [
          { text: "Which term describes a narrative poem that is originally meant to be sung?", options: ["Sonnet", "Haiku", "Ballad", "Elegy"], answer: 2 },
          { text: "In literature, what does 'bildungsroman' refer to?", options: ["A tragic ending", "A coming-of-age story", "A story within a story", "A strictly historical account"], answer: 1 },
          { text: "What literary device assigns human qualities to non-human entities?", options: ["Metaphor", "Simile", "Personification", "Alliteration"], answer: 2 },
          { text: "A 'soliloquy' is primarily used in which literary form?", options: ["Lyric Poetry", "Prose Fiction", "Drama", "Epic Poetry"], answer: 2 },
          { text: "What is 'enjambment' in poetry?", options: ["Rhyming at the end of lines", "The continuation of a sentence without a pause beyond the end of a line", "A harsh, discordant mixture of sounds", "A sudden plot twist"], answer: 1 }
        ]
      }
    ]
  },
  {
    id: "civilization",
    title: "British & US Civilization",
    icon: "🏛️",
    description: "Comparative cultural studies, historic texts, and governmental foundations.",
    lessons: [],
    quizzes: [
      {
        id: "civ_1",
        title: "Foundations of American Gov",
        questions: [
          { text: "The first ten amendments to the US Constitution are known as what?", options: ["The Articles of Confederation", "The Bill of Rights", "The Magna Carta", "The Federalist Papers"], answer: 1 },
          { text: "Which branch of the US Government is responsible for interpreting laws?", options: ["Executive", "Judicial", "Legislative", "Administrative"], answer: 1 },
          { text: "Who was the primary author of the Declaration of Independence?", options: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"], answer: 2 },
          { text: "What was the purpose of the Federalist Papers?", options: ["To declare independence from Britain", "To urge the ratification of the US Constitution", "To outline the Bill of Rights", "To free the slaves"], answer: 1 },
          { text: "How many senators represent each US State?", options: ["Depends on population", "One", "Two", "Four"], answer: 2 }
        ]
      }
    ]
  },
  {
    id: "geography",
    title: "Topography & Geography",
    icon: "🌍",
    description: "USGS topography concepts, Seterra map reading, and physical geography.",
    lessons: [],
    quizzes: [
      {
        id: "geo_1",
        title: "Map Reading & Cartography",
        questions: [
          { text: "On a topographic map, what do contour lines represent?", options: ["Population density", "Temperature changes", "Points of equal elevation", "Political borders"], answer: 2 },
          { text: "If contour lines are very close together, what does this indicate about the terrain?", options: ["It is a flat plain", "It is a steep slope", "It is a body of water", "It is a dense forest"], answer: 1 },
          { text: "What does the acronym GIS stand for in cartography?", options: ["Global Internet Satellites", "Geographic Information Systems", "Geological Indexing Software", "Global Indicator Systems"], answer: 1 },
          { text: "The prime meridian passes through an observatory located in which city?", options: ["Paris", "Washington D.C.", "Greenwich", "Rome"], answer: 2 },
          { text: "What is the term for a map projection that accurately preserves shape but severely distorts size at the poles?", options: ["Peters Projection", "Mercator Projection", "Robinson Projection", "Azimuthal Projection"], answer: 1 }
        ]
      }
    ]
  },
  {
    id: "science",
    title: "History of Science",
    icon: "🔬",
    description: "Scientific revolutions, historic breakthroughs, and great inventors.",
    lessons: [],
    quizzes: [
      {
        id: "sci_1",
        title: "The Scientific Revolution",
        questions: [
          { text: "Who proposed the heliocentric model of the universe, placing the sun at the center?", options: ["Ptolemy", "Galileo", "Copernicus", "Kepler"], answer: 2 },
          { text: "Which scientist famously formulated the laws of motion and universal gravitation?", options: ["Isaac Newton", "Albert Einstein", "Robert Hooke", "Rene Descartes"], answer: 0 },
          { text: "What tool did Galileo dramatically improve to observe the moons of Jupiter?", options: ["Microscope", "Astrolabe", "Telescope", "Barometer"], answer: 2 },
          { text: "Who is considered the 'father of modern chemistry' and authored 'The Sceptical Chymist'?", options: ["Antoine Lavoisier", "Dmitri Mendeleev", "Robert Boyle", "John Dalton"], answer: 2 },
          { text: "Which physician revolutionized the study of anatomy with his book 'De humani corporis fabrica' in 1543?", options: ["Hippocrates", "Galen", "Andreas Vesalius", "William Harvey"], answer: 2 }
        ]
      }
    ]
  }
];
