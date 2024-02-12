export enum ConsumptionUnit {
  KILOWATT_HOUR = "kW-h"
}

export enum EnergyType {
  ELECTRICITY = "electricity",
  GAS = "gas"
}

export enum DataType {
  CONSUMPTION = "consumption",
  TARRIF = "tarrif"
}

export interface ConsumptionDatapoint {
  timestamp: string; 
  unit: ConsumptionUnit;
  value: number;
}

export interface EnergyDataQuery {
  dataType: DataType;
  energyType: EnergyType;
  userId: string;
  startDate: number;
  endDate: number;
}

export interface EnergyDataService {
  fetch(query: EnergyDataQuery): Promise<ConsumptionDatapoint[]>
}