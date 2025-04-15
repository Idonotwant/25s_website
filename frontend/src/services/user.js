import api from "./axiosClient.js";
export const user = {
  async createOne({ username, password }) {
    const res = await api.post("/users", { username, password });
    return res;
  },
  async login({ username, password }) {
    const res = await api.post("/auth", { username, password });
    return res;
  },
  async uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file); // 確保 key 為 "file"

    const { data } = await api.post("/users/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  async getImage() {
    const res = await api.get("/users", {
      responseType: "blob",
      withCredentials: true,
    });

    const imgURL = URL.createObjectURL(res.data);
    return imgURL;
  },
};
