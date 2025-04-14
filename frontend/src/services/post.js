import api from "./axiosClient.js";

export const post = {
  async createOne({ title, content }) {
    const res = await api.post("/posts", { title, content });
    return res;
  },
  async getAll() {
    const { data } = await api.get("/posts");
    return { data };
  },
};
