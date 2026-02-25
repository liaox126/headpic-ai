export interface Style {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export const styles: Style[] = [
  {
    id: "corporate",
    name: "Corporate",
    description: "Classic professional look with suit and tie",
    prompt:
      'Transform this photo into a professional corporate headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. Detect the person\'s gender from the photo and dress them appropriately: male in a dark navy suit with white dress shirt and subtle tie; female in a tailored dark navy blazer with a professional white or light-colored top. Do not add jewelry or accessories unless already present in the original photo. Soft neutral gray studio background, professional studio lighting with soft shadows, sharp focus, high resolution. Crop to head and shoulders only. The person should look confident and approachable. Output only the image.',
  },
  {
    id: "business-casual",
    name: "Business Casual",
    description: "Relaxed professional with modern office vibe",
    prompt:
      'Transform this photo into a professional business casual headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. Detect the person\'s gender from the photo and dress them appropriately: male in a light blue oxford shirt with no tie, top button undone; female in a smart casual blouse or lightweight knit top in soft blue or neutral tones. Do not add jewelry or accessories unless already present in the original photo. Modern office environment slightly blurred in background with warm lighting, natural and relaxed expression, soft professional lighting. Crop to head and shoulders only. Output only the image.',
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic style with warm tones and bokeh",
    prompt:
      'Transform this photo into a creative professional headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. Detect the person\'s gender from the photo and dress them in a gender-appropriate dark crew neck or turtleneck sweater that looks natural for their appearance. Do not add jewelry or accessories unless already present in the original photo. Warm bokeh background with soft golden tones, artistic lighting with slight rim light, confident relaxed expression, modern tech company style. Crop to head and shoulders only. Output only the image.',
  },
  {
    id: "startup",
    name: "Startup",
    description: "Clean minimal Silicon Valley founder look",
    prompt:
      'Transform this photo into a startup founder headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. Detect the person\'s gender from the photo and dress them in a clean, simple black t-shirt or fitted black top appropriate for their appearance. Do not add jewelry or accessories unless already present in the original photo. Clean white or very light background, bright even lighting, friendly confident smile, Silicon Valley startup vibe, clean and minimal. Crop to head and shoulders only. Output only the image.',
  },
  {
    id: "formal",
    name: "Formal",
    description: "Executive portrait with dramatic lighting",
    prompt:
      'Transform this photo into a formal executive headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. Detect the person\'s gender from the photo and dress them appropriately: male in a charcoal gray three-piece suit with white shirt and dark tie; female in an elegant charcoal gray blazer with a refined silk or satin top. Do not add jewelry or accessories unless already present in the original photo. Deep blue gradient studio background, dramatic professional lighting, authoritative but approachable expression. Crop to head and shoulders only. Output only the image.',
  },
];
