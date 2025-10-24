import { Mail, Linkedin, Twitter } from "lucide-react";
import logo from "figma:asset/cfffbe01d59059a16a1cb3ffb2640d7acc0d3bc4.png";

export function Footer() {
  return (
    <footer className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Brand Lift Co Logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-white">Brand Lift Co</span>
                <span className="text-slate-400 text-xs">Performance Growth</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Scaling brands with performance content, paid media, and conversion design.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <div className="space-y-3">
              <a 
                href="#services" 
                className="block text-slate-400 hover:text-blue-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Services
              </a>
              <a 
                href="#case-studies" 
                className="block text-slate-400 hover:text-blue-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('case-studies');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Case Studies
              </a>
              <a 
                href="#faq" 
                className="block text-slate-400 hover:text-blue-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('faq');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                FAQ
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Get in Touch</h4>
            <a 
              href="mailto:hello@brandlift.co" 
              className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-4"
            >
              <Mail className="w-4 h-4" />
              hello@brandlift.co
            </a>
            <div className="flex gap-3">
              <a href="#" onClick={(e) => e.preventDefault()} className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Linkedin className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Twitter className="w-5 h-5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            © 2025 Brand Lift Co. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
