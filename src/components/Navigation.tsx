import { useState } from "react";
import { Button } from "./ui/button";
import { ApplicationForm } from "./ApplicationForm";
import logo from "figma:asset/cfffbe01d59059a16a1cb3ffb2640d7acc0d3bc4.png";

export function Navigation() {
  const [applicationOpen, setApplicationOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Brand Lift Co Logo" className="w-11 h-11 object-contain" />
              <div className="flex flex-col">
                <span className="text-slate-900 tracking-tight leading-none">Brand Lift Co</span>
                <span className="text-slate-500 text-xs">Performance Growth</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-10">
              <a 
                href="#services" 
                className="text-slate-600 hover:text-blue-600 transition-colors relative group"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a 
                href="#proof" 
                className="text-slate-600 hover:text-blue-600 transition-colors relative group"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('proof');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Proof
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a 
                href="#case-studies" 
                className="text-slate-600 hover:text-blue-600 transition-colors relative group"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('case-studies');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Case Studies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a 
                href="#faq" 
                className="text-slate-600 hover:text-blue-600 transition-colors relative group"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('faq');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            </div>

            <Button 
              onClick={() => setApplicationOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-8 shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </nav>

      <ApplicationForm open={applicationOpen} onOpenChange={setApplicationOpen} />
    </>
  );
}
