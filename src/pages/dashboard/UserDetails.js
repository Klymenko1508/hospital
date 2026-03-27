import React, { useState, useEffect } from "react";

/**
 * UserDetails Page
 * -------------------
 * Shows personalized info about the user:
 * - Fun facts
 * - Days until birthday
 * - Interesting facts about famous birthdays
 */
const UserDetails = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  /**
   * Calculates the number of days until the user's next birthday
   * @param {string} dob - date of birth in YYYY-MM-DD format
   * @returns {number} - days until next birthday
   */
  const calculateDaysUntilBirthday = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Set next birthday (month/day same, year might be next year)
    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDiff = nextBirthday - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const daysUntilBirthday = calculateDaysUntilBirthday(userData.dob);

  return (
    <div className="bg-white font-sans">
      {/* Cards grid */}
      <div className="grid mt-20 grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:max-w-6xl max-w-xl mx-auto">
        {/* Card 1: About you */}
        <div className="card bg-purple-100 rounded-lg p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">About you</h3>
          <p className="text-sm text-gray-600">
            Welcome to your personalized dashboard! Learn fun facts and track
            your special day.
          </p>
          <ul className="text-gray-600 list-disc mt-4 space-y-2 pl-4">
            <li className="text-sm">Increased efficiency</li>
            <li className="text-sm">Improved focus and organization</li>
            <li className="text-sm">Reduced time spent on tasks</li>
          </ul>
          <button className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg mt-6">
            Get Started
          </button>
        </div>

        {/* Card 2: Fun facts & birthday countdown */}
        <div className="card bg-purple-100 rounded-lg p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Fun facts</h3>
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {daysUntilBirthday} days until your Birthday! 🎉
          </h3>
          <button className="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg mt-6">
            Learn More
          </button>
        </div>

        {/* Card 3: Famous birthdays */}
        <div className="card bg-purple-100 rounded-lg p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Which famous person shares your birthday?
          </h3>
          <p className="text-sm text-gray-600">
            Discover notable people who were born on the same day as you.
          </p>
          <ul className="text-gray-600 list-disc mt-4 space-y-2 pl-4">
            <li className="text-sm">Set clear and achievable goals</li>
            <li className="text-sm">Track your progress</li>
            <li className="text-sm">Celebrate successes and learn</li>
          </ul>
          <button className="inline-block px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg mt-6">
            Start Today
          </button>
        </div>

        {/* Additional cards can follow the same pattern */}
      </div>
    </div>
  );
};

export default UserDetails;
