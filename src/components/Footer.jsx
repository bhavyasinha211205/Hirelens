const Footer = () => {
  return (
    <footer className="bg-[#124654] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Hire<span className="text-cyan-300">Lens</span>
            </h2>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              AI-powered resume analysis and ATS scoring to help recruiters
              find the best candidates faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-cyan-300 mb-3">
              Product
            </h3>

            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>

              <li>
                <a href="#analyzer" className="hover:text-white transition-colors">
                  Resume Analyzer
                </a>
              </li>

              <li>
                <a href="#ats" className="hover:text-white transition-colors">
                  ATS Score
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-cyan-300 mb-3">
              Company
            </h3>

            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>

              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-cyan-300 mb-3">
              Connect
            </h3>

            <ul className="space-y-2">
              <li>hello@resumeai.com</li>

              <li>
                <a href="/" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#165668] mt-10 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;