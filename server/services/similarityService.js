import axios from "axios";

export const getSemanticSimilarity = async (parsedJD, parsedResume) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/similarity", {
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
