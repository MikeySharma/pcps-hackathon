import { GoogleGenerativeAI } from "@google/generative-ai";
import { BufferMemory } from "langchain/memory";
import { ChatMessageHistory } from "langchain/memory";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "your-google-api-key");

const SYSTEM_PROMPT = `You are KaamSathi, a friendly AI career advisor for Nepali youth. Follow these guidelines:

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

5. SUGGESTIONS:
- After the main answer, include 3-4 short follow-up questions
- Always output suggestions as **pure JSON** on the last line
- Format must be exactly: {"suggestions": ["question 1", "question 2"]}
- The JSON must be the very last content in your response`;

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

export async function getAIResponse(
  question: string,
  threadId: string
): Promise<{ response: string; suggestions: string[] }> {
  try {
    const memory = getMemoryForThread(threadId);

    // Add user message to history
    await memory.chatHistory.addMessage(new HumanMessage({ content: question }));

    // Get conversation history and include system prompt
    const messages = [
      ...(await memory.chatHistory.getMessages()),
      new SystemMessage(SYSTEM_PROMPT),
    ];

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Convert messages to Gemini format
    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg._getType() === "human" ? "user" : "model",
        parts: [{ text: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content) }],
      })),
    });

    // Get AI response
    const result = await chat.sendMessage(question);
    const response = result.response;
    const fullText = response.text();

    // Improved suggestion extraction with guaranteed removal
    let suggestions: string[] = [];
    let cleanResponse = fullText;

    // First try to find JSON at the end (most common case)
    const jsonEndPattern = /\{\s*"suggestions"\s*:\s*\[.*\]\s*\}\s*$/;
    const jsonMatch = fullText.match(jsonEndPattern);

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed && Array.isArray(parsed.suggestions)) {
          suggestions = parsed.suggestions
            .filter((s: string) => typeof s === 'string')
            .map((s: string) => s.trim())
            .filter(Boolean);

          cleanResponse = fullText.replace(jsonEndPattern, '').trim();
        }
      } catch (err) {
        console.warn("Failed to parse end-of-response suggestions JSON:", err);
      }
    }

    // If not found at end, search anywhere in response
    if (suggestions.length === 0) {
      const jsonAnywherePattern = /\{\s*"suggestions"\s*:\s*\[.*\]\s*\}/;
      const anywhereMatch = fullText.match(jsonAnywherePattern);

      if (anywhereMatch) {
        try {
          const parsed = JSON.parse(anywhereMatch[0]);
          if (parsed && Array.isArray(parsed.suggestions)) {
            suggestions = parsed.suggestions
              .filter((s: string) => typeof s === 'string')
              .map((s: string) => s.trim())
              .filter(Boolean);

            cleanResponse = fullText.replace(jsonAnywherePattern, '').trim();
          }
        } catch (err) {
          console.warn("Failed to parse anywhere-in-response suggestions JSON:", err);
        }
      }
    }

    // Fallback if no valid JSON found
    if (suggestions.length === 0) {
      suggestions = [
        "What are the best career options in Nepal right now?",
        "How can I improve my skills for better jobs?",
        "What are the average salaries for entry-level positions?"
      ];
    }

    // Final cleanup of response (remove any leftover JSON artifacts)
    cleanResponse = cleanResponse
      .replace(/\{\s*"suggestions"\s*:\s*\[.*\]\s*\}/g, '')
      .trim();

    // Add assistant response to memory (without system prompt)
    await memory.chatHistory.addMessage(new AIMessage({
      content: cleanResponse,
      additional_kwargs: {
        suggestions: suggestions,
      },
    }));

    return {
      response: cleanResponse,
      suggestions: suggestions,
    };
  } catch (error) {
    console.error("AI response error:", error);
    throw new Error("Failed to process your request. Please try again.");
  }
}