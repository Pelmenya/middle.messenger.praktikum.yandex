import { currentUser } from "../../../const/objects/currentUser";
import { router } from "../../../const/objects/router";
import { ROUTES } from "../../../const/routes";
import { authAPI } from "../../api/AuthAPI";

export default function handlerLogOutUser() {
  return authAPI
    .logOut()
    .then((data: any) => {
      if (data.status >= 200 && data.status <= 299) {
        Object.assign(currentUser, {
          avatar: null,
          display_name: null,
          email: null,
          first_name: null,
          id: null,
          login: null,
          phone: null,
          second_name: null,
        });
        router.go(ROUTES.SIGNIN);
      }
    })
    .catch((err) => alert(err));
}
