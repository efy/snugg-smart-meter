"use client"

import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import EnergyDataClient from "./services/EnergyDataClient";
import { ConsumptionDatapoint, DataType, EnergyType } from "./types";

const dataClient = new EnergyDataClient();

export default function Home() {
  const [electricityConsumption, setElectricityConsumption] = useState<ConsumptionDatapoint[]>([]);

  useEffect(() => {
    async function loadData() {
      const electricityData = await dataClient.fetch({
        dataType: DataType.CONSUMPTION,
        energyType: EnergyType.ELECTRICITY,
        userId: "1",
        startDate: 20240125,
        endDate: 20240126
      });

      setElectricityConsumption(electricityData);
    }

    loadData();
  }, [])

  return (
    <main className={styles.main}>
      {JSON.stringify(electricityConsumption, null, 2)}
    </main>
  );
}
