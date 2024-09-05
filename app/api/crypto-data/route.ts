// // type DataPoint = {
// //   name: string
// //   value: number
// // }

// // export async function GET(
// //   request: Request
// // ) {
// //   try {
// //     const response = await fetch('http://api.worldbank.org/v2/country/us/indicator/NY.GDP.MKTP.CD?format=json');
// //     const data = await response.json()

// //     const chartData = data.prices.map(([timestamp, price]: [number, number]) => ({
// //       name: new Date(timestamp).toLocaleDateString(),
// //       value: parseFloat(price.toFixed(2))
// //     }));
// //     return Response.json({chartData})

// //     // res.status(200).json(chartData);
// //   } catch (error) {
// //     console.error('Error fetching crypto data:', error);
// //     // res.status(500).json([]);
// //   }
// // }

// import { NextResponse } from 'next/server';

// type DataPoint = {
//   name: string;
//   value: number;
// };

// export async function GET() {
//   try {
//     const response = await fetch('http://api.worldbank.org/v2/country/us/indicator/NY.GDP.MKTP.CD?format=json');
//     const data = await response.json();

//     // The actual data is in the second element of the array
//     const gdpData = data[1];

//     // Sort the data by date in ascending order
//     gdpData.sort((a: any, b: any) => parseInt(a.date) - parseInt(b.date));

//     const chartData: DataPoint[] = gdpData.map((item: any) => ({
//       name: item.date,
//       value: parseFloat((item.value / 1e9).toFixed(2)) // Convert to billions and round to 2 decimal places
//     }));

//     return NextResponse.json({ chartData });
//   } catch (error) {
//     console.error('Error fetching GDP data:', error);
//     return NextResponse.json({ error: 'Failed to fetch GDP data' }, { status: 500 });
//   }
// // }
// import { NextResponse } from 'next/server';

// type DataPoint = {
//   name: string;
//   value: number;
// };

// export async function GET() {
//   try {
//     const response = await fetch('http://api.worldbank.org/v2/country/us/indicator/NY.GDP.MKTP.CD?format=json', {
//       headers: {
//         'Accept': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Oops! Received non-JSON response from the API");
//     }

//     const data = await response.json();

//     // The actual data is in the second element of the array
//     const gdpData = data[1];

//     if (!Array.isArray(gdpData)) {
//       throw new Error("Unexpected data structure received from the API");
//     }

//     // Sort the data by date in ascending order
//     gdpData.sort((a: any, b: any) => parseInt(a.date) - parseInt(b.date));

//     const chartData: DataPoint[] = gdpData.map((item: any) => ({
//       name: item.date,
//       value: parseFloat((item.value / 1e9).toFixed(2)) // Convert to billions and round to 2 decimal places
//     }));

//     return NextResponse.json({ chartData });
//   } catch (error) {
//     console.error('Error fetching GDP data:', error);

//     // Fallback data in case of API failure
//     const fallbackData: DataPoint[] = [
//       { name: "2019", value: 21433.23 },
//       { name: "2020", value: 20932.75 },
//       { name: "2021", value: 22938.30 },
//       { name: "2022", value: 25462.73 },
//       { name: "2023", value: 26854.60 }
//     ];

//     return NextResponse.json({
//       chartData: fallbackData,
//       error: 'Failed to fetch live GDP data. Showing fallback data.',
//       details: error instanceof Error ? error.message : String(error)
//     }, { status: 200 });
//   }
// }

import { NextResponse } from "next/server";

type DataPoint = {
  name: string;
  value: number;
};

export async function GET() {
  try {
    const response = await fetch(
      "http://api.worldbank.org/v2/country/us/indicator/NY.GDP.MKTP.CD?format=json",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Oops! Received non-JSON response from the API");
    }

    const data = await response.json();

    // The actual data is in the second element of the array
    const gdpData = data[1];

    if (!Array.isArray(gdpData)) {
      throw new Error("Unexpected data structure received from the API");
    }

    // Sort the data by date in ascending order
    gdpData.sort((a: any, b: any) => parseInt(a.date) - parseInt(b.date));

    const chartData: DataPoint[] = gdpData.map((item: any) => ({
      name: item.date,
      value: parseFloat((item.value / 1e9).toFixed(2)), // Convert to billions and round to 2 decimal places
    }));

    return NextResponse.json({ chartData });
  } catch (error) {
    console.error("Error fetching GDP data:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch GDP data.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
