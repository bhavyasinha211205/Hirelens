
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Feature = ({ openChat }) => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 20) {
      alert("Maximum 20 resumes allowed.");
      return;
    }

    await uploadResumes(files);
  };

  const handleSubmitJD = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!jobTitle.trim()) {
      alert("Please enter a Job Title.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a Job Description.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recruiterId: user.id,
            title: jobTitle,
            description: jobDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Failed to save JD");
        return;
      }

      localStorage.setItem("currentJobId", data._id);

      alert("JD saved successfully!");

      setJobTitle("");
      setJobDescription("");
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  const uploadResumes = async (files) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const jobId = localStorage.getItem("currentJobId");

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!jobId) {
      alert("Please create a Job Description first.");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one resume.");
      return;
    }

    const formData = new FormData();

    formData.append("recruiterId", user.id);
    formData.append("jobId", jobId);

    files.forEach((file) => {
      formData.append("resumes", file);
    });

    try {
      setUploading(true);

      const response = await fetch(
        "http://localhost:5000/api/resumes/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Upload failed");
        return;
      }

      setResumes(data);
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setUploading(false);
    }
  };

  const deleteResume = async (resumeId) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/resumes/${resumeId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg);
        return;
      }

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== resumeId)
      );
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  const handleAnalyze = async () => {
    const jobId = localStorage.getItem("currentJobId");

    if (!jobId) {
      alert("Please create a Job Description first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}/analyze`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Analysis failed");
        return;
      }

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
      alert("Server Error");
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900">
            Resume Analyzer
          </h1>

          <p className="mt-4 text-slate-600 text-lg">
            Upload up to 20 resumes and rank candidates instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Job Description */}

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-[#165668] mb-6">
              Create Job Description
            </h2>

            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full mb-5 p-4 border border-slate-300 rounded-2xl outline-none focus:border-[#165668]"
            />

            <textarea
              rows="15"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the Job Description here..."
              className="w-full p-5 border border-slate-300 rounded-2xl outline-none focus:border-[#165668]"
            />

            <div className="mt-6 flex items-center justify-between">

              <button
                onClick={handleSubmitJD}
                className="bg-[#165668] hover:bg-[#124654] text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Submit JD
              </button>

              <div className="relative group">

                <button
                  onClick={openChat}
                  className="w-14 h-14 rounded-full bg-[#165668] text-white text-2xl shadow-lg hover:scale-110 transition"
                >
                  🤖
                </button>

                <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transition bg-slate-900 text-white text-sm px-3 py-2 rounded-xl whitespace-nowrap pointer-events-none">
                  Unable to write the JD?
                  <br />
                  Use the AI Assistant
                </div>

              </div>

            </div>
          </div>

          {/* Upload */}

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">

            <h2 className="text-2xl font-bold text-[#165668] mb-6">
              Upload Resumes
            </h2>

            <div className="border-2 border-dashed border-[#165668]/40 bg-[#F7FCFD] rounded-3xl p-10 text-center">

              <input
                id="resumeUpload"
                type="file"
                multiple
                accept=".pdf"
                className="hidden"
                onChange={handleFileUpload}
              />

              <label
                htmlFor="resumeUpload"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition shadow-md cursor-pointer ${
                  uploading
                    ? "bg-gray-400 text-white"
                    : "bg-[#165668] hover:bg-[#124654] text-white"
                }`}
              >
                {uploading ? "Uploading..." : "📂 Choose PDF Resumes"}
              </label>

              <p className="mt-5 text-slate-500">
                Upload up to <span className="font-semibold">20 PDF resumes</span>
              </p>

              <p className="mt-2 text-[#165668] font-semibold">
                {resumes.length} Resume(s)
              </p>

              <div className="mt-6 max-h-64 overflow-y-auto space-y-3">

                {resumes.map((resume) => (

                  <div
                    key={resume._id}
                    className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">
                        📄
                      </span>

                      <div className="text-left">

                        <p className="font-medium text-slate-800">
                          {resume.fileName}
                        </p>

                        <p className="text-green-600 text-sm font-medium">
                          ✓ Uploaded
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() => deleteResume(resume._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>

                ))}

              </div>

            </div>

            <button
              onClick={handleAnalyze}
              className="w-full mt-8 bg-[#B90775] hover:bg-[#98065f] text-white py-4 rounded-xl font-semibold transition"
            >
              Analyze & View Leaderboard
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Feature;


