import { authAPI } from "../api/AuthAPI.js";

export default function getCurrentUser() {
  return authAPI
  .getCurrentUser()
  .then((data: any) => {
    const { status } = data;
    if (status !== undefined)
      if (status === 200) return JSON.parse(data.response);
    return null;
  })
  .catch((err) => console.log(err));
}