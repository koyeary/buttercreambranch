import { useState } from "react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Delete, X } from "lucide-react";

interface NumericKeypadProps {
  onPinChange?: (pin: string) => void;
  onSubmit?: (pin: string) => void;
  maxLength?: number;
  placeholder?: string;
  title?: string;
}

const NumericKeypad: React.FC = ({
  onPinChange,
  onSubmit,
  maxLength = 6,
  placeholder = "Enter PIN",
  title = "Sign In",
}: NumericKeypadProps) => {
  const [pin, setPin] = useState("");

  const handleNumberPress = (number: string) => {
    if (pin.length < maxLength) {
      const newPin = pin + number;
      setPin(newPin);
      //onPinChange?.(newPin);
      console.log(newPin);
      // Auto-submit when max length is reached
      if (newPin.length === maxLength) {
        onSubmit?.(newPin);
      }
    }
  };

  const handleDelete = () => {
    const newPin = pin.slice(0, -1);
    setPin(newPin);
    onPinChange?.(newPin);
  };

  const handleClear = () => {
    setPin("");
    onPinChange?.("");
  };

  const handleSubmit = () => {
    console.log(`Pin: ${pin}`);
    if (pin.length === maxLength) {
      onSubmit?.(pin);
    }
  };

  // Create array of dots for PIN display
  const pinDots = Array.from({ length: maxLength }, (_, index) => (
    <div
      key={index}
      className={`w-4 h-4 rounded-full  transition-all ${
        index < pin.length ? "bg-blue-600" : "bg-gray-300"
      }`}
    ></div>
  ));

  const numberButtons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", ""],
  ];

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center pb-6">
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{placeholder}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* PIN Display */}
        <div className="flex justify-center items-center gap-3 py-4">
          {pinDots}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3">
          {numberButtons.map((row, rowIndex) =>
            row.map((number, colIndex) => {
              if (number === "") {
                if (rowIndex === 3 && colIndex === 0) {
                  // Clear button
                  return (
                    <Button
                      key={`${rowIndex}-${colIndex}`}
                      variant="outline"
                      size="lg"
                      onClick={handleClear}
                      className="h-14 aspect-square"
                      disabled={pin.length === 0}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  );
                } else if (rowIndex === 3 && colIndex === 2) {
                  // Delete button
                  return (
                    <Button
                      key={`${rowIndex}-${colIndex}`}
                      variant="outline"
                      size="lg"
                      onClick={handleDelete}
                      className="h-14 aspect-square"
                      disabled={pin.length === 0}
                    >
                      <Delete className="h-5 w-5" />
                    </Button>
                  );
                }
                // Empty space
                return <div key={`${rowIndex}-${colIndex}`} />;
              }

              return (
                <Button
                  key={`${rowIndex}-${colIndex}`}
                  variant="outline"
                  size="lg"
                  onClick={() => handleNumberPress(number)}
                  className="h-14 aspect-square text-xl"
                  disabled={pin.length >= maxLength}
                >
                  {number}
                </Button>
              );
            })
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={pin.length < maxLength}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default NumericKeypad;
