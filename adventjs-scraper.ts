import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";

interface ChallengeData {
  title: string;
  content: string;
}

function processNode(node: Element | ChildNode): string {
  let result = '';
  
  if (node.nodeType === 3) { // Text node
    return node.textContent || '';
  }
  
  if (node.nodeType !== 1) return ''; // Not an element
  
  const element = node as Element;
  const tagName = element.tagName?.toLowerCase() || '';
  
  switch (tagName) {
    case 'strong':
      result += `**${element.textContent}**`;
      break;
    case 'code':
      if (element.parentElement?.tagName.toLowerCase() !== 'pre') {
        result += `\`${element.textContent}\``;
      }
      break;
    case 'br':
      result += '\n';
      break;
    default:
      // Process children for other elements
      for (const child of element.childNodes) {
        result += processNode(child);
      }
  }
  
  return result;
}

function convertHtmlToMarkdown(element: Element): string {
  let markdown = '';
  
  for (const child of element.children) {
    const tagName = child.tagName.toLowerCase();
    
    if (tagName === 'p') {
      const text = processNode(child).trim();
      if (text) {
        markdown += `${text}\n\n`;
      }
    } else if (tagName === 'pre') {
      // Extract code blocks
      const codeElement = child.querySelector('code');
      if (codeElement) {
        const code = codeElement.textContent?.trim() || '';
        markdown += '```javascript\n';
        markdown += code + '\n';
        markdown += '```\n\n';
      }
    } else if (tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
      const heading = child.textContent?.trim() || '';
      const prefix = tagName === 'h2' ? '##' : tagName === 'h3' ? '###' : '####';
      markdown += `${prefix} ${heading}\n\n`;
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items = child.querySelectorAll('li');
      items.forEach((li) => {
        const text = processNode(li).trim();
        const bullet = tagName === 'ul' ? '-' : '1.';
        markdown += `${bullet} ${text}\n`;
      });
      markdown += '\n';
    } else if (tagName === 'div') {
      // Recursively process divs
      markdown += convertHtmlToMarkdown(child);
    }
  }
  
  return markdown;
}

async function scrapeAdventJSChallenge(year: number, day: number): Promise<ChallengeData> {
  const url = `https://adventjs.dev/es/challenges/${year}/${day}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch challenge: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    
    if (!doc) {
      throw new Error('Failed to parse HTML');
    }
    
    // Extract the challenge title from the span with class="text-center"
    const titleSpan = doc.querySelector('span.text-center');
    const title = titleSpan?.textContent?.trim() || `Reto #${day}`;
    
    // Extract the challenge content from div#challenge
    const challengeDiv = doc.querySelector('#challenge');
    
    if (!challengeDiv) {
      throw new Error('Could not find challenge content (div#challenge not found)');
    }
    
    // Extract description from .challenge-description if it exists
    const descriptionDiv = doc.querySelector('.challenge-description');
    
    let markdown = `# ${title}\n\n`;
    
    // First add content from #challenge div
    markdown += convertHtmlToMarkdown(challengeDiv);
    
    // Then add content from .challenge-description if it exists
    if (descriptionDiv) {
      markdown += convertHtmlToMarkdown(descriptionDiv);
    }
    
    return {
      title,
      content: markdown.trim()
    };
  } catch (error) {
    throw new Error(`Error scraping challenge: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// CLI usage
if (import.meta.main) {
  const args = Deno.args;
  
  if (args.length !== 2) {
    console.error('Usage: deno run --allow-net adventjs-scraper.ts <year> <day>');
    Deno.exit(1);
  }

  const year = parseInt(args[0], 10);
  const day = parseInt(args[1], 10);

  if (isNaN(year) || isNaN(day)) {
    console.error('Year and day must be valid numbers');
    Deno.exit(1);
  }

  try {
    const data = await scrapeAdventJSChallenge(year, day);
    console.log(data.content);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    Deno.exit(1);
  }
}