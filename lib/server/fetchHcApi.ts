"use server";

export async function chatCompletion({
  model,
  message,
}: {
  model: string;
  message: string;
}) {
  const res = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
