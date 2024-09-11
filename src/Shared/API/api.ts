import axios from "axios";
import Cookies from "js-cookie";

// export const HOST = "http://localhost:5000";
export const HOST = "https://test.v5.pryaniky.com";

export const urlEndpoints = {
  AUTH: {
    login: "/ru/data/v3/testmethods/docs/login",
  },
  TABLE: {
    create: "/ru/data/v3/testmethods/docs/userdocs/create",
    update: (id: string) => `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
    delete: (id: string) =>
      `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    readAll: "/ru/data/v3/testmethods/docs/userdocs/get",
  },
};

export const $api = axios.create({
  baseURL: HOST,
});

const urlSkipAuth = [urlEndpoints.AUTH.login];

$api.interceptors.request.use((config) => {
  if (config.url && urlSkipAuth.includes(config.url)) {
    return config;
  }

  const accessToken = Cookies.get("token");
  if (accessToken) {
    config.headers["x-auth"] = accessToken;
  }
  return config;
});
