// type DataPoint = {
//   name: string
//   value: number
// }

// export async function GET(
//   request: Request
// ) {
//   try {
//     const response = await fetch('http://api.worldbank.org/v2/country/us/indicator/NY.GDP.MKTP.CD?format=json');
//     const data = await response.json()

//     const chartData = data.prices.map(([timestamp, price]: [number, number]) => ({
//       name: new Date(timestamp).toLocaleDateString(),
//       value: parseFloat(price.toFixed(2))
//     }));
//     return Response.json({chartData})

//     // res.status(200).json(chartData);
//   } catch (error) {
//     console.error('Error fetching crypto data:', error);
//     // res.status(500).json([]);
//   }
// }

import { NextResponse } from 'next/server';

type DataPoint = {
  name: string;
  value: number;
};

export async function GET() {
  try {
    const response = await fetch('http://api.worldbank.org/v2/country/us/indicator/NY.GDP.MKTP.CD?format=json');
    const data = await response.json();

    // The actual data is in the second element of the array
    const gdpData = data[1];

    // Sort the data by date in ascending order
    gdpData.sort((a: any, b: any) => parseInt(a.date) - parseInt(b.date));

    const chartData: DataPoint[] = gdpData.map((item: any) => ({
      name: item.date,
      value: parseFloat((item.value / 1e9).toFixed(2)) // Convert to billions and round to 2 decimal places
    }));

    return NextResponse.json({ chartData });
  } catch (error) {
    console.error('Error fetching GDP data:', error);
    return NextResponse.json({ error: 'Failed to fetch GDP data' }, { status: 500 });
  }
}