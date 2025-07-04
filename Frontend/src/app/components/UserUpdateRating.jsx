// "use client";

// import { Star } from "lucide-react";

// export default function StarRating({ avgRating = 0, count = 0 }) {
//   return (
//     <div className="flex items-center space-x-1 text-sm text-muted-foreground">
//       <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//       <span>{avgRating.toFixed(1)}</span>
//       <span>({count} rating{count !== 1 && "s"})</span>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { scheme } from "app/data/government";
import { useEffect } from "react";

export default function StarRating({ schemeId, avgRating = 0, count = 0 }) {
  const [userRating, setUserRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [activePath, setActivePath] = useState("");

  const { isSignedIn, user } = useUser(); // get user object

  const pathname = usePathname();
  useEffect(() => {
    const path = pathname.split("/");
    setActivePath(path[path.length - 1]);
  }, [pathname]);
  useEffect(() => {
    const checkRating = async () => {
      if (!isSignedIn) return;
      try {
        const res = await fetch(
          `/api/ratings/check/${activePath}/${schemeId}?userId=${user.id}`
        );
        const data = await res.json();
        if (data?.hasRated) {
          setUserRating(data.rating);
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkRating();
  }, [user, schemeId, activePath, isSignedIn]);

  const handleRating = async (rating) => {
    if (!isSignedIn) return;

    setUserRating(rating);

    try {
      const response = await fetch(`/api/ratings/${activePath}/${schemeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schemeId, rating, userId: user.id }),
      });

      if (!response.ok) throw new Error("Failed to rate");
      // Optionally show toast/notification
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 cursor-pointer transition-colors ${
              (hovered || userRating) >= star
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-300"
            }`}
            onMouseEnter={() => isSignedIn && setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
      <span className="ml-2">
        {avgRating.toFixed(1)} ({count} rating{count !== 1 && "s"})
      </span>
    </div>
  );
}
