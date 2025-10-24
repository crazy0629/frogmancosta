import { Card } from "./ui/card";
import { Target, Video, TrendingUp, Zap, Users as UsersIcon, BarChart3 } from "lucide-react";

export function Services() {
  const mainServices = [
    {
      icon: Target,
      title: "Paid Media",
      description: "Meta, TikTok, and YouTube acquisition with creative testing frameworks and weekly sprints.",
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100/50",
      borderColor: "border-red-200/50"
    },
    {
      icon: Video,
      title: "UGC & Content Ops",
      description: "Creator sourcing, briefs, and an always-on content engine for hooks, angles, and offers.",
      color: "text-slate-800",
      bgColor: "bg-gradient-to-br from-slate-100 to-slate-200/50",
      borderColor: "border-slate-300/50"
    },
    {
      icon: TrendingUp,
      title: "CRO & Funnels",
      description: "Offer architecture, landing pages, and A/B testing to convert traffic into revenue.",
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      borderColor: "border-blue-200/50"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Weekly Sprints",
      description: "We ship creative tests and landing updates every week — speed wins.",
      color: "text-amber-600"
    },
    {
      icon: UsersIcon,
      title: "Creator Network",
      description: "Access vetted UGC creators for hooks, angles, and offers.",
      color: "text-purple-600"
    },
    {
      icon: BarChart3,
      title: "Performance Reporting",
      description: "Clear dashboards focused on CAC, ROAS, and revenue — not vanity metrics.",
      color: "text-emerald-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-wider text-sm mb-3">Our Services</p>
          <h2 className="text-slate-900 mb-4">Everything you need to scale</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Complete growth infrastructure — from content to conversion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              className={`p-8 hover:shadow-2xl transition-all duration-500 border ${service.borderColor} bg-white hover:-translate-y-2 group`}
            >
              <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-8 h-8 ${service.color}`} strokeWidth={2} />
              </div>
              <h3 className="text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/80 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
