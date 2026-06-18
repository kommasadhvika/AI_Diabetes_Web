import { generateText } from './geminiService.js';

export const generateWeeklySummaryText = async (profile, stats) => {
  const prompt = `You are a clinic supervisor reviewing a patient's weekly logs. Write a professional, detailed 2-paragraph health compliance summary.
Patient profile: Name ${profile.fullName}, Diagnosis: ${profile.diabetesType}
Weekly stats:
- Average Fasting Glucose: ${stats.avgFasting || 'N/A'} mg/dL
- Average Post-Meal Glucose: ${stats.avgPostMeal || 'N/A'} mg/dL
- Total Physical Exercise Duration: ${stats.totalExerciseMin || 0} minutes
- Total Calories Burned: ${stats.totalCalBurned || 0} kcal
- Average Hydration Intake: ${stats.avgWaterIntake || 0} mL/day
- Scheduled Appointments: ${stats.appointmentsCount || 0}

Ensure the report includes advice on diet adjustments, checks compliance score, and maintains strict clinical professionalism.`;

  try {
    return await generateText(prompt);
  } catch (error) {
    console.error('Error generating summary text via Gemini:', error.message);
    throw error;
  }
};
