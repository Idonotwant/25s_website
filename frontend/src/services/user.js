import api from "./axiosClient.js";
export const user = {
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  },
  async createOne({ name }) {
    console.log("name: ", name);
    const { data } = await api.post("/users", { name });
    return data;
  },
};
