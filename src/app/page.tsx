'use client'
import Loader from "@/components/_common/Loader";
import LandingPage from "@/components/LandingPage/LandingPage";
import { useEffect, useState } from "react";

export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2200); // simulate bootstrap
    return () => clearTimeout(t);
  }, [ready]);
  return (
    <div>
      {!ready && <Loader brand="RADWAN AHMED" />}
       <LandingPage/>
    </div>
  );
}
