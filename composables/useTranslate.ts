// import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function handleTranslate(
  sourceText: string,
  selectedLanguage: string,
  sk: string
) {
  try {
    const genAI = new GoogleGenerativeAI(sk);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are translator.
          - Translate sentence into ${selectedLanguage}
          - The sentence is: ${sourceText}
           Do not return anything other than the translated sentence.`;

    const result = await model.generateContent(prompt);

    const data = result.response.text();

    return data;
  } catch (error: any) {
    console.log("Error translating text:", error.error);
    throw createError({
      statusCode: error.error?.statusCode || error.error?.code || 404,
      statusMessage: error.error?.statusMessage || "Error translating",
      message: error.error?.message,
    });
  }
}

export const useTranslate = async (
  sourceText: string,
  selectedLanguage: string
): Promise<string | undefined> => {
  const { $config } = useNuxtApp();
  const sk = $config.public.GEMINI_KEY;

  let targetText;
  if (sourceText.trim()) {
    const data = await handleTranslate(sourceText, selectedLanguage, sk);
    targetText = data;
  }

  return targetText;
};
