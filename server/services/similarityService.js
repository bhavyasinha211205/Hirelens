import axios from "axios";

export const getSemanticSimilarity = async (parsedJD, parsedResume) => {
  try {
    const response = await axios.post(`${process.env.AI_SERVICE}/similarity`, {
      parsedJD,
      parsedResume,
    });

    return response.data;
  } catch (err) {
    console.error("Semantic Matching Error");

    console.error(err.message);

    return {
      matches: [],
    };
  }
};
