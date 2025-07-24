// advanced-career-quiz.service.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048,
    }
});

interface QuizQuestion {
    id: number;
    question: string;
    options?: {
        text: string;
        value: string;
    }[];
}

interface UserAnswer {
    questionId: number;
    answer: string;
    timestamp: Date;
}

interface QuizSession {
    userId: string;
    threadId: string;
    currentQuestion: number;
    completed: boolean;
    questions: QuizQuestion[];
    answers: UserAnswer[];
    careerSuggestions?: CareerSuggestion[];
}

interface CareerSuggestion {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
    salaryRange: string;
    educationPath: string;
    jobMarket: 'high' | 'medium' | 'low';
    fitScore: number;
}

const quizSessions: Record<string, QuizSession> = {};

export async function startQuiz(userId: string, threadId: string): Promise<QuizQuestion> {
    const firstQuestion = await generateNextQuestion([], []);
    quizSessions[threadId] = {
        userId,
        threadId,
        currentQuestion: 1,
        completed: false,
        questions: [firstQuestion],
        answers: []
    };

    return firstQuestion;
}
export async function submitAnswer(
    threadId: string,
    answer: string
): Promise<QuizQuestion | { careerSuggestions: CareerSuggestion[] }> {
    const session = quizSessions[threadId];
    if (!session) throw new Error("Quiz session not found");

    // Store answer with validation
    const currentQuestion = session.questions[session.questions.length - 1];
    session.answers.push({
        questionId: currentQuestion.id,
        answer: answer.trim(),
        timestamp: new Date()
    });

    if (session.answers.length >= 10) {
        session.completed = true;
        session.careerSuggestions = await generateCareerSuggestions(session.questions, session.answers);
        return { careerSuggestions: session.careerSuggestions };
    }
    const nextQuestion = await generateNextQuestion(session.questions, session.answers);
    session.questions.push(nextQuestion);
    session.currentQuestion++;

    return nextQuestion;
}

async function generateNextQuestion(
    previousQuestions: QuizQuestion[],
    previousAnswers: UserAnswer[]
): Promise<QuizQuestion> {
    const nextId = previousQuestions.length + 1;

    try {
        let prompt = `As a career counseling expert, generate ${nextId === 1 ?
            'a broad introductory' : 'a targeted follow-up'} career assessment question.`;

        if (previousQuestions.length > 0) {
            prompt += `\n\nContext from previous answers:`;
            previousAnswers.forEach((ans, idx) => {
                prompt += `\nQ${idx + 1}: ${previousQuestions[idx].question}\nA: ${ans.answer}`;
            });
        }

        prompt += `\n\nGenerate a question with 3-4 multiple choice options that:
    - Relates to work preferences, skills, or values
    - Helps identify suitable career paths
    - Avoids yes/no questions
    
    Format response strictly as JSON:
    {
      "id": ${nextId},
      "question": "Your question here?",
      "options": [
        {"text": "Option 1", "value": "opt1"},
        {"text": "Option 2", "value": "opt2"}
      ]
    }`;

        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        const parsed = extractAndParseJSON(response);

        // Validate structure
        if (!parsed.question || !Array.isArray(parsed.options) || parsed.options.length < 2) {
            throw new Error("Invalid question structure from AI");
        }

        return {
            id: nextId,
            question: parsed.question.trim(),
            options: parsed.options.map((opt: { text: string; value: string; }) => ({
                text: opt.text?.trim() || "",
                value: opt.value?.trim() || opt.text?.trim().toLowerCase().replace(/\s+/g, '_') || ""
            }))
        };
    } catch (error) {
        console.error("Question generation error:", error);
        return getFallbackQuestion(nextId);
    }
}

