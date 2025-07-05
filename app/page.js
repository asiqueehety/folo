'use client'

import HomePage from "@/components/HomePage";
import Intro from "@/components/Intro";

export default function Home() {
  const token = localStorage.getItem('token')
  return (
    <div>
      {!!token? <HomePage/>:<Intro/>}
    </div>
  );
}
