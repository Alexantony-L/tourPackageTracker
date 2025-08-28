const parseRange = (rangeStr) => {
  const match = rangeStr.match(/\d+/g);
  return match ? match.map(Number) : [];
};

export const promptFormater = (data) => {
  const {
    destination,
    currentLocation,
    budget,
    duration,
    groupSize,
    preferences,
  } = data;
  const[minBudget, maxBudget] = parseRange(budget); // e.g., [10, 25]
  const [minDays, maxDays] = parseRange(duration); // e.g., [3, 5]
  const [minGroup, maxGroup] = parseRange(groupSize);

return `You are an expert travel researcher. Based on the user's preferences, return a strictly valid JSON array of travel packages from agencies near the user's current location.

📋 User Input:
- Destination: ${destination}
- Current Location: ${currentLocation}
- Budget Range: ₹${minBudget * 1000} - ₹${maxBudget * 1000}
- Duration Range: ${minDays} to ${maxDays} days
- Group Size: ${minGroup} to ${maxGroup} people

🧾 Preferences:
- Food Included: ${preferences.foodIncluded ? "Yes" : "No"}
- Accommodation Type: ${preferences.accommodationType}
- Transport Included: ${preferences.transportIncluded ? "Yes" : "No"}

🎯 Your Task:
1. Search for multiple tour agencies near the user's location offering packages to the specified destination.
2. Match as many user preferences as possible, especially food, accommodation type, and transport.
3. If packages are within the budget range, include them with "AboveBudget": false.
4. If NO packages are found within budget, include alternatives and mark "AboveBudget": true.
5. Return ONLY a valid JSON array of 1–5 packages in this format:

[
  {
    "Agency Name": "string",
    "Contact Person": "string",
    "Contact Information": {
      "Phone": "string",
      "Email": "string",
      "Website": "string"
    },
    "Travel Package Details": {
      "Package Name": "string",
      "Description": "string",
      "Photos": ["string", "string"],
      "Package Link": "string",
      "Pricing": "string",
      "Inclusions": ["string", "string"],
      "Exclusions": ["string", "string"]
    },
    "AboveBudget": true/false
  }
]

⚠️ If no matches found, return an empty array []. DO NOT include markdown, commentary, or explanations.`;


};
