import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";

interface Challenge {
  number: number;
  title: string;
  difficulty: string;
  stars: number;
}

function getDifficultyEmoji(difficultyText: string): string {
  const upper = difficultyText.toUpperCase();
  if (upper.includes('DIFÍCIL') || upper.includes('DIFICIL')) return '🔴';
  if (upper.includes('MEDIO') || upper.includes('MEDIA')) return '🟠';
  if (upper.includes('FÁCIL') || upper.includes('FACIL')) return '🟢';
  return '🟢'; // default
}

async function extractTitleAndDifficultyFromReadme(year: number, day: number): Promise<{ title: string; difficulty: string } | null> {
  const dayStr = day.toString().padStart(2, '0');
  const readmePath = `./${year}/day${dayStr}/README.md`;
  
  try {
    const content = await Deno.readTextFile(readmePath);
    
    // Extract the first H1 heading (# Title)
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : null;
    
    if (!title) {
      return null;
    }
    
    // Extract difficulty from ## Dificultad: Facil/Media/Dificil
    const difficultyMatch = content.match(/^## Dificultad:\s*(\w+)$/mi);
    const difficultyText = difficultyMatch ? difficultyMatch[1].trim() : '';
    const difficulty = getDifficultyEmoji(difficultyText);
    
    return { title, difficulty };
  } catch (error) {
    console.error(`Could not read ${readmePath}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
}

async function loadScoresFromJson(year: number): Promise<Record<string, number>> {
  const jsonPath = `./${year}/scores.json`;
  
  try {
    const content = await Deno.readTextFile(jsonPath);
    const data = JSON.parse(content);
    
    // Convert string values to numbers if needed
    const scores: Record<string, number> = {};
    for (const [key, value] of Object.entries(data)) {
      scores[key] = typeof value === 'string' ? parseInt(value, 10) : value as number;
    }
    
    return scores;
  } catch (error) {
    console.error(`Could not read ${jsonPath}:`, error instanceof Error ? error.message : String(error));
    console.error('Using 0 stars for all challenges');
    return {};
  }
}

async function generateChallengesFromDays(year: number, maxDays: number = 25): Promise<Challenge[]> {
  const challenges: Challenge[] = [];
  
  console.error(`Generating README from day folders for year ${year}...`);
  
  // Load scores from JSON file
  const scoresData = await loadScoresFromJson(year);
  
  for (let day = 1; day <= maxDays; day++) {
    const dayStr = day.toString().padStart(2, '0');
    console.error(`Processing day ${dayStr}...`);
    
    // Extract title and difficulty from local README
    const readmeData = await extractTitleAndDifficultyFromReadme(year, day);
    
    if (!readmeData) {
      console.error(`⏭️  Skipping day ${dayStr} (no README or data found)`);
      continue;
    }
    
    // Get stars from scores.json file
    const stars = scoresData[day.toString()] || 0;
    
    challenges.push({
      number: day,
      title: readmeData.title,
      difficulty: readmeData.difficulty,
      stars: stars
    });
    
    console.error(`✅ Day ${dayStr}: ${readmeData.title} (${readmeData.difficulty} - ${stars} stars)`);
  }
  
  return challenges;
}

function generateReadmeTable(year: number, challenges: Challenge[]): string {
  let table = '|     #     | Challenge                                      | Difficulty | Stars earned |     Description      |\n';
  table += '| :-------: | ---------------------------------------------- | :--------: | :----------: | :------------------: |\n';
  
  let totalStars = 0;
  
  for (const challenge of challenges) {
    const num = challenge.number.toString().padStart(2, '0');
    const title = challenge.title.padEnd(46);
    const starsText = `**${challenge.stars}**`.padEnd(12);
    const description = `[Show](./${year}/day${num})`;
    
    table += `|    ${num}     | ${title} |     ${challenge.difficulty}     |    ${starsText} | ${description.padEnd(20)} |\n`;
    totalStars += challenge.stars;
  }
  
  table += `| **Total** |                                                |   **/**    |    **${totalStars}**    |        **/**         |\n`;
  
  return table;
}

function generateFullReadme(year: number, challenges: Challenge[]): string {
  const table = generateReadmeTable(year, challenges);
  
  return `<h1 align="center">
    AdventJS Solutions 🎅🎄
</h1>

<h4 align="center">
    Repository of <a href="https://adventjs.dev/" target="_blank">AdventJS<a> programming challenges by <a href="https://www.linkedin.com/in/midudev/" target="_blank">Midudev</a>.
</h4>

<p align="center">
    <a href="#----summary">Summary</a> •
    <a href="#----challenges">Challenges</a> •
    <a href="#----license">License</a> •
    <a href="#----acknowledgments">Acknowledgments</a> •
</p>

<p align="center">
    <img src="./adventjs-logo.png" width="625">
</p>

<h2>
    Summary
</h2>
<p>
    This repository serves as a housing solutions to programming challenges of <a href="https://adventjs.dev/" target="_blank">AdventJS<a>. AdventJS, a project developed by <a href="https://www.linkedin.com/in/midudev/" target="_blank">Midudev</a>, offers a platform for developers to improve JavaScript or TypeScript skills, through a series of daily challenges spanning 25 days. The challenge begins on December 1st and culminates on December 25th.
</p>

<h2>
    Challenges
</h2>

${table}

<h2>
    License
</h2>
<p>
    This repository is under <a href="./LICENSE" target="_blank">MIT License</a>, if you want to see what you are allowed to do with the content of this repository, please visit <a href="https://choosealicense.com/licenses/" target="_blank">choosealicense</a> for more information.
</p>

<h2>
    Acknowledgments
</h2>
<p>
    Thanks to <a href="https://www.linkedin.com/in/midudev/" target="_blank">Miguel Ángel Durán</a> to develop <a href="https://adventjs.dev/" target="_blank">AdventJS<a>.
</p>
`;
}

// CLI usage
if (import.meta.main) {
  const args = Deno.args;
  
  if (args.length < 1 || args.length > 2) {
    console.error('Usage: deno run --allow-read generate-readme-from-days.ts <year> [max_days]');
    console.error('Example: deno run --allow-read generate-readme-from-days.ts 2025');
    console.error('Example: deno run --allow-read generate-readme-from-days.ts 2025 10');
    console.error('');
    console.error('Note: This script expects:');
    console.error('  - A scores.json file at ./<year>/scores.json');
    console.error('  - README.md files at ./<year>/dayXX/README.md');
    Deno.exit(1);
  }

  const year = parseInt(args[0], 10);
  const maxDays = args[1] ? parseInt(args[1], 10) : 25;

  if (isNaN(year) || isNaN(maxDays)) {
    console.error('Year and max_days must be valid numbers');
    Deno.exit(1);
  }

  try {
    const challenges = await generateChallengesFromDays(year, maxDays);
    console.error(`Found ${challenges.length} challenges`);
    
    const readme = generateFullReadme(year, challenges);
    console.log(readme);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    Deno.exit(1);
  }
}