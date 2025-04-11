"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type StepType = {
  question: string;
  options?: string[]; // if present, shows buttons
  input?: boolean; // if true, shows a text input
  placeholder?: string;
};

export default function HireStep() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

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
  ];

  const currentStep = steps[step];

  const handleContinue = () => {
    if (selected || answers[step]) {
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

          {/* Options */}
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

          {/* Text Input */}
          {currentStep.input && (
            <input
              type="text"
              placeholder={currentStep.placeholder}
              value={answers[step] || ""}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg mb-8 text-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4">
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

      {/* Background (Optional) */}
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
