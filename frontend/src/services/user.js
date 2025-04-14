import api from "./axiosClient.js";
export const user = {
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  },
  async createOne({ username, password }) {
    const { data } = await api.post("/users", { username, password });
    return data;
  },
};
