"use client";
import { useParams } from "next/navigation";

function Page() {
  const param = useParams();
  return (
    <div>
      <h1>Movie</h1>
    </div>
  );
}
