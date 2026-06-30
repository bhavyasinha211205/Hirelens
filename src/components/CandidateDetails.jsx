import { useLocation, useParams } from "react-router-dom";

const CandidateDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const candidate = location.state;

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        <h2 className="text-2xl font-bold">No Candidate Data Found</h2>
      </div>
    );
  }

  const score = candidate.score || 0;

  const recommendation = () => {
    if (score >= 85)
      return {
        text: "Highly Recommended",
        color: "text-green-600",
      };

    if (score >= 70)
      return {
        text: "Recommended",
        color: "text-yellow-500",
      };

    if (score >= 55)
      return {
        text: "Consider",
        color: "text-orange-500",
      };

    return {
      text: "Not Recommended",
      color: "text-red-500",
    };
  };

  const rec = recommendation();

  return (
    <section className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="bg-white rounded-3xl border shadow-lg p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                {candidate.name}
              </h1>

              <p className="text-slate-500 mt-2">{candidate.email}</p>

              <p className="mt-5 text-lg font-semibold">
                Recommendation :
                <span className={`ml-2 ${rec.color}`}>{rec.text}</span>
              </p>
            </div>

            <div className="relative w-44 h-44">
              <svg className="w-44 h-44 -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="76"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />

                <circle
                  cx="88"
                  cy="88"
                  r="76"
                  stroke={
                    score >= 85
                      ? "#16a34a"
                      : score >= 70
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="477"
                  strokeDashoffset={477 - (477 * score) / 100}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-[#165668]">
                  {score}%
                </span>

                <span className="text-slate-500">ATS Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* ATS Breakdown */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl border shadow p-6">
            <h2 className="text-2xl font-bold text-[#165668] mb-5">
              ATS Breakdown
            </h2>

            {Object.entries(candidate.breakdown).map(([key, value]) => (
              <div key={key} className="mb-5">
                <div className="flex justify-between mb-2">
                  <span className="capitalize font-medium">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>

                  <span className="font-bold">{value}</span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-[#165668] h-2 rounded-full"
                    style={{
                      width: `${Math.min(value * 5, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border shadow p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-5">
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {candidate.missingSkills.length ? (
                candidate.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-green-600 font-medium">
                  No missing skills 🎉
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Matched Skills */}
        <div className="mt-8 bg-white rounded-3xl border shadow p-6">
          <h2 className="text-2xl font-bold text-[#165668] mb-6">
            Skill Matching Analysis
          </h2>

          <div className="space-y-6">
            {candidate.matchedSkills.map((skill, index) => {
              const percent = Math.round(skill.similarity * 100);

              return (
                <div
                  key={index}
                  className="border rounded-2xl p-5 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        {skill.jdSkill}
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Matched with{" "}
                        <span className="font-semibold text-[#165668]">
                          {skill.matchedWith}
                        </span>
                      </p>
                    </div>

                    <span className="text-xl font-bold text-[#165668]">
                      {percent}%
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500

                        ${
                          percent >= 90
                            ? "bg-green-500"
                            : percent >= 80
                              ? "bg-emerald-500"
                              : percent >= 70
                                ? "bg-yellow-400"
                                : "bg-red-400"
                        }`}
                        style={{
                          width: `${percent}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold

                      ${
                        percent >= 90
                          ? "bg-green-100 text-green-700"
                          : percent >= 80
                            ? "bg-emerald-100 text-emerald-700"
                            : percent >= 70
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {percent >= 90
                        ? "Excellent Match"
                        : percent >= 80
                          ? "Strong Match"
                          : percent >= 70
                            ? "Partial Match"
                            : "Weak Match"}
                    </span>

                    <span className="text-sm font-medium text-slate-500">
                      {skill.pointsAwarded.toFixed(1)} pts
                    </span>
                  </div>

                  {skill.topMatches && skill.topMatches.length > 1 && (
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-slate-600 mb-3">
                        Other Similar Matches
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {skill.topMatches.slice(1).map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-2 rounded-full bg-slate-100 text-slate-700 text-xs"
                          >
                            {item.text} ({Math.round(item.similarity * 100)}
                            %)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Grid */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Education */}

          <div className="bg-white rounded-3xl border shadow p-6">
            <h2 className="text-2xl font-bold text-[#165668] mb-5">
              Education
            </h2>

            <div className="space-y-5">
              {candidate.education?.map((edu, index) => (
                <div key={index} className="border-b last:border-none pb-4">
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>

                  <p className="text-slate-500">{edu.college}</p>

                  <p className="text-sm text-slate-400 mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}

          <div className="bg-white rounded-3xl border shadow p-6">
            <h2 className="text-2xl font-bold text-[#165668] mb-5">
              Experience
            </h2>

            <div className="space-y-5">
              {candidate.experience?.map((exp, index) => (
                <div key={index} className="border-b last:border-none pb-4">
                  <h3 className="font-semibold text-lg">{exp.role}</h3>

                  <p className="text-slate-500">{exp.company}</p>

                  <p className="text-sm text-slate-400">{exp.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateDetails;