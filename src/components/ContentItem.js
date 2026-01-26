import React, { useState } from "react";

/**
 * ContentItem component
 * ---------------------
 * Dynamically renders different types of content based on the `item.type`:
 * - "animation" or "video": shows media with title and description
 * - "tap": text that reveals when clicked
 * - "quiz": interactive quiz with questions and options
 *
 * Props:
 * - item: object containing the content data
 *   - type: string ("animation", "video", "tap", "quiz")
 *   - title: string
 *   - description: string (for animation, video, tap)
 *   - src: string (URL for animation/video)
 *   - questions: array (for quiz)
 */
const ContentItem = ({ item }) => {
  // State to track if tap-type content has been revealed
  const [revealed, setRevealed] = useState(false);

  // Function to toggle revealed state on tap-type content
  const handleTap = () => setRevealed(!revealed);

  /* =========================================================
     RENDER: Animation or Video
     -------------------------
     - Displays title, media (image/video), and description
     - Used for educational content or demos
     ========================================================= */
  if (item.type === "animation" || item.type === "video") {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h4 className="font-bold">{item.title}</h4>

        {/* Animation (image) */}
        {item.type === "animation" && (
          <img src={item.src} alt={item.title} className="w-full h-auto mt-2" />
        )}

        {/* Video */}
        {item.type === "video" && (
          <video
            src={item.src}
            controls
            className="w-full h-auto mt-2 rounded-xl"
          />
        )}

        {/* Description text */}
        <p className="text-sm mt-2">{item.description}</p>
      </div>
    );
  }

  /* =========================================================
     RENDER: Tap-to-reveal content
     -----------------------------
     - Shows text that can be revealed by clicking
     - Initially shows "Tap to reveal!" hint
     ========================================================= */
  if (item.type === "tap") {
    return (
      <div
        className="bg-white rounded-xl shadow p-4 mb-4 cursor-pointer"
        onClick={handleTap} // Toggle revealed state on click
      >
        <h4 className="font-bold">{item.title}</h4>

        {/* Show description if revealed */}
        {revealed && <p className="text-sm mt-2">{item.description}</p>}

        {/* Hint text if not yet revealed */}
        {!revealed && (
          <p className="text-sm mt-2 text-gray-400">Tap to reveal!</p>
        )}
      </div>
    );
  }

  /* =========================================================
     RENDER: Quiz content
     -------------------
     - Displays title and questions
     - Each question has multiple options as buttons
     - Clicking an option shows alert: correct or try again
     ========================================================= */
  if (item.type === "quiz") {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h4 className="font-bold">{item.title}</h4>

        {/* Loop through all quiz questions */}
        {item.questions.map((q, idx) => (
          <div key={idx} className="mt-2">
            {/* Question text */}
            <p className="font-semibold">{q.q}</p>

            {/* Options as buttons */}
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

  // Return nothing if type is not recognized
  return null;
};

export default ContentItem;
