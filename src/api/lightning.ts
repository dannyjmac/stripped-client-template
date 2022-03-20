import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default class LightningAPI {
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_LIGHTNING_API_BASE_URL,
      headers: defaultHeaders,
    });
  }

  async getEventsSocket(id: string) {
    return new WebSocket(
      `${process.env.REACT_APP_LIGHTNING_WS_BASE_URL}/?invoiceId=${id}`
    );
  }

  generateInvoice = async (recieveKey: string, value: number) => {
    try {
      const data = await this.api.get(
        `/invoice?value=${value}&recieveKey=${recieveKey}`
      );
      return data?.data?.invoice;
    } catch (err) {
      console.log({ err });
    }
  };
}
