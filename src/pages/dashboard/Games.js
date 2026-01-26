import React from "react";

const ageGroups = [
  {
    id: "2-5",
    title: "Little Explorers",
    age: "Ages 2–5",
    color: "from-purple-400 to-purple-600",
    image: "/assets/images/games/bear.png",
    link: "https://www.pbskids.org/games/",
    items: ["Memory", "Matching shapes", "Tap the animal", "Sounds & emotions"],
  },
  {
    id: "6-8",
    title: "Play & Learn",
    age: "Ages 6–8",
    color: "from-blue-400 to-blue-600",
    image: "/assets/images/games/controller.png",
    link: "https://www.funbrain.com/games",
    items: ["Quizzes", "Math games", "Word puzzles", "Hospital games"],
  },
  {
    id: "9-12",
    title: "Smart Games",
    age: "Ages 9–12",
    color: "from-green-400 to-green-600",
    image: "/assets/images/games/rocket.png",
    link: "https://www.coolmathgames.com/",
    items: ["Logic puzzles", "Timed quizzes", "Adventure learning", "Help the doctor"],
  },
  {
    id: "13-18",
    title: "Challenge Zone",
    age: "Ages 13–18",
    color: "from-violet-500 to-violet-700",
    image: "/assets/images/games/brain.png",
    link: "https://www.brainist.com/games",
    items: ["Brain games", "Strategy games", "Quizzes", "Relax games"],
  },
];

export default function Games() {
  return (
    <div className="p-6 md:p-8">
      {/* Заголовок с контроллером 🎮 */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-blue-500 drop-shadow-md">
        FunZone 🎮
      </h1>
      <p className="text-gray-600 text-center mb-8 md:text-lg">
        Choose your age group and start playing!
      </p>

      {/* Карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ageGroups.map((group) => (
          <div
            key={group.id}
            className="rounded-3xl shadow-lg transform transition hover:scale-105 overflow-hidden bg-white flex flex-col"
          >
            {/* Картинка сверху */}
            <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 flex items-center justify-center bg-gray-100">
              <img
                src={group.image}
                alt={group.title}
                className="max-h-full object-contain"
              />
            </div>

            {/* Контент под картинкой */}
            <div
              className={`p-4 sm:p-6 bg-gradient-to-t ${group.color} bg-opacity-80 text-white flex-1 flex flex-col justify-between`}
            >
              <div className="flex flex-col items-center text-center">
                <h2 className="text-sm sm:text-base mb-1">{group.age}</h2>
                <h3 className="text-lg sm:text-xl font-bold mb-3">{group.title}</h3>

                <ul className="text-sm sm:text-base mb-4 space-y-1">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center">
                <a href={group.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-white text-gray-800 hover:bg-gray-200 px-4 sm:px-6 py-2 rounded-full font-semibold transition">
                    Play
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
