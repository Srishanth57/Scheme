"use client";

export default function StarRating({ count = 0 }) {
  return (
    <div className="text-sm text-muted-foreground">
      {count} rating{count !== 1 && "s"}
    </div>
  );
}
