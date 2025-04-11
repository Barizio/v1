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
      question: "First things first, are you here to hire?",
      options: ["yes", "no"],
    },
    {
      question: "What is your full name?",
      input: true,
      placeholder: "e.g. Adebare Adesokan",
    },
    {
      question: "What best describes you?",
      options: ["Designer", "Developer", "Product Manager"],
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
