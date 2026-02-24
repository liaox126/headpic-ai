"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does AI headshot generation work?",
    answer:
      "Simply upload a clear selfie, choose your preferred styles, and our AI will transform your photo into professional headshots. The AI preserves your facial features while enhancing the overall look with professional lighting, backgrounds, and attire.",
  },
  {
    question: "How long does it take to generate headshots?",
    answer:
      "Most headshots are generated within 60 seconds. The exact time depends on the number of styles selected and current server load.",
  },
  {
    question: "What kind of photo should I upload?",
    answer:
      "Upload a clear, well-lit selfie or portrait photo. Make sure your face is clearly visible, facing the camera. Avoid heavy filters, sunglasses, or group photos. JPG, PNG, and WebP formats are supported up to 10MB.",
  },
  {
    question: "Can I use these headshots professionally?",
    answer:
      "Absolutely! Our AI headshots are designed for professional use — LinkedIn profiles, company websites, resumes, email signatures, and more. You own full rights to the generated images.",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer:
      "You can re-generate headshots with different styles at no extra cost within your plan limits. Our AI continuously improves, and most users are thrilled with their results on the first try.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-primary">
          Frequently Asked <span className="text-gold">Questions</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-primary/60">
          Everything you need to know about HeadPic.ai
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-primary/10"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-primary/5"
              >
                <span className="font-medium text-primary">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary/40 transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-primary/10 px-5 py-4 text-sm leading-relaxed text-primary/60">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
