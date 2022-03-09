import axios from "axios";
import jwt_decode from "jwt-decode";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export class VideoAPI {
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_VIDEO_API_BASE_URL,
      headers: defaultHeaders,
    });
  }

  getVideoById = async (id: string) => {
    const result = await this.api.get(`/video?id=${id}`);
    return result;
  };

  getVideosByUserId = async (user: string) => {
    const { userId } = jwt_decode(user) as any;

    const result = await this.api.get(`/videosByUser?userId=${userId}`, {
      headers: { Authorization: `Bearer ${user}` },
    });
    return result;
  };
}
