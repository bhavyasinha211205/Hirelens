import { getSemanticSimilarity } from "../services/similarityService.js";
import { normalizeSkills } from "./knowledgeNormalizer.js";

/* =====================================================
   HELPERS
===================================================== */

const getSimilarityPoints = (similarity, perSkill) => {
  if (similarity >= 0.9) return perSkill;
  if (similarity >= 0.8) return perSkill * 0.85;
  if (similarity >= 0.7) return perSkill * 0.7;
  if (similarity >= 0.6) return perSkill * 0.5;

  return 0;
};

/* =====================================================
   WEIGHTED SKILL SCORE
===================================================== */

export const calculateWeightedSkillScore = async (
  skills = [],
  maxScore,
  parsedResume,
) => {
  if (!skills.length) {
    return {
      score: 0,
      matchedSkills: [],
      missingSkills: [],
    };
  }

  const normalizedJD = {
    skills: normalizeSkills(skills),
  };

  const normalizedResume = {
    ...parsedResume,

    skills: normalizeSkills(parsedResume.skills || []),

    projects: parsedResume.projects || [],

    experience: parsedResume.experience || [],
  };

  const semanticResult = await getSemanticSimilarity(
    normalizedJD,
    normalizedResume,
  );

  let score = 0;

  const matchedSkills = [];
  const missingSkills = [];

  const perSkill = maxScore / normalizedJD.skills.length;

  for (const match of semanticResult.matches) {
    const points = getSimilarityPoints(match.similarity, perSkill);

    score += points;

    if (points > 0) {
      matchedSkills.push({
        jdSkill: match.jdSkill,

        matchedWith: match.bestMatch,

        similarity: match.similarity,

        pointsAwarded: Number(points.toFixed(2)),

        topMatches: match.topMatches,
      });
    } else {
      missingSkills.push(match.jdSkill);
    }
  }

  return {
    score,

    matchedSkills,

    missingSkills,
  };
};

/* =====================================================
   EXPERIENCE
===================================================== */

export const calculateExperienceScore = (
  jdExperience = "",
  resumeExperience = [],
) => {
  const requiredYears = parseInt(jdExperience.match(/\d+/)?.[0] || 0);

  if (requiredYears === 0) return 20;

  const candidateYears = resumeExperience.length;

  return Math.min((candidateYears / requiredYears) * 20, 20);
};

/* =====================================================
   EDUCATION
===================================================== */

export const calculateEducationScore = (
  jdEducation = "",
  resumeEducation = [],
) => {
  if (!jdEducation) return 10;

  const found = resumeEducation.some((edu) =>
    edu.degree.toLowerCase().includes(jdEducation.toLowerCase()),
  );

  return found ? 10 : 0;
};

/* =====================================================
   PROJECTS
===================================================== */

export const calculateProjectScore = (jdSkills = [], projects = []) => {
  if (!projects.length || !jdSkills.length) return 0;

  const normalizedJD = normalizeSkills(jdSkills);

  let matched = 0;

  for (const project of projects) {
    for (const tech of project.tech_stack || []) {
      const normalizedTech = normalizeSkills([tech])[0];

      if (normalizedJD.includes(normalizedTech)) {
        matched++;
      }
    }
  }

  return Math.min((matched / normalizedJD.length) * 15, 15);
};
/* =====================================================
   FINAL ATS SCORE
===================================================== */

export const calculateATSScore = async (
  parsedJD,
  parsedResume
) => {

  /* -----------------------------
     Mandatory Skills (35)
  ------------------------------ */

  const mandatoryResult =
    await calculateWeightedSkillScore(
      parsedJD.mandatorySkills || [],
      35,
      parsedResume
    );

  /* -----------------------------
     Preferred Skills (15)
  ------------------------------ */

  const preferredResult =
    await calculateWeightedSkillScore(
      parsedJD.preferredSkills || [],
      15,
      parsedResume
    );

  /* -----------------------------
     Good To Have (5)
  ------------------------------ */

  const goodToHaveResult =
    await calculateWeightedSkillScore(
      parsedJD.goodToHaveSkills || [],
      5,
      parsedResume
    );

  /* -----------------------------
     Experience (20)
  ------------------------------ */

  const experienceScore =
    calculateExperienceScore(
      parsedJD.experience,
      parsedResume.experience
    );

  /* -----------------------------
     Education (10)
  ------------------------------ */

  const educationScore =
    calculateEducationScore(
      parsedJD.education,
      parsedResume.education
    );

  /* -----------------------------
     Projects (15)
  ------------------------------ */

  const allSkills = [

    ...(parsedJD.mandatorySkills || []),

    ...(parsedJD.preferredSkills || []),

    ...(parsedJD.goodToHaveSkills || [])

  ];

  const projectScore =
    calculateProjectScore(
      allSkills,
      parsedResume.projects
    );

  /* -----------------------------
     Total
  ------------------------------ */

  const totalScore =

    mandatoryResult.score +

    preferredResult.score +

    goodToHaveResult.score +

    experienceScore +

    educationScore +

    projectScore;

  return {

    atsScore: Math.round(totalScore),

    breakdown: {

      mandatorySkills:
        Math.round(mandatoryResult.score),

      preferredSkills:
        Math.round(preferredResult.score),

      goodToHave:
        Math.round(goodToHaveResult.score),

      experience:
        Math.round(experienceScore),

      education:
        Math.round(educationScore),

      projects:
        Math.round(projectScore)

    },

    matchedSkills: [

      ...mandatoryResult.matchedSkills,

      ...preferredResult.matchedSkills,

      ...goodToHaveResult.matchedSkills

    ],

    missingSkills: [

      ...mandatoryResult.missingSkills,

      ...preferredResult.missingSkills,

      ...goodToHaveResult.missingSkills

    ]

  };

};