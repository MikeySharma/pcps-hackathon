import { GoogleGenerativeAI } from "@google/generative-ai";
import { BufferMemory } from "langchain/memory";
import { ChatMessageHistory } from "langchain/memory";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

// Load environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "your-google-api-key");

// Career guidance system prompts
// Career guidance system prompts
const SYSTEM_PROMPTS = {
  CAREER_ADVISOR: `You are KaamSathi, a friendly AI career advisor for Nepali youth. Follow these guidelines:
  
  1. RESPONSE STYLE:
  - Be extremely concise (1-2 short paragraphs max)
  - Use simple language and short sentences
  - Present information in bullet points when possible
  - Keep answers focused and practical
  
  2. CONTENT PRIORITIES:
  - Provide key facts first
  - Highlight most important steps
  - Give specific examples when helpful
  - Include Nepali context (salaries, opportunities)
  
  3. BILINGUAL SUPPORT:
  - Respond in the user's language (Nepali/English)
  - Keep technical terms minimal
  - Explain complex concepts simply

  4. FORMATTING:
  - Use clear section headings
  - Break down complex answers
  - End with clear next steps
  
  Example good response:
  "Software Engineer in Nepal:
  - Avg salary: NPR 50k-150k/month
  - Top skills: Python, JavaScript
  - First steps: Learn basics online, join coding bootcamp
  - Resources: freeCodeCamp, CSIT syllabus"`,
};
// Local memory store per thread
const threadMemoryMap = new Map<string, BufferMemory>();

export function getMemoryForThread(threadId: string): BufferMemory {
  if (!threadMemoryMap.has(threadId)) {
    const memory = new BufferMemory({
      chatHistory: new ChatMessageHistory(),
      returnMessages: true,
      memoryKey: "history",
      inputKey: "input",
      outputKey: "output",
    });
    threadMemoryMap.set(threadId, memory);
  }
  return threadMemoryMap.get(threadId)!;
}

export async function getAIResponse(question: string, threadId: string): Promise<string> {
  try {
    // Get memory for this thread
    const memory = getMemoryForThread(threadId);
    
    // Add user message to memory
    await memory.chatHistory.addMessage(new HumanMessage({ content: question }));

    // Get conversation history
    const messages = [
      ...await memory.chatHistory.getMessages(),
      new SystemMessage(SYSTEM_PROMPTS.CAREER_ADVISOR),
    ];

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    
    // Convert messages to Gemini format
    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg._getType() === "human" ? "user" : "model",
        parts: [{ text: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content) }],
      })),
    });

    // Get AI response
    const result = await chat.sendMessage(question);
    const response = await result.response;
    const text = response.text();

    // Add AI response to memory
    await memory.chatHistory.addMessage(new AIMessage({ content: text }));

    return text;

  } catch (error) {
    console.error("AI response error:", error);
    throw new Error("Failed to process your request. Please try again.");
  }
}