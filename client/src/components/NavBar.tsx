import React from "react";

const NavBar: React.FC = () => {
  return (
    <header className="shadow-lg shadow-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {/*               <ChefHat className="h-8 w-8 text-primary" />
             */}{" "}
            <div>
              <h1 className="text-text">KDS Pro</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
