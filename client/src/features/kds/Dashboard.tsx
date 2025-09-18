import Header from "@/components/Header";
import Stats from "@/components/Stats";
/* import {
  Clock,
  Search,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Timer,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
//import { Badge } from "./ui/Badge";
import { Card } from "../components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs"; */
/* import Header from "../components/Header";
import Status from "../components/Status";
import OrdersGrid from "../components/OrdersGrid"; */

const Dashboard = () => {
  //const [activeScreen, setActiveScreen] = useState("dashboard");

  return (
    <div className="space-y-4 p-6 w-full">
      <div className="flex items-center justify-between border-b pb-4">
        <Header />
      </div>
      <Stats />

      {/*     <OrdersGrid /> */}
    </div>
  );
};

export default Dashboard;
