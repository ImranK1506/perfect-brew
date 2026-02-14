import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the AI recommendation system work?",
    answer: "Our AI analyzes the characteristics of your selected coffee beans (origin, roast level, flavor profile) and your brewing equipment to generate optimal brewing parameters. It considers factors like bean density, roast development, and machine capabilities to recommend the perfect temperature, grind size, brew time, and water ratio."
  },
  {
    question: "What coffee brands and equipment do you support?",
    answer: "We currently support Australian coffee (Dark Roast and Medium Roast) and Illy coffee from various origins. For equipment, we support espresso machines from Breville/Sage (Barista Express, Barista Pro), De'Longhi, Jura, Saeco, Gaggia, and AeroPress."
  },
  {
    question: "Are the recommendations suitable for beginners?",
    answer: "Absolutely! Our recommendations are designed to be clear and actionable for both beginners and experienced baristas. Each recommendation includes specific parameters with explanations, making it easy to achieve great results regardless of your experience level."
  },
  {
    question: "Can I use these recommendations with any grinder?",
    answer: "Yes! While our recommendations specify grind sizes (fine, medium-fine, medium, etc.), these are universal standards that work with any quality burr grinder. Check our Brewing Fundamentals page for specific grinder setting references."
  },
  {
    question: "How accurate are the brewing parameters?",
    answer: "Our AI-powered recommendations are based on industry best practices and coffee science. However, personal taste preferences vary, so we encourage you to use our recommendations as a starting point and adjust to your liking."
  },
  {
    question: "Do I need an API key to use the service?",
    answer: "The basic recommendation service works without any setup. However, for AI-powered personalized recommendations, the site administrator needs to configure an Anthropic API key. If AI is unavailable, you'll receive rule-based recommendations instead."
  },
  {
    question: "Can I save my favorite recipes?",
    answer: "Currently, recommendations are generated on-demand. We recommend taking a screenshot or noting down your preferred settings for future reference."
  },
  {
    question: "What if my coffee brand isn't listed?",
    answer: "Choose a similar coffee based on origin and roast level. For example, if you have a medium roast from Brazil, select a similar option from our list. The brewing principles remain consistent across similar coffee types."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-neutral-600">
          Everything you need to know about Perfect Brew
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-warm-200 overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              aria-expanded={openIndex === index}
            >
              <span className="text-lg font-semibold text-neutral-900 pr-8">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-5 text-neutral-700 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center p-8 bg-warm-100 rounded-2xl">
        <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
          Still have questions?
        </h3>
        <p className="text-neutral-600 mb-6">
          Can't find the answer you're looking for? Try our recommendation engine to get started.
        </p>
        <a
          href="/#recommendation-form"
          className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Get Your Perfect Brew
        </a>
      </div>
    </div>
  );
}
