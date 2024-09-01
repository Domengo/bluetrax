import AreaChart from '@/components/area-chart';
import { DataPoint } from '@/components/area-chart';

const data: DataPoint[] = [
    { day: 1, kilometers: 10 },
    { day: 2, kilometers: 25 },
    { day: 3, kilometers: 15 },
    { day: 4, kilometers: 30 },
    { day: 5, kilometers: 20 },
    { day: 6, kilometers: 35 },
    { day: 7, kilometers: 40 },
  ];

export default function App() {
  return (
    <div className="App">
      <h1>Manager kilometers Over Time</h1>
      <AreaChart data={data}/>
    </div>
  );
}