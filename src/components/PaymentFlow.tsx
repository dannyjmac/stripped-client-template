import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";

export const PaymentFlow = ({ invoice, setInvoice }: any) => {
  const [isPaid, useIsPaid] = useState();
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const listenForPayments = async () => {
    const ws = await new WebSocket(
      `ws://localhost:4008/api/events?sessionId=dasbnnqwd23din`
    );
    if (ws) {
      ws.addEventListener("message", (d) => console.log(d), true);
      setWebsocket(ws);
    }
  };

  const removeListener = () => {
    console.log("removing listener");
    if (websocket) {
      websocket.removeEventListener("message", (d) => console.log(d), true);
    }
  };

  const handleEvent = (event: any) => {
    console.log("called");
    const data = JSON.parse(event.data);
    // TODO HANDLE THE INCOMING SOCKET MESSAGE
    console.log({ eventData: data });
  };

  useEffect(() => {
    listenForPayments();
    return () => {
      removeListener();
    };
  }, []);

  return (
    <div>
      {invoice && (
        <div>
          <QRCode value={invoice} />
        </div>
      )}
      {isPaid && <div style={{ fontSize: 30, color: "green" }}>PAID</div>}
      <button onClick={() => setInvoice(null)}>Clear </button>
    </div>
  );
};
