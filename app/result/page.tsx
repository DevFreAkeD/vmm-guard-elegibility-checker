import React, { Suspense } from "react";
import Result from "../components/ResultClient";

export default function ResultPage() {
  return (
    <Suspense fallback={<p>Loading result...</p>}>
      <Result />
    </Suspense>
  );
}