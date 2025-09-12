import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const OrderDisplay = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* New Orders Column */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">New Orders</h3>
          {/*     <Badge variant="secondary">4</Badge> */}
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((order) => (
            <Card key={order} className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">Order #1{order}23</p>
                  <p className="text-sm text-muted-foreground">Table 5</p>
                </div>
                {/*             <Badge variant="outline" className="text-xs">
                    2:34 PM
                  </Badge> */}
              </div>
              <div className="space-y-1 text-sm">
                <p>• 2x Burger & Fries</p>
                <p>• 1x Caesar Salad</p>
                <p>• 1x Coke</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">$24.50</span>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* In Progress Column */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">In Progress</h3>
          {/*             <Badge variant="secondary">3</Badge> */}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((order) => (
            <Card key={order} className="p-4 border-l-4 border-l-orange-500">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">Order #1{order}20</p>
                  <p className="text-sm text-muted-foreground">Table 3</p>
                </div>
                {/*           <Badge variant="outline" className="text-xs bg-orange-50">
                    8m ago
                  </Badge> */}
              </div>
              <div className="space-y-1 text-sm">
                <p>• 1x Grilled Chicken</p>
                <p>• 2x Pasta Alfredo</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">$32.00</span>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Complete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Ready Column */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Ready for Pickup</h3>
          {/* <Badge variant="secondary">2</Badge> */}
        </div>
        <div className="space-y-3">
          {[1, 2].map((order) => (
            <Card key={order} className="p-4 border-l-4 border-l-green-500">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">Order #1{order}18</p>
                  <p className="text-sm text-muted-foreground">Table 7</p>
                </div>
                {/*   <Badge variant="outline" className="text-xs bg-green-50">
                    Ready
                  </Badge> */}
              </div>
              <div className="space-y-1 text-sm">
                <p>• 1x Fish & Chips</p>
                <p>• 1x Garden Salad</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">$18.75</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-500 text-green-600"
                >
                  Delivered
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDisplay;
