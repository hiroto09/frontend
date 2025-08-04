"use client";
import { useEffect, useState } from "react";

type PingStatus = {
  status: boolean;
  lossRate: number;
  time: string;
};

export default function Main() {
  const [status, setStatus] = useState<PingStatus | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onmessage = (event) => {
      const data: PingStatus = JSON.parse(event.data);
      console.log("🔔 受信:", data);
      setStatus(data);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <main>
      <h1>Pingステータス</h1>
      {status ? (
        <div>
          <p>状態: {status.status ? "オンライン ✅" : "オフライン ❌"}</p>
          <p>ロス率: {status.lossRate}%</p>
          <p>受信時刻: {new Date(status.time).toLocaleString()}</p>
        </div>
      ) : (
        <p>⏳ 接続待機中...</p>
      )}
    </main>
  );
}
