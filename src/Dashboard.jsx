import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Briefcase,
  FileText,
  PauseCircle,
  PlayCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

    const [showAll, setShowAll] = useState(false);
    const [hovered, setHovered] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/dashboard/${user.id}`,
      );

      const data = await response.json();

      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (jobId, status) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/jobs/${jobId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        },
      );

      if (!response.ok) {
        alert("Failed to update status.");
        return;
      }

      fetchDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  const openLeaderboard = async (jobId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/jobs/${jobId}/analyze`,
        {
          method: "POST",
        },
      );

      const data = await response.json();

      const candidates = data.map((candidate, index) => ({
        ...candidate,
        rank: index + 1,
      }));

      navigate("/leaderboard", {
        state: {
          candidates,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-[#165668] font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const activityData = [
    {
      month: "Jan",
      value: 12,
    },
    {
      month: "Feb",
      value: 18,
    },
    {
      month: "Mar",
      value: 10,
    },
    {
      month: "Apr",
      value: 25,
    },
    {
      month: "May",
      value: 17,
    },
    {
      month: "Jun",
      value: dashboard.totalResumes,
    },
  ];

  const totalJobs = dashboard.totalJobs;

  const radius = 105;
  const semiCircumference = Math.PI * radius;

  const activePercent =
    totalJobs === 0 ? 0 : (dashboard.activeJobs / totalJobs) * 100;

  const pausedPercent =
    totalJobs === 0 ? 0 : (dashboard.pausedJobs / totalJobs) * 100;

  const activeLength = (activePercent / 100) * semiCircumference;
  const pausedLength = (pausedPercent / 100) * semiCircumference;
  
  

  const displayedJobs = showAll
    ? dashboard.recentJobs
    : dashboard.recentJobs.slice(0, 3);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-slate-500 text-lg">
            Here's an overview of your hiring activity.
          </p>
        </div>

        {/* Graph + Ring */}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activity Graph */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F4F7] flex items-center justify-center">
                <Briefcase size={24} className="text-[#165668]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Hiring Activity
                </h2>

                <p className="text-slate-500">Monthly hiring trend</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorHire" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#165668" stopOpacity={0.4} />

                    <stop offset="95%" stopColor="#165668" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis dataKey="month" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#165668"
                  strokeWidth={4}
                  fill="url(#colorHire)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* JD Status Ring */}

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              JD Status
            </h2>

            <div className="relative w-56 h-40 flex justify-center">
              <svg width="300" height="170" viewBox="0 0 300 170">
                {/* Background */}
                <path
                  d="M 30 140 A 120 120 0 0 1 270 140"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="16"
                  strokeLinecap="round"
                  pathLength={semiCircumference}
                />

                {/* Active */}
                <path
                  d="M 30 140 A 120 120 0 0 1 270 140"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth={hovered === "active" ? 20 : 16}
                  strokeLinecap="round"
                  pathLength={semiCircumference}
                  strokeDasharray={`${activeLength} ${semiCircumference}`}
                />

                {/* Paused */}
                <path
                  d="M 30 140 A 120 120 0 0 1 270 140"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth={hovered === "paused" ? 20 : 16}
                  strokeLinecap="round"
                  pathLength={semiCircumference}
                  strokeDasharray={`${pausedLength} ${semiCircumference}`}
                  strokeDashoffset={-activeLength}
                />
              </svg>

              <div
                className="absolute left-1/2 flex flex-col items-center"
                style={{
                  top: "112px",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h1 className="text-[38px] font-extrabold leading-none text-[#165668]">
                  {Math.round(activePercent)}%
                </h1>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  Active Jobs
                </p>
              </div>
            </div>

            <div className="mt-10 w-full space-y-4">
              <div
                onMouseEnter={() => setHovered("active")}
                onMouseLeave={() => setHovered(null)}
                className="flex justify-between cursor-pointer rounded-xl px-3 py-2 transition hover:bg-green-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span className="font-medium text-slate-700">Active</span>
                </div>

                <span className="font-bold">{dashboard.activeJobs}</span>
              </div>

              <div
                onMouseEnter={() => setHovered("paused")}
                onMouseLeave={() => setHovered(null)}
                className="flex justify-between cursor-pointer rounded-xl px-3 py-2 transition hover:bg-red-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500" />

                  <span className="font-medium text-slate-700">Paused</span>
                </div>

                <span className="font-bold">{dashboard.pausedJobs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs */}

        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Recent Job Descriptions
            </h2>

            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 text-[#165668] font-semibold hover:underline"
            >
              {showAll ? "Show Less" : "View More"}

              {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          <div className="space-y-6">
            {displayedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left */}

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#E6F4F7] flex items-center justify-center">
                      <FileText size={28} className="text-[#165668]" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-5 mt-3 text-slate-500">
                        <span>📄 {job.resumeCount} Resume(s)</span>

                        <span>
                          📅 {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-4">
                        {job.status === "active" && (
                          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                            🟢 Active
                          </span>
                        )}

                        {job.status === "paused" && (
                          <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                            🟡 Paused
                          </span>
                        )}

                        {job.status === "closed" && (
                          <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">
                            🔴 Closed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right */}

                  <div className="flex gap-4">
                    <button
                      onClick={() => openLeaderboard(job._id)}
                      className="px-6 py-3 rounded-xl bg-[#165668] hover:bg-[#124654] text-white font-semibold transition"
                    >
                      Leaderboard
                    </button>

                    {job.status === "active" ? (
                      <button
                        onClick={() => updateStatus(job._id, "paused")}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
                      >
                        <PauseCircle size={18} />
                        Pause
                      </button>
                    ) : (
                      <button
                        onClick={() => updateStatus(job._id, "active")}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                      >
                        <PlayCircle size={18} />
                        Resume
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;