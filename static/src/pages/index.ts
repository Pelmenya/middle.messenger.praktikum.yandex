import { currentUser } from "../const/objects/currentUser";
import { ROUTES } from "../const/routes";
import getCurrentUser from "../utils/functions/getCurrentUser";
import getDataFromStore from "../utils/functions/getDataFromStrore";
import getUrlRoute from "../utils/functions/getUrlRoute";
import renderChats from "../utils/functions/renderChats";
import setEditPasswordFields from "../utils/functions/setEditPasswordFields";
import setEditUserFields from "../utils/functions/setEditUserFields";
import setUserFields from "../utils/functions/setUserFields";
import ChatsPage from "./classes/ChatsPage";
import ErrorPage from "./classes/ErrorPage";
import MyAccountDataPage from "./classes/MyAccountDataPage";
import MyAccountPage from "./classes/MyAccountPage";
import MyAccountPasswordPage from "./classes/MyAccountPasswordPage";
import SignInPage from "./classes/SignInPage";
import SignUpPage from "./classes/SignUpPage";
import { router } from "../const/objects/router";

import "pages-css/index.css";
import "pages-css/chat.css";
import "pages-css/error-page.css";
import "pages-css/my-account.css";

router
  .use(ROUTES.SIGNIN, SignInPage, getDataFromStore("signInProps"))
  .use(ROUTES.SIGNUP, SignUpPage, getDataFromStore("signUpProps"))
  .use(ROUTES.CHATS, ChatsPage, getDataFromStore("chatsProps"))
  .use(ROUTES.MY_ACCOUNT, MyAccountPage, getDataFromStore("myAccountProps"))
  .use(ROUTES.MY_ACCOUNT_DATA, MyAccountDataPage, getDataFromStore("myAccountDataProps"))
  .use(
    ROUTES.MY_ACCOUNT_PASSWORD,
    MyAccountPasswordPage,
    getDataFromStore("myAccountPasswordProps")
  )
  .use(ROUTES.ERROR, ErrorPage, getDataFromStore("errorProps"));

getCurrentUser()
  .then((data) => {
    const routeUrl = getUrlRoute(window);
    if (data !== null) {
      Object.assign(currentUser, data);
      switch (routeUrl) {
        case ROUTES.SIGNIN:
          renderChats();
          break;
        case ROUTES.SIGNUP:
          renderChats();
          break;
        case ROUTES.CHATS:
          renderChats();
          break;
        case ROUTES.MY_ACCOUNT:
          setUserFields();
          router.go(ROUTES.MY_ACCOUNT);
          break;
        case ROUTES.MY_ACCOUNT_DATA:
          setEditUserFields();
          router.go(ROUTES.MY_ACCOUNT_DATA);
          break;
        case ROUTES.MY_ACCOUNT_PASSWORD:
          setEditPasswordFields();
          router.go(ROUTES.MY_ACCOUNT_PASSWORD);
          break;
        default:
          router.go(ROUTES.ERROR);
          break;
      }
    } else if (routeUrl === ROUTES.SIGNIN) router.go(ROUTES.SIGNIN);
    else if (routeUrl === ROUTES.SIGNUP) router.go(ROUTES.SIGNUP);
    else router.go(ROUTES.ERROR);
  })
  .catch((err) => alert(err));
