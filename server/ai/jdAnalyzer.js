import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeJD = async (jobDescription) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert ATS Job Description Analyzer.

Your task is to understand the job description and extract hiring requirements exactly like a real Applicant Tracking System (ATS).

Return ONLY valid JSON.

=========================
GENERAL GUIDELINES
=========================

- This parser should work for BOTH technical and non-technical jobs.
- Extract only qualifications that are useful for evaluating candidates.
- Include:
  • Technical skills
  • Professional competencies
  • Software
  • Frameworks
  • Programming languages
  • Databases
  • Business tools
  • Certifications
  • Domain-specific skills

Do NOT include:
- Generic job responsibilities
- Personality traits
- Generic work practices
- Broad concepts
- Everyday work methodologies unless explicitly listed as hiring requirements

For example, DO NOT extract:
- Team Player
- Hard Working
- Communication
- Problem Solving
- Leadership
- Responsive Web Design
- Agile Methodologies
- Asynchronous Programming
- Critical Thinking
- Time Management

Normalize technologies:

React.js → React
Node → Node.js
JS → JavaScript
TS → TypeScript
MS Excel → Microsoft Excel
Postgres → PostgreSQL

Never return duplicate skills.

=========================
RULES
=========================

1. Mandatory Skills
- Skills without which the candidate should NOT be selected.
- Technologies explicitly required.
- Core technologies of the role.

2. Preferred Skills
- Skills that strengthen a candidate but are not compulsory.

3. Good To Have Skills
- Bonus technologies.
- Optional tools.
- Additional experience.

4. If the JD explicitly lists technologies, NEVER invent extra technologies.

5. Expand generic job titles ONLY when no technologies are mentioned.

Examples:

Frontend Developer →

Mandatory:
React
JavaScript
HTML
CSS

Preferred:
TypeScript
Redux
React Router

Good To Have:
Next.js
Docker

--------------------------

Backend Developer →

Mandatory:
Node.js
Express.js
MongoDB
REST APIs

Preferred:
JWT
Redis

Good To Have:
Docker
RabbitMQ

--------------------------

Data Analyst →

Mandatory:
Python
SQL
Excel
Pandas

Preferred:
Power BI
Tableau

Good To Have:
Machine Learning

--------------------------

HR Manager →

Mandatory:
Recruitment
Employee Relations
Payroll
HRMS

Preferred:
Performance Management
Compliance

Good To Have:
Workday
SAP SuccessFactors

=========================
Return EXACTLY this JSON
=========================

{
  "primaryRole": "",

  "mandatorySkills": [],

  "preferredSkills": [],

  "goodToHaveSkills": [],

  "experience": "",

  "education": "",

  "responsibilities": [],

  "certifications": []
}

Job Description:

${jobDescription}
`;

  const result = await model.generateContent(prompt);

  let text = result.response.text().trim();

  text = text.replace(/```json/g, "");
  text = text.replace(/```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini returned invalid JSON:");
    console.log(text);
    throw err;
  }
};
