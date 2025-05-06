"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/Utils/Auth";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      setTimeout(function(){
        router.push("/login");
      }, 2000);
    } else {
      setLoading(false);
      setTimeout(function(){
        router.push("/dashboard");
      }, 2000);
    }
  }, [router]);

  if (loading) return <span className="loader"></span>

}