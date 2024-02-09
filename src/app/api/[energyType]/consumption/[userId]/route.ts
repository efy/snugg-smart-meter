import { readFile, readdir } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const readFileAsync = promisify(readFile);
const readdirAsync = promisify(readdir);

interface ConsumptionDatapoint {
  timestamp: string,
  consumptionKWH: number
}

function parseConsumptionFiles(files: string[]): ConsumptionDatapoint[] {
  const data: ConsumptionDatapoint[] = []

  files.forEach(file => {
    const rows = file.split("\n");

    for(let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if(i === 0) {
        continue
      }

      if(row === "") {
        continue
      }
      const parts = row.split(",")
      const dataPoint = {
        timestamp: parts[0].replaceAll('\"', ""),
        consumptionKWH: parseFloat(parts[1].replaceAll('\"', ""))
      };
      data.push(dataPoint);
    }
  })

  return data;
}

interface LoadDataFilesOptions {
  energyType: string;
  userId: string;
  startDate: number;
  endDate: number;
}

/**
 * load all data files
 * constructs path to file system from energyType then enumerates and loads matching files based
 * on start date and end date.
 */
async function loadDataFiles(opts: LoadDataFilesOptions) {
  const basePath = join(process.cwd(), "/src/data");
  const dir = join(basePath, opts.energyType, "consumption", opts.userId);
  const paths = await readdirAsync(dir)

  const matchingFileNames = paths.filter(path => {
    const noExt = path.replace(".csv", "");
    const parts = noExt.split("-");
    const startDate = parseInt(parts[0]);
    const endDate = parseInt(parts[1]);

    return startDate >= opts.startDate || endDate <= opts.endDate
  });

  const files = matchingFileNames.map(filename => {
    return readFileAsync(join(dir, filename), "utf-8");
  });

  return Promise.all(files);
}

export async function GET() {
  const files = await loadDataFiles({
    userId: "1",
    energyType: "electricity",
    startDate: 20240126,
    endDate: 20240126
  });

  const data = parseConsumptionFiles(files);

  return Response.json(data);
}