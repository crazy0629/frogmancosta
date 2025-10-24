"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { ApplicationForm } from "./ApplicationForm";

export function FAQ() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const faqs = [
    {
      question: "Who is Brand Lift Co best for?",
      answer: "DTC brands ($25k-$250k/mo) and local lead-gen businesses that need performance content + paid media."
    },
    {
      question: "How fast do you start?",
      answer: "Kickoff within 5-7 days. Week 1 ships initial creative tests and funnel quick wins."
    },
    {
      question: "Do you handle creative production?",
      answer: "Yes. We source creators, write briefs, and deliver variations across hooks/offers."
    },
    {
      question: "How do you report?",
      answer: "Weekly Loom + dashboard covering CAC, ROAS, revenue, learnings, and next tests."
    }
  ];

  return (
    <>
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-wider text-sm mb-3">Questions</p>
          <h2 className="text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-lg">Everything you need to know about working with us</p>
        </div>

        <Accordion type="single" collapsible className="mb-14 space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 rounded-2xl px-8 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <AccordionTrigger className="text-slate-900 hover:no-underline hover:text-blue-600 py-7 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-7 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <Button 
            onClick={() => setApplicationOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-12 py-7 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 transition-all"
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
