import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ThreatAnalysis {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: 'CYBERBULLYING' | 'SCAM' | 'MALICIOUS_LINK' | 'HARRASSMENT' | 'SAFE';
  confidence: number;
  explanation: string;
  suggestedAction: string;
}

export async function analyzeIncident(text: string): Promise<ThreatAnalysis> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following content for cyberbullying, scams, or malicious threats. Content: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
            category: { type: Type.STRING, enum: ['CYBERBULLYING', 'SCAM', 'MALICIOUS_LINK', 'HARRASSMENT', 'SAFE'] },
            confidence: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            suggestedAction: { type: Type.STRING }
          },
          required: ['riskLevel', 'category', 'confidence', 'explanation', 'suggestedAction']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      riskLevel: 'LOW',
      category: 'SAFE',
      confidence: 0,
      explanation: "Analysis failed due to technical error.",
      suggestedAction: "Please try again later."
    };
  }
}

export async function analyzeImage(base64Image: string): Promise<ThreatAnalysis> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            { text: "Analyze this image for potential cyber threats, explicit content, bullying, or scam indicators (e.g. fake crypto giveaways, phishing QR codes)." },
            {
              inlineData: {
                data: base64Image.split(',')[1] || base64Image,
                mimeType: "image/jpeg"
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
            category: { type: Type.STRING, enum: ['CYBERBULLYING', 'SCAM', 'MALICIOUS_LINK', 'HARRASSMENT', 'SAFE'] },
            confidence: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            suggestedAction: { type: Type.STRING }
          },
          required: ['riskLevel', 'category', 'confidence', 'explanation', 'suggestedAction']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Image analysis failed:", error);
    return {
      riskLevel: 'LOW',
      category: 'SAFE',
      confidence: 0,
      explanation: "Image analysis failed.",
      suggestedAction: "Check image format and try again."
    };
  }
}
