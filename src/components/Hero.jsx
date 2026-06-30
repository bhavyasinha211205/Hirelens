import heron from "../assets/heron.png"; // adjust path if needed
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How does HireLens calculate ATS scores?",
      answer:
        "HireLens analyzes resumes using AI-powered semantic matching, technical skill extraction, and weighted ATS scoring to rank candidates against the job description.",
    },
    {
      question: "Can I upload multiple resumes at once?",
      answer:
        "Yes. HireLens supports uploading multiple PDF resumes simultaneously. Each resume is automatically parsed, analyzed, and ranked.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "Currently, HireLens supports PDF resumes. Support for additional document formats may be added in future updates.",
    },
    {
      question: "Can I pause or resume a job posting?",
      answer:
        "Yes. Recruiters can pause or reactivate any job description directly from the dashboard without deleting the posting.",
    },
    {
      question: "How are candidates ranked?",
      answer:
        "Candidates are ranked using ATS scores, semantic similarity, matched skills, experience, education, and project relevance.",
    },
    {
      question: "Is my recruitment data secure?",
      answer:
        "Yes. All recruiter data, resumes, and job descriptions are securely stored to ensure privacy throughout the recruitment process.",
    },
  ];
  return (
    <>
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20"
      >
        {/* Glow Effects */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#165668] rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Added grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Existing content starts */}
            <div className="max-w-4xl">
              <span className="px-4 py-2 bg-cyan-50 text-[#165668] rounded-full text-sm font-medium">
                AI-Powered Recruitment Platform
              </span>

              <h1 className="mt-8 text-6xl md:text-7xl font-bold text-slate-900 leading-tight">
                Recruit Smarter.
                <span className="text-[#165668]"> Not Harder</span>
              </h1>

              <p className="mt-6 text-xl text-slate-600 max-w-3xl">
                Create job descriptions, analyze resumes, calculate ATS scores,
                identify skill gaps, and rank candidates using intelligent AI.
              </p>

              <div className="mt-10 flex gap-4 flex-wrap">
                <Link
                  to="/features" className="bg-[#165668] hover:bg-[#124654] text-white px-8 py-4 rounded-xl font-semibold transition">
                  Get Started
                </Link>

                <Link
                  to="/guide"
                  className="border border-slate-300 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold transition"
                >
                  User's Guide
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-3xl font-bold text-[#165668]">10K+</h3>
                  <p className="text-slate-500 mt-2">Resumes Analyzed</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-3xl font-bold text-[#165668]">95%</h3>
                  <p className="text-slate-500 mt-2">ATS Accuracy</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-3xl font-bold text-[#165668]">500+</h3>
                  <p className="text-slate-500 mt-2">Recruiters</p>
                </div>
              </div>
            </div>

            {/* Added image */}
            <div className="flex justify-center">
              <img
                src={heron}
                alt="Hero"
                className="w-full max-w-xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative py-24 bg-gradient-to-br from-cyan-50 via-white to-slate-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <span className="bg-[#165668] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              WHAT WE OFFER
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-900">
              Everything Recruiters Need
            </h2>

            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              AI-powered tools built for faster decisions and better hires.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: "Create Job Description",
                desc: "Generate precise, role-ready job descriptions in seconds.",
              },
              {
                title: "Resume Analysis",
                desc: "Extract meaningful insights beyond the resume.",
              },
              {
                title: "ATS Scoring",
                desc: "Measure candidate compatibility with intelligent scoring.",
              },
              {
                title: "Skill Gap Analysis",
                desc: "Identify missing skills and uncover hidden potential.",
              },
              {
                title: "Candidate Ranking",
                desc: "Prioritize top talent with data-driven ranking.",
              },
              {
                title: "Recruiter Dashboard",
                desc: "Manage hiring workflows from a single workspace.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 p-8 rounded-3xl hover:border-[#165668] hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-4 text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ SECTION */}

      <section className="pt-16 pb-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center">
            <span className="bg-[#165668] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              FAQ
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-slate-600 text-lg">
              Everything you need to know about HireLens.
            </p>
          </div>

          <div className="mt-16 space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  openFAQ === index
                    ? "border-[#165668] shadow-xl"
                    : "border-slate-200 hover:border-[#165668]"
                }`}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left bg-white"
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    {faq.question}
                  </h3>

                  {openFAQ === index ? (
                    <ChevronUp size={26} className="text-[#165668]" />
                  ) : (
                    <ChevronDown size={26} className="text-slate-500" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ${
                    openFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-8 pb-8 text-slate-600 leading-8 text-lg">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
