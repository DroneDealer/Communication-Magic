const fetch = require("node-fetch");

async function askOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Please set OPENAI_API_KEY env variable.");
    return;
  }
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: "gpt-5-nano", //cheapest model muhaha
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    max_tokens: 100,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    const answer = data.choices[0].message.content;
    console.log("Response:", answer);
  } catch (err) {
    console.error(err);
  }
}

const userPrompt = process.argv.slice(2).join(" ");
if (!userPrompt) {
  console.error("Please provide a prompt as a command line argument.");
  process.exit(1);
}

askOpenAI(userPrompt); //send openai our question