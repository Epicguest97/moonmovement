
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-7xl font-bold text-reddit-primary mb-4">404</h1>
        <p className="text-xl text-gray-800 mb-6">Hmm... this page doesn't exist</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for may have been moved or deleted.
        </p>
        <Button asChild className="bg-reddit-primary hover:bg-reddit-hover text-white">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
