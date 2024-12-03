import React, { useState } from "react";


interface Milestone {
    id: number;
    name: string;
    date: string;
    amount: string;
}

const MilestoneForm: React.FC<{
    milestones: Milestone[],
    setMilestones: any

}> = ({
    milestones,
    setMilestones

}) => {

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { id: milestones.length + 1, name: `Milestone ${milestones.length + 1}`, date: "", amount: "" },
    ]);
  };

  const removeMilestone = (id: number) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id));
  };

  const handleInputChange = (id: number, field: keyof Milestone, value: string) => {
    setMilestones(
      milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      )
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md max-w-xl mx-auto">
      <h2 className="text-lg font-medium mb-4">How many milestones do you want to include?</h2>
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex items-center space-x-2 mb-3">
          <span className="text-sm font-medium">{index + 1}</span>
          {/* Milestone Name Input */}
          <input
            type="text"
            placeholder="Milestone Name"
            value={milestone.name}
            onChange={(e) => handleInputChange(milestone.id, "name", e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md text-sm text-gray-900 border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          />
          {/* Date Input */}
          <input
            type="date"
            value={milestone.date}
            onChange={(e) => handleInputChange(milestone.id, "date", e.target.value)}
            className="w-36 px-3 py-2 border rounded-md text-sm text-gray-900 border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          />
          {/* Amount Input */}
          <input
            type="number"
            placeholder="Amount"
            value={milestone.amount}
            onChange={(e) => handleInputChange(milestone.id, "amount", e.target.value)}
            className="w-24 px-3 py-2 border rounded-md text-sm text-gray-900 border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          />
          {/* Remove Button */}
          {milestones.length > 1 && (
            <button
              onClick={() => removeMilestone(milestone.id)}
              className="px-2 py-1 text-red-500 rounded-md text-sm"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      {/* Add Milestone Button */}
      <button
        onClick={addMilestone}
        className="mt-4 text-orange-600 hover:underline text-sm"
      >
        + Add milestone
      </button>
    </div>
  );
};

export default MilestoneForm;
