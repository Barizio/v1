"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type StepType = {
  question: string;
  options?: string[];
  input?: boolean;
  placeholder?: string;
  isSuggestionStep?: boolean;
};

type Group = {
  category: string;
  items: { title: string; platform?: string; company?: string }[];
};

export default function HireStep() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const steps: StepType[] = [
    {
      question: "What is your full name?",
      input: true,
      placeholder: "e.g. Adebare Adesokan",
    },
    {
      question: "What type of career are you considering right now (if any)?",
      options: ["Tech", "Business", "Design", "Medicine", "Research", "Cybersecurity", "Not Sure"],
    },
    {
      question: "Where do you see yourself in the next 3–5 years?",
      input: true,
      placeholder: "e.g., Working as a full-stack developer, Running my own business",
    },
    {
      question: "Are you hoping to do any of the following in the next few years?",
      options: [
        "Get an internship",
        "Land my first full-time job",
        "Build a portfolio",
        "Learn in-demand skills",
        "Start a business",
        "Go to grad school",
        "Still exploring",
      ],
    },
    {
      question: "What’s your current field of study?",
      input: true,
      placeholder: "e.g., Computer Science, Business Administration",
    },
    {
      question: "Does your course align with what you want to do long term?",
      options: ["Yes", "Not really", "Still figuring it out"],
    },
    {
      question: "What skills would you love to develop more?",
      input: true,
      placeholder: "e.g., Data analysis, Public speaking",
    },
    {
      question: "What are you currently doing to build your career outside of school?",
      options: ["Side projects", "Internships", "Volunteering", "Courses", "Nothing yet"],
    },
    {
      question: "Would you like to be shown career paths based on:",
      options: [
        "Your personality",
        "Your major",
        "What you enjoy doing",
        "What skills are in demand",
      ],
    },
    {
      question: "What’s most important to you in a future career?",
      options: [
        "Earning potential",
        "Job security",
        "Work-life balance",
        "Growth opportunities",
        "Creativity",
        "Making an impact",
        "Working with people",
      ],
    },
    {
      question: "How much time can you dedicate each week to learning or career prep?",
      options: [
        "Less than 1 hour",
        "1–3 hours",
        "3–5 hours",
        "5–10 hours",
        "More than 10 hours",
      ],
    },
    {
      question: "What kind of learning experience do you prefer?",
      options: ["Short videos", "Real-world projects", "Online courses", "Mentorship", "Reading blogs/books"],
    },
    {
      question: "Suggestions for you",
      isSuggestionStep: true,
    },
  ];

  const currentStep = steps[step];

  const handleContinue = () => {
    if (currentStep.isSuggestionStep || selected || answers[step]) {
      if (step < steps.length - 1) {
        setStep((prev) => prev + 1);
        setSelected(null);
      } else {
        alert("Form submitted: " + JSON.stringify(answers, null, 2));
      }
    } else {
      alert("Please answer before continuing.");
    }
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setAnswers({ ...answers, [step]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [step]: e.target.value });
  };

  const getGroupsForRole = (role: string): Group[] => {
    switch (role.toLowerCase()) {
      case "cybersecurity":
        return [
          {
            category: "Recommended Courses",
            items: [
              { title: "Introduction to Cybersecurity", platform: "Coursera" },
              { title: "CompTIA Security+ Prep", platform: "Udemy" },
              { title: "Cybersecurity Basics", platform: "edX" },
            ],
          },
          {
            category: "Recommended Jobs",
            items: [
              { title: "Security Analyst", company: "Deloitte" },
              { title: "Cybersecurity Intern", company: "IBM" },
              { title: "SOC Analyst (Entry Level)", company: "Accenture" },
            ],
          },
          {
            category: "Recommended Certifications",
            items: [
              { title: "CompTIA Security+" },
              { title: "Certified Ethical Hacker (CEH)" },
              { title: "Cisco CCNA CyberOps" },
            ],
          },
        ];
      default:
        return [
          {
            category: "General Career Suggestions",
            items: [
              { title: "Explore career paths", platform: "LinkedIn Learning" },
              { title: "Join a mentorship program", platform: "ADPList" },
            ],
          },
        ];
    }
  };

  const groups =
    currentStep.isSuggestionStep && answers[1]
      ? getGroupsForRole(answers[1])
      : [];

  return (
    <div className="w-full bg-amber-50 max-w-full p-6 flex flex-col items-center text-center min-h-screen mx-auto relative justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="w-[80%]"
        >
          <h2 className="text-2xl text-black sm:text-3xl font-semibold mb-6">
            {currentStep.question}
          </h2>

          {/* Options */}
          {currentStep.options && (
            <div className="flex justify-center flex-col sm:flex-row gap-4 mb-8 w-full">
              {currentStep.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`flex-1 text-black border min-w-[200px] rounded-lg p-4 transition-all ${
                    selected === option || answers[step] === option
                      ? "border-blue-700 ring-2 ring-blue-700"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selected === option || answers[step] === option
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                      }`}
                    />
                    <span className="capitalize text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {currentStep.input && (
            <input
              type="text"
              placeholder={currentStep.placeholder}
              value={answers[step] || ""}
              onChange={handleInputChange}
              className="w-full p-4 text-black border border-gray-700 placeholder:text-slate-300 rounded-lg mb-8 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          )}

          {/* Suggestions */}
          {currentStep.isSuggestionStep && (
            <div className="space-y-8 text-left">
              {groups.map((group, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-2">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                        <div className="text-black font-medium">{item.title}</div>
                        {item.platform && <div className="text-sm text-gray-500">via {item.platform}</div>}
                        {item.company && <div className="text-sm text-gray-500">at {item.company}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 mt-10">
        {step > 0 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="bg-white border border-black text-black py-2 px-6 rounded-full"
          >
            Back
          </button>
        )}
        <button
          onClick={handleContinue}
          className="bg-blue-700 text-white py-2 px-6 rounded-full"
        >
          {step < steps.length - 1 ? "Continue" : "Finish"}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40">
        <img
          src="/img1.png"
          alt="Background"
          className="object-cover w-full h-full opacity-90"
        />
      </div>
    </div>
  );
}
