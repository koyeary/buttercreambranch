"use client";
import React from "react";
import NumericKeyPad from "@/components/NumericKeypad";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";

const Home: React.FC = () => {
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
      {!isConnected ? (
        /* Welcome Screen */
        <div className="text-center space-y-8 h-fit mt-30">
          <div className="space-y-4">
            <h2 className="text-gray-900">
              Welcome to Your Kitchen Display System
            </h2>
            <NumericKeyPad />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="mb-2">Place an Order</h3>
                <p className="text-muted-foreground">
                  Receive orders instantly as they come in from your POS system
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-gray-800 text-gray-50 m-auto w-24"
                  variant="default"
                >
                  Go
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="mb-2">Real-time Order Tracking</h3>
                <p className="text-muted-foreground">
                  Track preparation times and ensure orders are completed on
                  schedule
                </p>
              </CardContent>
              <CardFooter>
                <Button className="bg-gray-800 text-gray-50 m-auto w-24">
                  Go
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="mb-2">Kitchen Management</h3>
                <p className="text-muted-foreground">
                  Organize your kitchen workflow with customizable display
                  options
                </p>
              </CardContent>
              <CardFooter>
                <Button className="bg-gray-800 text-gray-50 m-auto w-24">
                  Go
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <span>Station Connected</span>
              </div>
              <h2 className="text-gray-900">Station ID: {pin}</h2>
              <p className="text-muted-foreground">
                Your kitchen display is now connected and ready to receive
                orders.
              </p>
            </div>

            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <h3 className="mb-2">System Ready</h3>
                <p className="text-muted-foreground">
                  Waiting for incoming orders...
                </p>
              </CardContent>
              <CardFooter>
                <Button className="bg-gray-800 text-gray-50" variant="default">
                  Go
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
