import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Users, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ApplicationForm } from "./ApplicationForm";

export function Hero() {
  const [applicationOpen, setApplicationOpen] = useState(false);

  return (
    <>
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/50 rounded-full px-4 py-1.5 inline-flex items-center gap-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Limited openings available
            </Badge>

            <div className="space-y-6">
              <h1 className="text-slate-900 leading-tight text-4xl md:text-5xl lg:text-6xl font-bold">
                Performance brand scaling<br />
                for <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">e-com & local</span>
              </h1>
              <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                We install content systems, paid media, and conversion design to create 
                predictable acquisition. Get a free growth audit to see if we can lift your 
                brand this quarter.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setApplicationOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-10 py-6 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 transition-all"
              >
                Apply for Growth Audit
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full px-10 py-6 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all"
                onClick={() => {
                  const element = document.getElementById('case-studies');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                See Results
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Data-driven</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>100% privacy</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>No spam</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Live Case Study</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-slate-50 to-white">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="text-slate-500 text-sm mb-2">ad ROAS</div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="text-slate-900">3.8×</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="text-slate-500 text-sm mb-2">CAC ↓</div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-emerald-600" />
                      <span className="text-slate-900">-27%</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="text-slate-500 text-sm mb-2">Leads</div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-900">+142</span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjEyNTAwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Business analytics dashboard"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-300/20 via-purple-300/10 to-indigo-300/20 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>

    <ApplicationForm open={applicationOpen} onOpenChange={setApplicationOpen} />
    </>
  );
}
