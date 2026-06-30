import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (resumeText) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert ATS Resume Parser.

Your goal is to understand the resume like an experienced recruiter.

IMPORTANT:

Do NOT simply copy the skills section.

Infer skills from:

- Projects
- Internships
- Work Experience
- Responsibilities
- Technologies Mentioned
- Certifications

Examples:

If a project says

"Built scalable REST APIs using Express.js"

Infer:

- REST APIs
- Express.js
- Node.js
- Backend Development
- API Development

-----------------------------------------

If a project says

"Netflix Clone using React"

Infer:

- React
- JavaScript
- Frontend Development
- Component-Based Architecture
- State Management

-----------------------------------------

If experience says

"Developed dashboards using Tableau and Power BI"

Infer:

- Tableau
- Power BI
- Data Visualization
- Dashboard Development

-----------------------------------------

If experience says

"Built Machine Learning models using Scikit-learn"

Infer:

- Machine Learning
- Scikit-learn
- Python
- Model Training
- Data Preprocessing

-----------------------------------------

Instructions:

1. Extract personal information.
2. Extract education.
3. Extract experience.
4. Extract projects.
5. Expand technologies into related technical skills.
6. Merge duplicate skills.
7. Return ONLY valid JSON.
8. Do NOT wrap JSON inside markdown.

Return exactly this JSON format:

{
  "name": "",
  "email": "",
  "phone": "",

  "skills": [],

  "education": [
    {
      "degree": "",
      "college": "",
      "cgpa": "",
      "year": ""
    }
  ],

  "experience": [
    {
      "company": "",
      "role": "",
      "duration": "",
      "skills_used": []
    }
  ],

  "projects": [
    {
      "title": "",
      "tech_stack": [],
      "description": ""
    }
  ],

  "achievements": []
}

Resume:

${resumeText}
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
