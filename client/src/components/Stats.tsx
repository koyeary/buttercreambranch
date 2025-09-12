import { Card } from "@/components/ui/Card";
import { Clock, CheckCircle, AlertCircle, Timer } from "lucide-react";

const Stats = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Pending Orders</p>
            <p className="text-2xl font-semibold">12</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-orange-500" />
          <div>
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-semibold">8</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-muted-foreground">Completed Today</p>
            <p className="text-2xl font-semibold">47</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-muted-foreground">Avg Wait Time</p>
            <p className="text-2xl font-semibold">12m</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Stats;
