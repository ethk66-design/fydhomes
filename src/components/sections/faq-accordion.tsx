"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services do you offer in purchasing properties?",
    answer: "We provide personalized consultation for purchasing luxury properties, including custom property searches, negotiation assistance, and support throughout the entire acquisition process, including connections with industry professionals such as lawyers and notaries.",
  },
  {
    question: "How can I list my property on your website?",
    answer: "You can contact us directly through our contact form or by phone to schedule an appointment with one of our experts. We will evaluate your property and create a customized marketing strategy to ensure you get the best possible return.",
  },
  {
    question: "Do you offer property management services?",
    answer: "Yes, we offer comprehensive property management services for luxury homes, including maintenance, rental management, and oversight of daily operations to ensure your investment is always in top condition.",
  },
  {
    question: "What are the advantages of purchasing a property?",
    answer: "Purchasing a property in these areas means investing in some of the most prestigious and sought-after locations, offering a unique blend of luxury, security, and high quality of life. These areas are known for their natural beauty, exclusive amenities, and strong property value retention.",
  },
  {
    question: "Can I arrange a virtual tour for a property I'm interested in?",
    answer: "Absolutely. We offer detailed and personalized virtual tours for every property, allowing you to explore homes from anywhere in the world. Contact us to schedule a virtual tour appointment.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-[80px]">
      <div className="container px-6 max-w-[1140px] mx-auto">
        <div className="mb-8">
          <h2 className="font-display text-[32px] font-bold leading-[1.3] text-black mb-6">
            FAQ
          </h2>
        </div>

        <div className="bg-[#ECF2F6] rounded-[8px] p-8 md:p-12">
          <div className="space-y-0">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "border-b border-black/5 last:border-b-0",
                  "transition-all duration-300 ease-in-out"
                )}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 flex items-center justify-between text-left group hover:opacity-80 transition-opacity"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-sans text-[16px] font-semibold text-[#000000] leading-tight pr-4">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-black" strokeWidth={3} />
                    ) : (
                      <Plus className="w-4 h-4 text-black" strokeWidth={3} />
                    )}
                  </div>
                </button>
                
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openIndex === index ? "max-height-[500px] mb-6 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="font-sans text-[15px] leading-relaxed text-[#333333] mb-0">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}