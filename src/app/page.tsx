"use client"

import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import EnergyDataClient from "./services/EnergyDataClient";
import { ConsumptionDatapoint, DataType, EnergyType } from "./types";
import Meter from "./components/Meter";

const dataClient = new EnergyDataClient();

function totalUsage(consumption: ConsumptionDatapoint[]): number {
  const usage = consumption.reduce((acc, el) => {
    return acc += el.value
  }, 0)
  return usage
}

export default function Home() {
  const [electricityConsumption, setElectricityConsumption] = useState<ConsumptionDatapoint[]>([]);
  const [gasConsumption, setGasConsumption] = useState<ConsumptionDatapoint[]>([]);

  useEffect(() => {
    async function loadData() {
      const electricityData = await dataClient.fetch({
        dataType: DataType.CONSUMPTION,
        energyType: EnergyType.ELECTRICITY,
        userId: "1",
        startDate: 20240125,
        endDate: 20240126
      });

      const gasData = await dataClient.fetch({
        dataType: DataType.CONSUMPTION,
        energyType: EnergyType.GAS,
        userId: "1",
        startDate: 20240125,
        endDate: 20240126
      });

      setElectricityConsumption(electricityData);
      setGasConsumption(gasData);
    }

    loadData();
  }, [])

  return (
    <main className={styles.main}>
      <div>
        <h2>Electricity</h2>
        <h3>Usage</h3>
        <Meter barColor="#316c72" backgroundColor="#f0efef" width={400} height={30} quota={15} usage={totalUsage(electricityConsumption)}/>
      </div>
      <div>
        <h2>Gas</h2>
        <h3>Usage</h3>
        <Meter barColor="#316c72" backgroundColor="#f0efef" width={400} height={30} quota={8} usage={totalUsage(gasConsumption)}/>
      </div>
    </main>
  );
}
