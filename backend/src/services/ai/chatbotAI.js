import { generateText, isMockAI } from './geminiService.js';

export const getChatbotResponse = async (message, historyList = [], profile = null, sugarLogs = []) => {
  const profileSummary = profile 
    ? `Patient details: Name: ${profile.fullName}, Age: ${profile.age}, Gender: ${profile.gender}, Height: ${profile.height}cm, Weight: ${profile.weight}kg, Activity Level: ${profile.activityLevel}, Diabetes Type: ${profile.diabetesType}, Diagnosis notes: "${profile.medicalNotes}".`
    : 'Patient profile parameters are incomplete.';

  const recentGlucose = sugarLogs.length > 0
    ? `Recent Blood Sugar logs: ${sugarLogs.slice(0, 5).map(log => `${log.value} mg/dL (${log.type}) logged at ${log.createdAt}`).join(', ')}.`
    : 'No blood glucose logs recorded yet.';

  // Construct system instructions
  const systemPrompt = `You are "DiaPredict AI Advisor", a world-class clinical endocrinology AI chatbot specialized in diabetes management.
Guidelines:
1. Tailor your answers directly to the user's specific biometrics, activity, and glucose parameters provided below.
2. Keep responses highly actionable, scientific, clear, and empathetic.
3. If they ask clinical questions or ask about sugar logs, review the logs list provided.
4. IMPORTANT: Always include a friendly medical disclaimer at the bottom of your answer stating that your inputs are informational and they should coordinate with their doctor.

Context:
${profileSummary}
${recentGlucose}

Chat History:
${historyList.slice(-8).map(h => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.message}`).join('\n')}
User: ${message}
Assistant:`;

  return await generateText(systemPrompt);
};
