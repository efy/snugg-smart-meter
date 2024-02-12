import { readFile, readdir } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { ConsumptionUnit, ConsumptionDatapoint, EnergyDataQuery, EnergyDataService } from "../types";

const readFileAsync = promisify(readFile);
const readdirAsync = promisify(readdir);

class EnergyDataServer implements EnergyDataService {
  private readonly dataDir: string; // absolute path to data directory

  constructor(dataDir: string) {
    this.dataDir = dataDir;
  }

  async fetch(query: EnergyDataQuery): Promise<ConsumptionDatapoint[]> {
    const files = await this.loadDataFiles(query);
    const data = this.parseConsumptionFiles(files);
    return data;
  }

  private parseConsumptionFiles(files: string[]): ConsumptionDatapoint[] {
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
          value: parseFloat(parts[1].replaceAll('\"', "")),
          unit: ConsumptionUnit.KILOWATT_HOUR
        };
        data.push(dataPoint);
      }
    })

    return data;
  }

  private async loadDataFiles(opts: EnergyDataQuery) {
    const dir = join(this.dataDir, opts.energyType, "consumption", opts.userId);
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
}

export default EnergyDataServer;