
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-recipe-primary text-2xl font-bold">
            Healthy Recipe Generator
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-recipe-primary font-medium">
            Home
          </Link>
          <Link to="/saved" className="text-gray-700 hover:text-recipe-primary font-medium">
            Saved
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-recipe-primary font-medium">
            Profile
          </Link>
          <Button variant="outline" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button className="bg-recipe-primary hover:bg-green-600" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
