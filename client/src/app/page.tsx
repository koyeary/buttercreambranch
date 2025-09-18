// @refresh reset
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUsers } from "@/hooks/useUsers";
import { authenticateUser } from "@/utils/API";
import KeyPad from "@/features/signIn/KeyPad";

const Home: React.FC = () => {
  const [pin, setPin] = React.useState<string>("");
  const router = useRouter();
  const { data, isLoading, isError } = useUsers();

  type User = {
    pin: string;
    // add other user properties if needed
  };

  const maxLength = 4;

  const onPinChange = (number: string) => {
    if (pin.length < maxLength) {
      const newPin = pin + number;
      setPin(newPin);
    }
  };

  const handleDelete = () => {
    const newPin = pin.slice(0, -1);
    setPin(newPin);
  };

  const handleClear = () => {
    const newPin = pin.slice(0, 0 - pin.length);

    setPin(newPin);
  };

  const handleSubmit = () => {
    const users = data;
    console.log(users);
    // authenticateUser(pin);
    if (users.find((user: User) => user.pin === pin)) {
      router.push("/kds");
    }

    if (pin.length === maxLength) {
      if (users.find((user: User) => user.pin === pin)) {
        router.push("/kds");
      }
    }

    setPin("");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
      <div className="text-center space-y-8 h-fit mt-30">
        <div className="space-y-4">
          <h2 className="text-gray-900">
            Welcome to Your Kitchen Display System
          </h2>
          <KeyPad
            onPinChange={onPinChange}
            pin={pin}
            onSubmit={handleSubmit}
            handleClear={handleClear}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      {/*<>  <Dashboard /> </>
         <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="mb-2">Place an Order</h3>
                  <p className="text-muted-foreground">
                    Receive orders instantly as they come in from your POS
                    system
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
                <h2 className="text-gray-900">Station ID: {pin}</h2>
                {/*    <p className="text-muted-foreground"></p> 
              </div>

              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <h3 className="mb-2">System Ready</h3>
                  <p className="text-muted-foreground">
                    Waiting for incoming orders...
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="bg-gray-800 text-gray-50"
                    variant="default"
                  >
                    Go
                  </Button>
                </CardFooter>
              </Card>
            </div> 
          </>*/}
    </main>
  );
};

export default Home;
