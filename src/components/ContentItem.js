import React, { useState } from "react";

const ContentItem = ({ item }) => {
  const [revealed, setRevealed] = useState(false);

  // Tap-to-reveal functionality for children content
  const handleTap = () => setRevealed(!revealed);

  if (item.type === "animation" || item.type === "video") {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h4 className="font-bold">{item.title}</h4>
        {item.type === "animation" && (
          <img src={item.src} alt={item.title} className="w-full h-auto mt-2" />
        )}
        {item.type === "video" && (
          <video
            src={item.src}
            controls
            className="w-full h-auto mt-2 rounded-xl"
          />
        )}
        <p className="text-sm mt-2">{item.description}</p>
      </div>
    );
  }

  if (item.type === "tap") {
    return (
      <div
        className="bg-white rounded-xl shadow p-4 mb-4 cursor-pointer"
        onClick={handleTap}
      >
        <h4 className="font-bold">{item.title}</h4>
        {revealed && <p className="text-sm mt-2">{item.description}</p>}
        {!revealed && (
          <p className="text-sm mt-2 text-gray-400">Tap to reveal!</p>
        )}
      </div>
    );
  }

  if (item.type === "quiz") {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h4 className="font-bold">{item.title}</h4>
        {item.questions.map((q, idx) => (
          <div key={idx} className="mt-2">
            <p className="font-semibold">{q.q}</p>
            <div className="flex flex-col gap-1 mt-1">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-left"
                  onClick={() =>
                    alert(i === q.answer ? "✅ Correct!" : "❌ Try again")
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ContentItem;
