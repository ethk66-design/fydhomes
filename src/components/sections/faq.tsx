"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "item-1",
    question: "What services do you offer in purchasing properties?",
    answer: "We provide personalized consultation for purchasing luxury properties, including custom property searches, negotiation assistance, and support throughout the entire acquisition process, including connections with industry professionals such as lawyers and notaries.",
  },
  {
    id: "item-2",
    question: "How can I list my property on your website?",
    answer: "You can contact us directly through our contact form or by phone to schedule an appointment with one of our experts. We will evaluate your property and create a customized marketing strategy to ensure you get the best possible return.",
  },
  {
    id: "item-3",
    question: "Do you offer property management services?",
    answer: "Yes, we offer comprehensive property management services for luxury homes, including maintenance, rental management, and oversight of daily operations to ensure your investment is always in top condition.",
  },
  {
    id: "item-4",
    question: "What are the advantages of purchasing a property?",
    answer: "Purchasing a property in these areas means investing in some of the most prestigious and sought-after locations, offering a unique blend of luxury, security, and high quality of life. These areas are known for their natural beauty, exclusive amenities, and strong property value retention.",
  },
  {
    id: "item-5",
    question: "Can I arrange a virtual tour for a property I’m interested in?",
    answer: "Absolutely. We offer detailed and personalized virtual tours for every property, allowing you to explore homes from anywhere in the world. Contact us to schedule a virtual tour appointment.",
  },
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>("item-1");

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="bg-white py-[80px] md:py-[100px]">
      <div className="container px-5 mx-auto max-w-[1140px]">
        {/* Section Heading */}
        <div className="mb-[30px]">
          <h2 className="font-serif text-[32px] font-semibold leading-[1.3] text-primary">
            FAQ
          </h2>
        </div>

        {/* FAQ Container */}
        <div className="faq-container bg-[#EFF4F7] rounded-[10px] p-6 md:p-10">
          <div className="space-y-0">
            {faqData.map((item) => (
              <div 
                key={item.id} 
                className="border-b border-[#E6E6E6] last:border-0"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none transition-colors duration-200"
                  aria-expanded={openItem === item.id}
                >
                  <span className="font-sans text-[16px] font-semibold text-primary pr-4">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 text-primary">
                    {openItem === item.id ? (
                      <Minus className="w-[18px] h-[18px] stroke-[2.5px]" />
                    ) : (
                      <Plus className="w-[18px] h-[18px] stroke-[2.5px]" />
                    )}
                  </span>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItem === item.id 
                    ? "max-h-[500px] opacity-100 pb-6" 
                    : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-sans text-[16px] leading-[1.8] text-[#555555]">
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