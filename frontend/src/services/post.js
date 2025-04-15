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
  async deleteOne({ postId }) {
    const res = await api.delete(`/posts/${postId}`);
    return res;
  },
  async updateOne({ postId, title, content }) {
    const res = await api.post(`/posts/${postId}`, { title, content });
    return res;
  },
};
