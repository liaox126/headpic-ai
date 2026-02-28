export async function generateHeadshot(
  images: string[],
  stylePrompt: string,
): Promise<string> {
  // Build content array: prompt text + all reference images
  const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
    { type: "text", text: stylePrompt },
  ];

  // Add all reference images
  for (const imageBase64 of images) {
    content.push({
      type: "image_url",
      image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
    });
  }

  // If multiple images, prepend instruction
  if (images.length > 1) {
    content[0].text = `I'm providing ${images.length} reference photos of the same person from different angles. Use ALL of them to accurately capture this person's appearance.\n\n${stylePrompt}`;
  }

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
            content,
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
  const message = data.choices?.[0]?.message;

  if (!message) {
    throw new Error("No message in AI response");
  }

  // Check for inline_data parts (Gemini native format via relay)
  if (Array.isArray(message.content)) {
    for (const part of message.content) {
      if (part.type === "image_url" && part.image_url?.url) {
        const match = part.image_url.url.match(/^data:image\/[a-z]+;base64,(.+)/);
        if (match) return match[1];
      }
    }
  }

  const content_str = typeof message.content === "string" ? message.content : JSON.stringify(message.content);

  // Parse markdown image format: ![image](data:image/png;base64,...)
  const match = content_str.match(
    /!\[.*?\]\(data:image\/[a-z]+;base64,([A-Za-z0-9+/=]+)\)/
  );
  if (match && match[1]) {
    return match[1];
  }

  // Fallback: try to extract raw base64 if no markdown wrapper
  const base64Match = content_str.match(
    /data:image\/[a-z]+;base64,([A-Za-z0-9+/=]+)/
  );
  if (base64Match && base64Match[1]) {
    return base64Match[1];
  }

  throw new Error("Could not extract image from AI response");
}
