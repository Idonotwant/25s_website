import api from "./axiosClient.js";
export const user = {
  async createOne({ username, password }) {
    const { data } = await api.post("/users", { username, password });
    return data;
  },
  async login({ username, password }) {
    const { data } = await api.post("/auth", { username, password });
    return data;
  },
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  },
};
