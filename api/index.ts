import axios, { AxiosInstance } from "axios";

type RandomSuccessResponse = {
  status: "success";
  min: number;
  max: number;
  random: number;
};

export default class Api {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://csrng.net/csrng/csrng.php",
    });
  }

  getRandomNumber(min: number, max: number): Promise<RandomSuccessResponse[]> {
    return this.instance
      .get("", { params: { min, max } })
      .then((response) => response.data);
  }
}
