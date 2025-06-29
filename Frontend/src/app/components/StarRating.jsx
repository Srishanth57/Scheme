"use client";

import { useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { Star } from "lucide-react"; // Lucide star icon

export default function StarRating({
  schemeId,
  initialUserRating = 0,
  average = 0,
  count = 0,
}) {
  const { isSignedIn } = useUser();
  const [myRating, setMyRating] = useState(initialUserRating);
  const [avgRating, setAvgRating] = useState(average);
  const [ratingCount, setRatingCount] = useState(count);
  const [isPending, startTransition] = useTransition();

  const handleRate = (value) => {
    if (!isSignedIn) return alert("Please sign in to rate.");

    setMyRating(value); // Optimistic update

    startTransition(async () => {
      const res = await fetch(`/api/ratings/${schemeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });

      if (res.ok) {
        const { avgRating, ratingCount } = await res.json();
        setAvgRating(avgRating);
        setRatingCount(ratingCount);
      } else {
        setMyRating(initialUserRating); // Revert on error
        alert("Unable to save rating.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`p-1 transition-colors ${
              n <= myRating ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => handleRate(n)}
            disabled={isPending}
            aria-label={`Rate ${n}`}
          >
            <Star size={20} fill={n <= myRating ? "#facc15" : "none"} />
          </button>
        ))}
      </div>

      <span className="text-sm text-muted-foreground">
        {avgRating.toFixed(1)} / 5 ({ratingCount})
      </span>
    </div>
  );
}
