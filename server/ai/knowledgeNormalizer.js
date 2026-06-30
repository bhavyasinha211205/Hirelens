const skillDictionary = {
  // Languages
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",

  // Backend
  node: "Node.js",
  nodejs: "Node.js",
  "node.js": "Node.js",

  express: "Express.js",
  expressjs: "Express.js",
  "express.js": "Express.js",

  // Frontend
  react: "React",
  reactjs: "React",
  "react.js": "React",

  next: "Next.js",
  nextjs: "Next.js",

  "redux toolkit": "Redux",
  redux: "Redux",

  // Databases
  mongodb: "MongoDB",
  mongo: "MongoDB",

  mysql: "MySQL",

  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",

  // AI
  llm: "Large Language Models",
  llms: "Large Language Models",

  rag: "Retrieval Augmented Generation",

  "gen ai": "Generative AI",
  genai: "Generative AI",

  // Cloud
  aws: "Amazon Web Services",
  gcp: "Google Cloud Platform",

  // Misc
  rest: "REST APIs",
  "rest api": "REST APIs",
  "rest apis": "REST APIs",

  oop: "Object Oriented Programming",
  oops: "Object Oriented Programming",

  ml: "Machine Learning",

  ai: "Artificial Intelligence",

  nlp: "Natural Language Processing",

  cv: "Computer Vision",
};

export const normalizeSkills = (skills = []) => {
  const normalized = [];

  skills.forEach((skill) => {
    const lower = skill.toLowerCase().trim();

    if (skillDictionary[lower]) {
      normalized.push(skillDictionary[lower]);
    } else {
      normalized.push(skill);
    }
  });

  return [...new Set(normalized)];
};
