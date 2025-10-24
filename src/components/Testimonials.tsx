import { Card } from "./ui/card";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Brand Lift Co rebuilt our offer and creative stack — revenue doubled in 8 weeks.",
      author: "Mia R.",
      role: "Founder",
      company: "Nova Skincare",
      rating: 5
    },
    {
      quote: "Clear testing roadmap and weekly sprints. CAC dropped and booking volume jumped.",
      author: "Dr. Chen",
      role: "Owner",
      company: "Glow Med Spa",
      rating: 5
    },
    {
      quote: "Finally a team that owns content + ads + CRO. Communication is A+.",
      author: "Austin T.",
      role: "CEO",
      company: "Peak Supps",
      rating: 5
    }
  ];

  return (
    <section id="proof" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-wider text-sm mb-3">Testimonials</p>
          <h2 className="text-slate-900 mb-4">What clients say</h2>
          <p className="text-slate-600 text-lg">Don't just take our word for it</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 border-slate-200/80 bg-white hover:shadow-2xl transition-all duration-500 relative hover:-translate-y-1 group"
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Quote className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              
              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-slate-200 pt-5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-blue-700">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-slate-900">{testimonial.author}</div>
                  <div className="text-slate-500 text-sm">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
