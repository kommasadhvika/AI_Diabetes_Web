import { generateJSON } from './geminiService.js';
import { calculateCaloriesTarget } from '../aiService.js';

export const generateWeeklyDietPlan = async (profile, latestSugarReading = null) => {
  const calorieTarget = calculateCaloriesTarget(profile);
  const waterTargetLiters = parseFloat(((profile.weight * 35) / 1000).toFixed(1));

  const prompt = `You are a clinical diabetic nutritionist. Create a personalized, 7-day low glycemic index diet plan (from Monday to Sunday) for a patient with:
- Age: ${profile.age}
- Gender: ${profile.gender}
- Height: ${profile.height}cm
- Weight: ${profile.weight}kg
- Activity Level: ${profile.activityLevel}
- Diabetes Type / Diet Preference: ${profile.diabetesType}
- Medical details: "${profile.medicalNotes}"
${latestSugarReading ? `- Latest Blood Sugar reading: ${latestSugarReading.value} mg/dL (${latestSugarReading.type})` : ''}

Target daily calories: ${calorieTarget} kcal. Water: ${waterTargetLiters} Liters.

Format the response EXACTLY as a JSON object matching this structure:
{
  "dietType": "Indian-Vegetarian or match patient config",
  "calorieTarget": ${calorieTarget},
  "waterRecommendationLiters": ${waterTargetLiters},
  "groceryList": ["Ingredient1", "Ingredient2", ...],
  "aiExplanation": "A short summary explaining the glycemic index choices...",
  "schedule": [
    {
      "day": "Monday",
      "breakfast": {
        "name": "Meal name",
        "imageUrl": "Choose a highly relevant Unsplash photo URL representing this breakfast, e.g. https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&q=80",
        "calories": 250,
        "carbs": 30,
        "protein": 10,
        "fat": 5,
        "time": "08:00 AM",
        "glycemicImpact": "Low",
        "whyRecommended": "Explain why this is good for diabetes management."
      },
      "lunch": {
        "name": "Meal name",
        "imageUrl": "Choose a highly relevant Unsplash photo URL representing this lunch, e.g. https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
        "calories": 450,
        "carbs": 45,
        "protein": 20,
        "fat": 10,
        "time": "01:30 PM",
        "glycemicImpact": "Low",
        "whyRecommended": "Explain why this is good for diabetes management."
      },
      "snacks": {
        "name": "Meal name",
        "imageUrl": "Choose a highly relevant Unsplash photo URL representing this snack, e.g. https://images.unsplash.com/photo-1596560548464-f010689b7f4f?w=400&q=80",
        "calories": 100,
        "carbs": 12,
        "protein": 4,
        "fat": 3,
        "time": "05:00 PM",
        "glycemicImpact": "Low",
        "whyRecommended": "Explain why this is good for diabetes management."
      },
      "dinner": {
        "name": "Meal name",
        "imageUrl": "Choose a highly relevant Unsplash photo URL representing this dinner, e.g. https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
        "calories": 350,
        "carbs": 25,
        "protein": 18,
        "fat": 8,
        "time": "08:00 PM",
        "glycemicImpact": "Low",
        "whyRecommended": "Explain why this is good for diabetes management."
      },
      "totalCalories": 1150
    }
    // Repeat for Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday in the array
  ]
}

Suggested Unsplash Images mapping guidelines:
- Oatmeal / Porridge: https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&q=80
- Salad / Green Bowls: https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80
- Grilled Salmon / Fish: https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=400&q=80
- Paneer / Tofu dishes: https://images.unsplash.com/photo-1546069901-e234a49e63e2?w=400&q=80
- Nuts / Fruits snack: https://images.unsplash.com/photo-1596560548464-f010689b7f4f?w=400&q=80
- Eggs / Omelettes: https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80
- Quinoa / Brown Rice Bowls: https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80
- Soup / Broths: https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80
- General healthy food: https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80
- Tea / Herbal drink: https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80

Ensure you generate a complete 7-day schedule (Monday to Sunday) inside the "schedule" array. Make sure the JSON is valid and only return the JSON, no markdown formatting.`;

  const jsonResult = await generateJSON(prompt);
  
  if (!jsonResult) {
    throw new Error('Failed to generate weekly diet plan JSON response from Gemini API.');
  }

  return jsonResult;
};

