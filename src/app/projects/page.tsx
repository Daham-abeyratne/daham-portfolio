"use client";

import { Github, ExternalLink } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import Navbar from "../../../components/Navbar";

export default function ProjectsPage() {
  
  const { darkMode } = useTheme();

  const projects = [
    {
      name: "Customer Churn Predictor",
      description: "This project predicts customer churn using the Telco Customer Churn dataset. It includes simple exploratory data analysis, data preprocessing, and two machine learning models, a neural network and a decision tree along with model evaluation.",
      tech: ["Python","Pandas", "NumPy","Scikit learn","SMOTE","TensorFlow / Keras","Matplotlib","Seaborn"],
      github: "https://github.com/Daham-abeyratne/Customer_Churn_Prediction",
      demo: null,
    },
    {
      name: "Intelligent Team Formation System",
      description:
        "An OOP Java based system that automatically forms balanced and diverse gaming teams by analyzing player skills, roles, interests, and personality traits using a quick personality and intrest survey.",
      tech: ["Java","JUnit 5"],
      github: "https://github.com/Daham-abeyratne/smartTeammateSystem",
      demo: null,
    },
    {
      name: "Income Recording Client System",
      description:
        "A simple Income Recording Client System to record the incomes and the withholding taxes which allows to add, update, delete, search and generate a income sheet as csv file to send.",
      tech: ["Python"],
      github: "https://github.com/Daham-abeyratne/IRCS",
      demo: null,
    },
    // {
    //   name: "Sentiment Analysis Dashboard",
    //   description:
    //     "Real-time sentiment analysis platform for social media data using NLP and interactive visualizations.",
    //   tech: ["Python", "NLTK", "React", "D3.js"],
    //   github: "https://github.com",
    //   demo: null,
    // },
  ];

  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const buttonBg = darkMode
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-blue-600 hover:bg-blue-700";

  const theme = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900';

  const paratheme = darkMode
      ? 'text-gray-300'
      : 'text-black-600';

  return (
    <section className={`py-20 px-4 min-h-screen min-h-screen ${theme} transition-colors duration-300 pt-[130px]`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          My Projects
        </h1>
        <p className={`text-center text-lg ${paratheme} mb-12 max-w-2xl mx-auto pb-[20px]`}>
          A showcase of my work
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`${cardBg} rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full`}
            >
              <h3 className="text-2xl font-bold mb-3">
                {project.name}
              </h3>

              <p className={`${paratheme} mb-4 leading-relaxed`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    } px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons pushed to bottom */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  } px-4 py-2 rounded-lg transition flex-1 justify-center`}
                >
                  <Github size={18} />
                  <span className="font-semibold">Code</span>
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 ${buttonBg} text-white px-4 py-2 rounded-lg transition flex-1 justify-center`}
                  >
                    <ExternalLink size={18} />
                    <span className="font-semibold">Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
