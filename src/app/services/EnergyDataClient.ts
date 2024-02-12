import { ConsumptionDatapoint, EnergyDataQuery, EnergyDataService } from "../types";

class EnergyDataClient implements EnergyDataService {
  async fetch(query: EnergyDataQuery): Promise<ConsumptionDatapoint[]> {
    const resp = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(query)
    })

    if(!resp.ok) {
      throw new Error("Query failed");
    }

    return resp.json()
  }
}

export default EnergyDataClient;