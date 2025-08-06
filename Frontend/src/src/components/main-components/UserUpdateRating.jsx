"use client";

import { useState, useEffect } from "react";
import { Star, AlertCircle } from "lucide-react";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function StarRating({ schemeId, avgRating = 0, count = 0 }) {
  const [userRating, setUserRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);

  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  // Get active path from pathname
  const activePath = pathname.split("/").pop();

  // Check if user has already rated this item
  useEffect(() => {
    const checkUserRating = async () => {
      if (!isSignedIn || !user?.id) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/ratings/check/${activePath}/${schemeId}?userId=${user.id}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data?.hasRated) {
            setUserRating(data.rating);
          }
        }
      } catch (error) {
        console.error("Error checking user rating:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRating();
  }, [user?.id, schemeId, activePath, isSignedIn]);

  const handleStarClick = async (rating) => {
    // Show sign-up prompt for unauthenticated users
    if (!isSignedIn) {
      setShowSignUpPrompt(true);
      return;
    }

    if (isLoading) return;

    const previousRating = userRating;
    setUserRating(rating);
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/ratings/${activePath}/${schemeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          schemeId, 
          rating, 
          userId: user.id 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Optionally update local state with server response
      if (data?.success) {
        // Rating submitted successfully
        setShowSignUpPrompt(false);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Failed to submit rating. Please try again.");
      setUserRating(previousRating); // Revert to previous rating
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarHover = (star) => {
    if (isSignedIn && !isLoading) {
      setHovered(star);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      {/* Star Rating Display */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = (hovered || userRating) >= star;
            const isDisabled = isLoading;
            
            return (
              <Star
                key={star}
                className={`h-5 w-5 transition-all duration-200 ${
                  isDisabled 
                    ? "cursor-not-allowed opacity-50" 
                    : "cursor-pointer hover:scale-110"
                } ${
                  isActive
                    ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    : "text-gray-300 hover:text-gray-400"
                }`}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => handleStarClick(star)}
              />
            );
          })}
        </div>

        {/* Rating Summary */}
        <div className="flex items-center gap-2 text-sm text-gray-600 ml-2">
          <span className="font-medium">{avgRating.toFixed(1)}</span>
          <span className="text-gray-400">•</span>
          <span>
            {count} review{count !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* User Rating Feedback */}
      {userRating > 0 && isSignedIn && (
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200">
          <Star className="h-3 w-3 fill-current" />
          <span>You rated {userRating} star{userRating !== 1 ? "s" : ""}</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-xs text-gray-500">
          Submitting your rating...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}

      {/* Sign-up Prompt */}
      {showSignUpPrompt && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-600 text-center">
            Sign in to rate this item
          </p>
          <SignUpButton mode="modal">
            <Button 
              variant="outline" 
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors"
            >
              Sign In / Sign Up
            </Button>
          </SignUpButton>
        </div>
      )}

      {/* Hover Hint */}
      {hovered > 0 && isSignedIn && !isLoading && (
        <div className="text-xs text-gray-500 text-center">
          Click to rate {hovered} star{hovered !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}