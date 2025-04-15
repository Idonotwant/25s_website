import api from "./axiosClient.js";

export const ai = {
  async getAnswer(question) {
    const res = await api.post("/ai", { question });

    return res;
  },
};
