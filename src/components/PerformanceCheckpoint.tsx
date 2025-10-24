import { useState } from "react";
import { Button } from "./ui/button";
import { Shield, CheckCircle2 } from "lucide-react";
import { ApplicationForm } from "./ApplicationForm";

export function PerformanceCheckpoint() {
  const [applicationOpen, setApplicationOpen] = useState(false);

  return (
    <>
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 mb-6 bg-blue-500/10 border border-blue-400/20 rounded-full px-5 py-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm uppercase tracking-wide">Risk-Free Guarantee</span>
            </div>
            
            <h2 className="text-white mb-6 leading-tight">30-Day Performance Checkpoint</h2>
            
            <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed">
              If we don't ship meaningful progress (creative velocity, CAC trend, or funnel uplift) 
              in the first 30 days, you can cancel — no hard feelings.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Weekly progress reports</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Full transparency on metrics</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Cancel anytime if not satisfied</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Button 
              onClick={() => setApplicationOpen(true)}
              className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-12 py-7 shadow-2xl hover:shadow-3xl transition-all text-lg hover:scale-105"
            >
              Start Your Audit
            </Button>
          </div>
        </div>
      </div>
    </section>

    <ApplicationForm open={applicationOpen} onOpenChange={setApplicationOpen} />
    </>
  );
}
