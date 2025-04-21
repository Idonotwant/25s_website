import React from "react";

function Changelog() {
  const changelogEntries = [
    {
      date: "2025-04-22",
      changes: [
        "fix bug: error handling post from users  without uploaded avatars",
        "new feature: changelog page",
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-100">
          Changelog
        </h2>
        <div className="mt-6 max-h-[70vh] overflow-y-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          {changelogEntries.map((entry, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-blue-300">
                {entry.date}
              </h3>
              <ul className="mt-2 list-disc list-inside text-gray-300">
                {entry.changes.map((change, idx) => (
                  <li key={idx}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Changelog;
