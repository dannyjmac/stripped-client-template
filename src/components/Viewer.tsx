import { useState } from "react";
import { toast } from "react-toastify";
import { PaymentFlow } from "./PaymentFlow";
import axios from "axios";

export const Viewer = () => {
  const [invoice, setInvoice] = useState();
  const getInvoice = async () => {
    const data: any = await axios.get(
      `http://localhost:4008/api/generateInvoice`
    );
    setInvoice(data.data.invoice.payment_request);
  };
  return (
    <div>
      <button
        style={{ marginTop: 100, marginBottom: 100 }}
        onClick={getInvoice}
      >
        Get invoice
      </button>
      {invoice && <PaymentFlow invoice={invoice} setInvoice={setInvoice} />}
    </div>
  );
};
