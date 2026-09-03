"use server";

type TutorMode = "translate" | "correct" | "vocabulary" | "conversation" | "quiz";

const prompts: Record<TutorMode, string> = {
  translate: "You are a patient English tutor for Hindi-speaking beginners. Translate the Hindi input into natural English, then explain pronunciation, word meanings, grammar in simple Hindi, and give three similar sentences. Return concise Markdown with headings.",
  correct: "You are a patient English tutor for Hindi-speaking beginners. Correct the learner's English. Show the original, natural correction, a clear Hindi explanation, the grammar concept, two examples, and three short practice questions. Be encouraging, never shame the learner. Return concise Markdown with headings.",
  vocabulary: "You are an English vocabulary tutor for a Hindi-speaking beginner. Teach one useful everyday word with pronunciation, Hindi meaning, part of speech, example, Hindi translation, synonyms, antonyms, and three quick practice questions. Return concise Markdown with headings.",
  conversation: "You are a friendly English conversation partner for a Hindi-speaking learner. Reply in simple English, ask one natural follow-up question, and only add a short Hindi explanation if the learner may be confused. Keep it practical and encouraging.",
  quiz: "You are an English teacher for Hindi-speaking beginners. Create one multiple-choice question about basic grammar or vocabulary, with four options. After the learner answer, explain the result in simple Hindi and give one example. Return concise Markdown.",
};

const fallback: Record<TutorMode, string> = {
  translate: "### English Translation\nI wake up early every morning.\n\n### Hindi explanation\nयह आदत बताने वाला वाक्य है। ‘I’ के बाद verb का base form आता है। ‘Every morning’ समय बताता है।\n\n### Word help\n- मैं = I\n- रोज़ सुबह = every morning\n- जल्दी = early\n- उठता हूँ = wake up\n\n### Try next\n1. I usually wake up early.\n2. I wake up at 6 AM.\n3. I wake up late on Sundays.",
  correct: "### Almost!\n**You wrote:** I am go to market yesterday.\n\n### Natural English\n**I went to the market yesterday.**\n\n### Hindi explanation\n‘Yesterday’ बताता है कि घटना past में हुई थी। इसलिए ‘go’ का past form ‘went’ होगा। यहाँ ‘am’ की ज़रूरत नहीं है।\n\n### Grammar concept\nSimple Past Tense\n\n### Practice\n1. She ___ to Delhi last week.\n2. We ___ dinner at 8 PM.\n3. I ___ a movie yesterday.",
  vocabulary: "### Word of the day\n**Notice**\n\n**Pronunciation:** noh-tis\n**Hindi:** ध्यान देना / सूचना\n**Part of speech:** Verb / Noun\n\n**Example:** Did you notice the new sign?\n**Hindi:** क्या तुमने नया sign देखा?\n\n**Similar words:** observe, see\n\n### Quick practice\n1. Notice the difference.\n2. I noticed her new bag.\n3. Did you notice the time?",
  conversation: "That sounds good! I also enjoy learning new things. What do you usually do in the morning?\n\n*Hint:* ‘usually’ means ‘आमतौर पर’. Try answering in one short English sentence.",
  quiz: "### Question 01\nChoose the correct sentence:\n\nA. He go to school.\nB. He goes to school.\nC. He going school.\nD. He is go school.\n\n**Answer:** B\n\n### Why?\n‘He’ के साथ present simple में verb में **-s** आता है: he goes.",
};

export async function askTutor(mode: TutorMode, input: string) {
  const cleanInput = input.trim();
  if (!cleanInput) return "Please add a sentence first.";
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fallback[mode];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-latest",
      max_tokens: 700,
      system: prompts[mode],
      messages: [{ role: "user", content: cleanInput }],
    }),
    cache: "no-store",
  });

  if (!response.ok) return fallback[mode];
  const payload = (await response.json()) as { content?: Array<{ type: string; text?: string }> };
  return payload.content?.find((item) => item.type === "text")?.text ?? fallback[mode];
}
