import { generateJSON } from './geminiService.js';

export const predictHealthRisks = async (profile, sugarLogs = []) => {

  const prompt = `You are a clinical diabetes data analyst. Analyze this patient's profile and glucose logs history to calculate clinical risks:
- Age: ${profile.age}
- Height: ${profile.height}cm
- Weight: ${profile.weight}kg
- Activity: ${profile.activityLevel}
- Type: ${profile.diabetesType}
- Medical details: "${profile.medicalNotes}"
- Glucose Logs: ${sugarLogs.slice(0, 15).map(log => `${log.value} mg/dL (${log.type}) at ${log.createdAt}`).join(', ')}

Format the response EXACTLY as a JSON object matching this structure:
{
  "diabetesRisk": {
    "level": "Low or Medium or High",
    "confidenceScore": 85,
    "explanation": "Brief description of factors...",
    "prevention": ["Action 1", "Action 2"]
  },
  "hyperglycemiaRisk": {
    "level": "Low or Medium or High",
    "confidenceScore": 90,
    "explanation": "Review of high blood sugar frequency...",
    "prevention": ["Drink water", "Saunter walks"]
  },
  "hypoglycemiaRisk": {
    "level": "Low or Medium or High",
    "confidenceScore": 75,
    "explanation": "Review of low blood sugar frequency...",
    "prevention": ["Carry fruit juice", "Check glucose before sleep"]
  }
}

Ensure the JSON is valid, only return the JSON, no markdown formatting.`;

  const result = await generateJSON(prompt);
  if (!result) {
    throw new Error('Failed to generate health risk prediction JSON response from Gemini API.');
  }

  return result;
};
