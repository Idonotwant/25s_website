import { user } from "./user.js";
import { auth } from "./auth.js";
import { post } from "./post.js";
import { picture } from "./picture.js";
import api from "./axiosClient.js";
const services = {
  auth,
  user,
  post,
  picture,
};
api.interceptors.request.use(
  async (config) => {
    const { csrfToken } = await auth.getCsrf();
    config.headers["x-csrf-token"] = csrfToken;
    return config;
  },
  null,
  {
    runWhen: (config) =>
      ["post", "put", "patch", "delete"].includes(config.method),
  }
);

export default services;
