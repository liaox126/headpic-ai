export async function generateHeadshot(
  imageBase64: string,
  stylePrompt: string
): Promise<string> {
  const response = await fetch(
    `${process.env.AI_API_BASE_URL}/chat/completions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: stylePrompt },
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
              },
            ],
          },
        ],
        max_tokens: 4096,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in AI response");
  }

  // Parse markdown image format: ![image](data:image/png;base64,...)
  const match = content.match(
    /!\[.*?\]\(data:image\/[a-z]+;base64,([A-Za-z0-9+/=]+)\)/
  );
  if (match && match[1]) {
    return match[1];
  }

  // Fallback: try to extract raw base64 if no markdown wrapper
  const base64Match = content.match(
    /data:image\/[a-z]+;base64,([A-Za-z0-9+/=]+)/
  );
  if (base64Match && base64Match[1]) {
    return base64Match[1];
  }

  throw new Error("Could not extract image from AI response");
}
