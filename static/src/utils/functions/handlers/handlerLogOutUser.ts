import { currentUser } from "../../../const/objects/currentUser.js";
import { ROUTES } from "../../../const/routes.js";
import { authAPI } from "../../api/AuthAPI.js";
import { router } from "../../classes/Router.js";

export default function handlerLogOutUser() {
  return authAPI
    .logOut()
    .then((data: any) => {
      if (data.status === 200) {
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
    .catch((err) => console.log(err));
}
