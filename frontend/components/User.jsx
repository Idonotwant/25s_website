import services from "../services/index.js";
services.user.getAll().then((data) => {
  console.log(data);
});
