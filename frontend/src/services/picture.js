import api from "./axiosClient.js";

export const picture = {
  async getOne(id) {
    const res = await api.get(`/pictures/${id}`, {
      responseType: "blob",
      withCredentials: true,
    });

    const imgURL = URL.createObjectURL(res.data);
    return imgURL;
  },
};
