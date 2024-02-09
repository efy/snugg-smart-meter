import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const readFileAsync = promisify(readFile);

export async function GET() {
  const file = await readFileAsync(join(process.cwd(), "/src/data/electricity/consumption/1/20240125-20240126.csv"), "utf-8");
  const data = {
    content: file
  }
  return Response.json(data);
}