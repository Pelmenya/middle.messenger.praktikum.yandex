import { authAPI } from "../api/AuthAPI";

export default function getCurrentUser() {
  return authAPI
    .getCurrentUser()
    .then((data: any) => {
      const { status } = data;
      if (status !== undefined)
        if (status >= 200 && status <= 299) return JSON.parse(data.response);
      return null;
    })
    .catch((err) => alert(err));
}
