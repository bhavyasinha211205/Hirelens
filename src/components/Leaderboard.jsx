import { useLocation, useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const candidates = location.state?.candidates || [];

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
            Candidate Leaderboard
          </h1>
          <p className="mt-3 text-slate-600">
            Ranked by AI-powered ATS scoring
          </p>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-slate-900 text-white px-6 py-4 text-sm font-semibold">
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">Candidate</div>
            <div className="col-span-2">Score</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {candidates.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-12 items-center px-6 py-5 hover:bg-slate-50 transition"
              >
                {/* Rank */}
                <div className="col-span-2 flex items-center gap-3">
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${
                      c.rank === 1
                        ? "bg-yellow-500"
                        : c.rank === 2
                          ? "bg-slate-400"
                          : c.rank === 3
                            ? "bg-orange-400"
                            : "bg-[#165668]"
                    }`}
                  >
                    {c.rank}
                  </span>

                  {c.rank === 1 && (
                    <span className="text-yellow-600 font-semibold text-sm">
                      👑 Top
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="col-span-6">
                  <button
                    onClick={() =>
                      navigate(`/candidate/${c.id}`, {
                        state: c,
                      })
                    }
                    className="text-left"
                  >
                    <h3 className="font-semibold text-slate-900 text-lg hover:text-[#165668] hover:underline transition">
                      {c.name}
                    </h3>

                    <p className="text-sm text-slate-500">AI analyzed resume</p>
                  </button>
                </div>

                {/* Score */}
                <div className="col-span-2 flex items-center gap-2">
                  <div className="w-full bg-slate-200 h-2 rounded-full">
                    <div
                      className="h-2 rounded-full bg-[#165668]"
                      style={{ width: `${c.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    {c.score}%
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => navigate(`/candidate/${c.id}`, { state: c })}
                    className="px-5 py-2 rounded-xl bg-[#165668] text-white hover:bg-[#124654] transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;