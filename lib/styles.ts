export interface Style {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

// Core identity preservation instruction - shared across all styles
const IDENTITY_ANCHOR = `Using the provided photo as reference, edit ONLY the clothing, background, and lighting. 
You MUST preserve the person's exact facial structure, eye shape, eye color, nose shape, lip shape, jawline, face proportions, facial hair (if any), hairstyle, hair color, glasses (if any), moles, freckles, and all distinguishing facial features exactly as they appear. 
Apply very subtle, natural-looking skin enhancement: slightly even out skin tone, minimally soften minor blemishes, and give a healthy, well-rested complexion — as if the person had great lighting and a good night's sleep. Do NOT alter facial structure, do NOT change skin color, and do NOT apply heavy or obvious retouching. The result must still look completely natural and realistic, like a real photograph — not airbrushed or filtered.
The result must look like the exact same person photographed in a professional setting with flattering lighting.`;

export const styles: Style[] = [
  {
    id: "corporate",
    name: "Corporate",
    description: "Classic professional look with suit and tie",
    prompt: `${IDENTITY_ANCHOR}
Change only the clothing and background: dress the person in gender-appropriate professional attire — male: dark navy suit with white dress shirt and subtle tie; female: tailored dark navy blazer with professional white top. Do not add any accessories not in the original photo.
Set against a soft neutral gray studio background with professional three-point lighting creating gentle shadows. Photorealistic close-up portrait, head and shoulders only, captured with an 85mm portrait lens, sharp focus. The person looks confident and approachable. Output only the image.`,
  },
  {
    id: "business-casual",
    name: "Business Casual",
    description: "Relaxed professional with modern office vibe",
    prompt: `${IDENTITY_ANCHOR}
Change only the clothing and background: dress the person in gender-appropriate business casual — male: light blue oxford shirt, no tie, top button undone; female: smart casual blouse or lightweight knit in soft blue or neutral tones. Do not add any accessories not in the original photo.
Set in a modern office environment, slightly blurred in the background with warm natural lighting. Photorealistic close-up portrait, head and shoulders only, captured with an 85mm portrait lens. Natural, relaxed expression. Output only the image.`,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic style with warm tones and bokeh",
    prompt: `${IDENTITY_ANCHOR}
Change only the clothing and background: dress the person in a gender-appropriate dark crew neck or turtleneck sweater. Do not add any accessories not in the original photo.
Set against a warm bokeh background with soft golden tones. Artistic rim lighting from behind, creating a subtle glow around the shoulders. Photorealistic close-up portrait, head and shoulders only, modern tech company aesthetic. Output only the image.`,
  },
  {
    id: "startup",
    name: "Startup",
    description: "Clean minimal Silicon Valley founder look",
    prompt: `${IDENTITY_ANCHOR}
Change only the clothing and background: dress the person in a clean, simple black t-shirt or fitted black top appropriate for their gender. Do not add any accessories not in the original photo.
Set against a clean white or very light background with bright, even studio lighting. Photorealistic close-up portrait, head and shoulders only, Silicon Valley startup founder aesthetic, clean and minimal. Friendly confident expression. Output only the image.`,
  },
  {
    id: "formal",
    name: "Formal",
    description: "Executive portrait with dramatic lighting",
    prompt: `${IDENTITY_ANCHOR}
Change only the clothing and background: dress the person in gender-appropriate formal executive attire — male: charcoal gray three-piece suit with white shirt and dark tie; female: elegant charcoal gray blazer with refined silk top. Do not add any accessories not in the original photo.
Set against a deep blue gradient studio background with dramatic professional lighting creating depth. Photorealistic close-up portrait, head and shoulders only, captured with an 85mm portrait lens. Authoritative but approachable expression. Output only the image.`,
  },
];
