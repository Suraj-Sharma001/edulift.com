import React from "react"
import {Github, Linkedin, Mail, Instagram} from 'lucide-react'

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-[#232946] text-[#fffffe]">
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid md:grid-col-2 gap-8">
            {/* About Aother Section */}
            <div className="bg-[#121629] rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#eebbc3]">
                About The Author
              </h2>
              <div className="fext items-start">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-[#b8c1ec] flex items-centre justify-center text-[#232946] text-3xl font-bold">
                    SS
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-medium text-[#eebbc3]">
                    Suraj Sharma
                  </h3>
                  <p className="text-sm text-[#b8c1ec]">
                    Web Developer & Influnecer
                  </p>
                  <p className="mt-3 text-[#b8c1ec]">
                    I am passionate Web Developer and Influnecer with 2 year of
                    experience in creating interactive platforms. EduLift is my
                    latest project aimed at making internships and scholarships
                    accessible and engaging for everyone.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-[#eebbc3] mb-2">
                      Connect With Me
                    </h4>
                    <div className="flex space-x-4">
                      <a
                        href="https://github.com/Suraj-Sharma001"
                        className="text-[#b8c1ec] hover:text-[#eebbc3]"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com/in/Suraj-sharma-99ab95270"
                        className="text-[#eebbc3] hover:text-[#b8c1ec]"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>  
                      <a
                        href="https://instagram.com/sharma_suraj001"
                        className="text-[#eebbc3] hover:text-[#b8c1ec]"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a
                        href="surajsharma60923@gmail.com"
                        className="text-[#eebbc3] hover:text-[#b8c1ec]"
                        aria-label="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#b8c1ec] text-[#232946] rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-[#b8c1ec] text-[#232946] rounded-full text-sm">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-[#b8c1ec] text-[#232946] rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-[#b8c1ec] text-[#232946] rounded-full text-sm">UI/UX Design</span>
                  <span className="px-3 py-1 bg-[#b8c1ec] text-[#232946] rounded-full text-sm">Educational Technology</span>
                </div>
              </div>

              {/* feeback secation */}
            </div>
          </div>
        </main>

        {/* footer */}
        <footer className="bg-[#121629] text-[#eebbc3] mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm">© 2025 EduLift. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex justify-center md:justify-end space-x-6">
                <a href="#" className="text-[#b8c1ec] hover:text-[#eebbc3]">
                  <span className="sr-only">Privacy Policy</span>
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Terms</span>
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">FAQ</span>
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default page;
