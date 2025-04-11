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

export default function HireStep() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [followedGroups, setFollowedGroups] = useState<number[]>([]);

  const steps: StepType[] = [
    {
      "question": "What is your full name?",
      "input": true,
      "placeholder": "e.g. Adebare Adesokan"
    },
    {
      "question": "What kind of impact would you like your work to have in the world?",
      "input": true,
      "placeholder": "e.g., Solve environmental issues, Help people through healthcare"
    },
    {
      "question": "What type of career are you considering right now (if any)?",
      "options": ["Tech", "Business", "Design", "Medicine", "Research", "Not Sure"]
    },
    {
      "question": "Where do you see yourself in the next 3–5 years?",
      "input": true,
      "placeholder": "e.g., Working as a full-stack developer, Running my own business"
    },
    {
      "question": "Are you hoping to do any of the following in the next few years?",
      "options": [
        "Get an internship",
        "Land my first full-time job",
        "Build a portfolio",
        "Learn in-demand skills",
        "Start a business",
        "Go to grad school",
        "Still exploring"
      ]
    },
    {
      "question": "What’s your current field of study?",
      "input": true,
      "placeholder": "e.g., Computer Science, Business Administration"
    },
    {
      "question": "Does your course align with what you want to do long term?",
      "options": ["Yes", "Not really", "Still figuring it out"]
    },
    {
      "question": "Do you want a career that’s related to your major or something different?",
      "options": ["Related to my major", "Something different"]
    },
    {
      "question": "What are your current strengths?",
      "input": true,
      "placeholder": "e.g., Problem-solving, Communication, Creativity"
    },
    {
      "question": "What skills would you love to develop more?",
      "input": true,
      "placeholder": "e.g., Data analysis, Public speaking"
    },
    {
      "question": "What are you currently doing to build your career outside of school?",
      "options": [
        "Side projects",
        "Internships",
        "Volunteering",
        "Courses",
        "Nothing yet"
      ]
    },
    {
      "question": "Have you ever shadowed a professional, interned, or done any hands-on work?",
      "options": ["Yes", "No"]
    },
    {
      "question": "Would you like to be shown career paths based on:",
      "options": [
        "Your personality",
        "Your major",
        "What you enjoy doing",
        "What skills are in demand"
      ]
    },
    {
      "question": "What’s most important to you in a future career?",
      "options": [
        "Earning potential",
        "Job security",
        "Work-life balance",
        "Growth opportunities",
        "Creativity",
        "Making an impact",
        "Working with people",
        "Prestige/reputation"
      ]
    },
    {
      "question": "How much time can you dedicate each week to learning or career prep?",
      "options": [
        "Less than 1 hour",
        "1–3 hours",
        "3–5 hours",
        "5–10 hours",
        "More than 10 hours"
      ]
    },
    {
      "question": "What kind of learning experience do you prefer?",
      "options": [
        "Short videos",
        "Real-world projects",
        "Online courses",
        "Mentorship",
        "Reading blogs/books"
      ]
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

  const toggleFollow = (index: number) => {
    setFollowedGroups((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getGroupsForRole = (role: string) => {
    switch (role.toLowerCase()) {
      case "developer":
        return [
          {
            title: "Popular developers to follow",
            avatars: ["/dev1.png", "/dev2.png", "/dev3.png"],
            count: 48,
          },
          {
            title: "New and noteworthy coders",
            avatars: ["/dev4.png", "/dev5.png", "/dev6.png"],
            count: 16,
          },
        ];
      case "designer":
        return [
          {
            title: "Popular creatives to follow",
            avatars: ["/design1.png", "/design2.png", "/design3.png"],
            count: 52,
          },
          {
            title: "Rising design stars",
            avatars: ["/design4.png", "/design5.png"],
            count: 18,
          },
        ];
      default:
        return [
          {
            title: "Suggested creators to follow",
            avatars: ["/generic1.png", "/generic2.png"],
            count: 20,
          },
        ];
    }
  };

  const groups =
    currentStep.isSuggestionStep && answers[2]
      ? getGroupsForRole(answers[2])
      : [];

  return (
    <div className="w-full max-w-md p-6 flex flex-col items-center text-center min-h-screen mx-auto relative justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            {currentStep.question}
          </h2>

          {/* Multiple choice options */}
          {currentStep.options && (
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
              {currentStep.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`flex-1 border rounded-lg p-4 transition-all ${
                    selected === option || answers[step] === option
                      ? "border-pink-500 ring-2 ring-pink-300"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selected === option || answers[step] === option
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-400"
                      }`}
                    />
                    <span className="capitalize text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Text input field */}
          {currentStep.input && (
            <input
              type="text"
              placeholder={currentStep.placeholder}
              value={answers[step] || ""}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg mb-8 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          )}

          {/* Suggestions Step */}
          {currentStep.isSuggestionStep && (
            <div className="space-y-6 text-left">
              {groups.map((group, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{group.title}</h3>
                    <button
                      onClick={() => toggleFollow(index)}
                      className={`text-sm px-3 py-1 rounded-full ${
                        followedGroups.includes(index)
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {followedGroups.includes(index)
                        ? "✔ Following"
                        : "Follow Group"}
                    </button>
                  </div>
                  <div className="flex -space-x-2">
                    {group.avatars.map((avatar, i) => (
                      <img
                        key={i}
                        src={avatar}
                        alt=""
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ))}
                    <span className="ml-4 text-sm text-gray-500">
                      +{group.count}
                    </span>
                  </div>
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
          className="bg-black text-white py-2 px-6 rounded-full"
        >
          {step < steps.length - 1 ? "Continue" : "Finish"}
        </button>
      </div>

      {/* Optional Background */}
      <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40">
        <img
          src="/bg-abstract.png"
          alt="Background"
          className="object-cover w-full h-full opacity-90"
        />
      </div>
    </div>
  );
}
