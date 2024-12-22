import { exec } from "https://deno.land/x/exec@0.0.5/mod.ts";

// Request permissions explicitly if not provided in deno.json
await Deno.permissions.request({ name: "read" });
await Deno.permissions.request({ name: "run" });

// Get the year, day, and additional arguments from the command-line arguments
const [year = "2024", day, ...scriptArgs] = Deno.args;

if (!day) {
  console.error("Error: Please provide a day as an argument.");
  console.error("Usage: deno task run_day <day> [year] [scriptArgs...]");
  Deno.exit(1);
}

// Construct the folder name (e.g., day1, day2, etc.)
const folderName = `day${day}`;

// Construct the path to the index.js file
const filePath = `${year}/${folderName}/index.js`;

// Check if the file exists
try {
  const stat = await Deno.stat(filePath);
  if (!stat.isFile) {
    console.error(`Error: ${filePath} is not a file.`);
    Deno.exit(1);
  }
} catch (error) {
  console.error(error, `Error: ${filePath} does not exist.`);
  Deno.exit(1);
}

// Construct the command to run the file
const command = `deno run ${filePath} ${scriptArgs.join(" ")}`;

// Run the index.js file with Deno and pass additional arguments
try {
  console.log(`Running: ${command}`);
  const result = await exec(command);
  console.log(result.output);
} catch (error) {
  if (error instanceof Error) {
    console.error("Error running the script:", error.message);
  } else {
    console.error("Error running the script:", error);
  }
  Deno.exit(1);
}
