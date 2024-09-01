import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert } from "./notification-const";

export default function AlertSummary({ alerts }: { alerts: Alert[] }) {
  const totalAlerts = alerts.reduce((sum, alert) => sum + alert.count, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Alert</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map((alert) => (
          <TableRow key={alert.type}>
            <TableCell className="font-medium">{alert.type}</TableCell>
            <TableCell className="text-right">{alert.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-semibold">Total</TableCell>
          <TableCell className="text-right font-semibold">
            {totalAlerts}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