async function generateCareerSuggestions(
    questions: QuizQuestion[],
    answers: UserAnswer[]
): Promise<CareerSuggestion[]> {
    try {
        const qaHistory = questions.map((q, i) =>
            `Q${i + 1}: ${q.question}\nA: ${answers[i]?.answer || "N/A"}`
        ).join("\n\n");

        const prompt = `Act as a professional career counselor. Analyze these career assessment responses and suggest 3-5 career paths:
    
    ${qaHistory}
    
    For each career, provide:
    - Title: Career title
    - description: 1-2 sentence overview
    - pros: 3 advantages (bullet points)
    - cons: 3 challenges (bullet points)
    - salaryRange: Typical US salary range
    - educationPath: Required education/certifications
    - jobMarket: Demand level (high/medium/low)
    - fitScore: 0-100 match score
    
    Important:
    - Fit scores should vary meaningfully between careers
    - Include both traditional and emerging careers
    - Suggest at least one unconventional option
    
    Format output as a JSON array ONLY:
    [
      { 
        "title": "...",
        "description": "...",
        "pros": ["...", "...", "..."],
        "cons": ["...", "...", "..."],
        "salaryRange": "...",
        "educationPath": "...",
        "jobMarket": "...",
        "fitScore": ...
      }
    ]`;

        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        const suggestions: CareerSuggestion[] = extractAndParseJSON(response);

        // Validate and normalize suggestions
        return suggestions
            .filter(s => s.title && s.description)
            .map(s => ({
                title: s.title.trim(),
                description: s.description.trim(),
                pros: s.pros.slice(0, 3),
                cons: s.cons.slice(0, 3),
                salaryRange: s.salaryRange || "Varies by location/experience",
                educationPath: s.educationPath || "Typically requires relevant education/training",
                jobMarket: ["high", "medium", "low"].includes(s.jobMarket) ? s.jobMarket : "medium",
                fitScore: Math.min(100, Math.max(0, s.fitScore || 50))
            }))
            .sort((a, b) => b.fitScore - a.fitScore);
    } catch (error) {
        console.error("Suggestion generation error:", error);
        return getFallbackSuggestions();
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractAndParseJSON(text: string): any {
    const jsonPattern = /```json\n?([\s\S]*?)\n?```|({[\s\S]*})|(\[[\s\S]*\])/;
    const match = text.match(jsonPattern);

    try {
        return match ? JSON.parse(match[1] || match[0]) : JSON.parse(text);
    } catch {
        // Final fallback to prevent complete failure
        return {};
    }
}


export function getQuizSession(threadId: string): QuizSession | undefined {
    return quizSessions[threadId];
}
function getFallbackQuestion(id: number): QuizQuestion {
    const fallbacks = [
        {
            question: "Which activities energize you most?",
            options: [
                "Solving complex problems",
                "Creating artistic works",
                "Helping others directly",
                "Analyzing data/patterns"
            ]
        },
        {
            question: "What's your preferred learning style?",
            options: [
                "Hands-on practice",
                "Theoretical study",
                "Collaborative projects",
                "Self-directed exploration"
            ]
        }
    ];

    const fallback = fallbacks[id % fallbacks.length] || fallbacks[0];
    return {
        id,
        question: fallback.question,
        options: fallback.options.map((opt, i) => ({
            text: opt,
            value: `opt${i + 1}`
        }))
    };
}
function getFallbackSuggestions(): CareerSuggestion[] {
    return [
        {
            title: "UX/UI Designer",
            description: "Design intuitive digital experiences for websites and applications",
            pros: [
                "High creativity in problem-solving",
                "Growing demand across industries",
                "Opportunity to impact user satisfaction"
            ],
            cons: [
                "Subjective feedback on designs",
                "Need to balance user needs with business goals",
                "Rapidly evolving tools and standards"
            ],
            salaryRange: "$75,000 - $120,000",
            educationPath: "Bachelor's in design + portfolio, bootcamps",
            jobMarket: "high",
            fitScore: 82
        },
        {
            title: "Data Scientist",
            description: "Extract insights from complex datasets to drive decision-making",
            pros: [
                "High earning potential",
                "Applicable across diverse industries",
                "Intellectually challenging work"
            ],
            cons: [
                "Requires advanced technical skills",
                "Can involve cleaning messy data",
                "Need to constantly update skills"
            ],
            salaryRange: "$95,000 - $150,000",
            educationPath: "Advanced degree in statistics/computer science",
            jobMarket: "high",
            fitScore: 78
        }
    ];
}
export function getCareerSuggestionDetails(
    threadId: string,
    suggestionIndex: number
): CareerSuggestion | null {
    const session = quizSessions[threadId];
    if (!session || !session.careerSuggestions) {
        return null;
    }

    if (suggestionIndex >= session.careerSuggestions.length || suggestionIndex < 0) {
        return null;
    }

    return session.careerSuggestions[suggestionIndex];
}