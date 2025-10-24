import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowUpRight } from "lucide-react";
import { ApplicationForm } from "./ApplicationForm";

export function RecentOutcomes() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const outcomes = [
    {
      category: "Skincare DTC",
      title: "$120k → $310k/mo",
      description: "Scaled with 12 new UGC angles and a high-ticket bundle funnel.",
      badge: "Revenue",
      badgeColor: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200/50"
    },
    {
      category: "Local Med Spa",
      title: "+87 qualified leads",
      description: "Lead gen via TikTok + Meta with instant-book landing.",
      badge: "Leads",
      badgeColor: "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/50"
    },
    {
      category: "Supplements",
      title: "-22% CAC",
      description: "Offer restructure + creative testing matrix.",
      badge: "Efficiency",
      badgeColor: "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200/50"
    }
  ];

  return (
    <>
    <section id="case-studies" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-wider text-sm mb-3">Proof</p>
          <h2 className="text-slate-900 mb-4">Recent outcomes</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Real results from real clients — see how we've helped brands scale
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {outcomes.map((outcome, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-2xl transition-all duration-500 border-slate-200/80 bg-white group cursor-pointer hover:-translate-y-2"
            >
              <Badge variant="outline" className={`mb-6 ${outcome.badgeColor} rounded-full px-4 py-1.5 shadow-sm`}>
                {outcome.badge}
              </Badge>
              
              <div className="mb-2 text-slate-500 text-sm uppercase tracking-wide">{outcome.category}</div>
              <h3 className="text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {outcome.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">{outcome.description}</p>

              <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <span className="mr-2">View case study</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setApplicationOpen(true)}
            className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-full px-12 py-7 shadow-xl hover:shadow-2xl transition-all"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>

    <ApplicationForm open={applicationOpen} onOpenChange={setApplicationOpen} />
    </>
  );
}
