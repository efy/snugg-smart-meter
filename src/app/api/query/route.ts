import EnergyDataServer from "@/app/services/EnergyDataServer";

const dataServer = new EnergyDataServer(`${process.cwd()}/src/data`);

export async function POST(request: Request) {
  const body = await request.json();

  const data = await dataServer.fetch({
    energyType: body.energyType,
    dataType: body.dataType,
    userId: "1",
    startDate: body.startDate,
    endDate: body.endDate 
  });

  return Response.json(data);
}