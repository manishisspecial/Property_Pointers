"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({
  title = "Frequently Asked Questions",
  items,
}: {
  title?: string;
  items: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 sm:p-8">
      <h3 className="text-xl font-bold text-navy-900">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.question} className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3"
              >
                <span className="font-semibold text-navy-900">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

