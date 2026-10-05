"use client";

import { connectToSSE, disconnectFromSSE } from "@/features/events/sse-client";
import { useEffect } from "react";

export function RealtimeProvider(){
    useEffect(() =>{
        connectToSSE();
        return () => {
            // Cleanup function to disconnect from SSE when the component unmounts
            disconnectFromSSE();
        }
    }, []);
    return null;
}