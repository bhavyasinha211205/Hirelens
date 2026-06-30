import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import loginImg from "../assets/login.jpeg";
import jdImg from "../assets/jdimg.jpeg";
import resumeImg from "../assets/resumeimg.jpeg";
const Guide = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const steps = [
    "Account",
    "Job Description",
    "Upload",
    "Analysis",
    "Leaderboard",
    "Dashboard",
  ];

  return (
    <div className="bg-white">
      {/* HERO */}

      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#165668]/10 rounded-full blur-3xl"></div>

        <div
          className="max-w-6xl mx-auto px-6 text-center relative z-10"
          data-aos="fade-up"
        >
          <span className="inline-block bg-[#165668] text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
            USER GUIDE
          </span>

          <h1 className="mt-8 text-6xl font-bold text-slate-900 leading-tight">
            Learn How To Use
            <span className="text-[#165668]"> HireLens</span>
          </h1>

          <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto leading-9">
            HireLens streamlines the recruitment process from creating job
            descriptions to identifying the best candidates through intelligent
            resume analysis.
          </p>
        </div>
      </section>

      {/* TIMELINE */}

      <section className="pb-24">
        <div
          className="max-w-6xl mx-auto px-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 relative"
                >
                  <div className="w-14 h-14 rounded-full bg-[#165668] text-white flex items-center justify-center text-lg font-bold shadow-md">
                    {index + 1}
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700 text-center">
                    {step}
                  </p>

                  {index !== steps.length - 1 && (
                    <div className="absolute top-7 left-1/2 w-full h-[3px] bg-slate-200 -z-10">
                      <div className="h-full bg-[#165668] w-0 animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-5xl font-bold text-slate-900">
            Recruitment Made Simple
          </h2>

          <p className="mt-8 text-lg text-slate-600 leading-9">
            HireLens combines intelligent resume analysis, ATS scoring,
            candidate ranking, and recruitment analytics into one unified
            platform. Follow the guide below to understand the complete hiring
            workflow.
          </p>
        </div>
      </section>
      {/* =========================
    STEP 1
========================= */}

      <section className="py-24 bg-[#F7FCFD]">
        <div
          className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center"
          data-aos="fade-right"
        >
          <div>
            <span className="text-[#165668] font-bold text-lg">STEP 1</span>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Create an Account
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Sign up as a recruiter to access your personalized recruitment
              workspace. Once registered, you can securely log in and manage
              every stage of the hiring process from a single platform.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <p>Secure Recruiter Authentication</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <p>Personal Dashboard</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <p>Protected Resume Storage</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-5">
            <img
              src={loginImg}
              alt="Login"
              className="rounded-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================
    STEP 2
========================= */}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <img
            src={jdImg}
            alt="Job Description"
            className="w-full rounded-2xl object-cover"
          />

          <div className="order-1 lg:order-2" data-aos="fade-left">
            <span className="text-[#165668] font-bold text-lg">STEP 2</span>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Create a Job Description
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Enter the job title and description for the position you want to
              hire for. HireLens intelligently extracts key hiring requirements
              to prepare the recruitment workflow.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <div className="bg-[#F7FCFD] rounded-2xl p-5 border">
                <h4 className="font-semibold text-[#165668]">
                  Required Skills
                </h4>
              </div>

              <div className="bg-[#F7FCFD] rounded-2xl p-5 border">
                <h4 className="font-semibold text-[#165668]">Experience</h4>
              </div>

              <div className="bg-[#F7FCFD] rounded-2xl p-5 border">
                <h4 className="font-semibold text-[#165668]">Education</h4>
              </div>

              <div className="bg-[#F7FCFD] rounded-2xl p-5 border">
                <h4 className="font-semibold text-[#165668]">
                  Responsibilities
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
    STEP 3
========================= */}

      <section className="py-24 bg-[#F7FCFD]">
        <div
          className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center"
          data-aos="fade-right"
        >
          <div>
            <span className="text-[#165668] font-bold text-lg">STEP 3</span>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Upload Candidate Resumes
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Upload multiple PDF resumes at once. HireLens automatically
              extracts candidate information, organizes resumes, and prepares
              them for AI-based evaluation.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#165668] text-white flex items-center justify-center font-bold">
                  20
                </div>

                <p className="text-slate-700">Upload up to 20 PDF resumes</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#165668] text-white flex items-center justify-center">
                  ✓
                </div>

                <p className="text-slate-700">Automatic resume parsing</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#165668] text-white flex items-center justify-center">
                  ✓
                </div>

                <p className="text-slate-700">
                  Candidate profiles created instantly
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-5 hover:shadow-2xl transition duration-500 hover:-translate-y-2">
  <img
    src={resumeImg}
    alt="Resume Upload"
    className="w-full rounded-2xl object-cover"
  />
</div>
        </div>
      </section>
      
    </div>
  );
};

export default Guide;
