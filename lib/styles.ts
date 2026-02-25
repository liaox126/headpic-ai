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
      'Transform this photo into a professional corporate headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. First, identify the person\'s gender from the photo. For male: dark navy blue suit with white dress shirt and subtle tie. For female: tailored dark navy blazer with elegant white blouse, optional pearl earrings. Match clothing to the person\'s gender naturally. Soft neutral gray studio background, professional studio lighting with soft shadows, sharp focus, high resolution. Crop to head and shoulders only. The person should look confident and approachable. Output only the image.',
  },
  {
    id: "business-casual",
    name: "Business Casual",
    description: "Relaxed professional with modern office vibe",
    prompt:
      'Transform this photo into a professional business casual headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. First, identify the person\'s gender from the photo. For male: light blue oxford shirt with no tie, top button undone. For female: soft cream or light blue blouse with subtle accessories, relaxed neckline. Match clothing to the person\'s gender naturally. Modern office environment slightly blurred in background with warm lighting, natural and relaxed expression, soft professional lighting. Crop to head and shoulders only. Output only the image.',
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic style with warm tones and bokeh",
    prompt:
      'Transform this photo into a creative professional headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. First, identify the person\'s gender from the photo. For male: dark crew neck sweater. For female: stylish dark turtleneck or elegant crew neck top. Match clothing to the person\'s gender naturally. Warm bokeh background with soft golden tones, artistic lighting with slight rim light, confident relaxed expression, modern tech company style. Crop to head and shoulders only. Output only the image.',
  },
  {
    id: "startup",
    name: "Startup",
    description: "Clean minimal Silicon Valley founder look",
    prompt:
      'Transform this photo into a startup founder headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. First, identify the person\'s gender from the photo. For male: simple black t-shirt. For female: clean black top or fitted black t-shirt. Match clothing to the person\'s gender naturally. Clean white or very light background, bright even lighting, friendly confident smile, Silicon Valley startup vibe, clean and minimal. Crop to head and shoulders only. Output only the image.',
  },
  {
    id: "formal",
    name: "Formal",
    description: "Executive portrait with dramatic lighting",
    prompt:
      'Transform this photo into a formal executive headshot. Keep the person\'s face, glasses (if any), hairstyle, and all facial features EXACTLY the same - this must be clearly recognizable as the same person. First, identify the person\'s gender from the photo. For male: charcoal gray three-piece suit with white shirt and dark tie. For female: elegant charcoal gray blazer with silk blouse, professional jewelry. Match clothing to the person\'s gender naturally. Deep blue gradient studio background, dramatic professional lighting, authoritative but approachable expression. Crop to head and shoulders only. Output only the image.',
  },
];
