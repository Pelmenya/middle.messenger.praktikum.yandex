import { currentUser } from "../const/objects/currentUser.js";
import { ROUTES } from "../const/routes.js";
import { router } from "../utils/classes/Router.js";
import getCurrentUser from "../utils/functions/getCurrentUser.js";
import getDataFromStore from "../utils/functions/getDataFromStrore.js";
import getUrlRoute from "../utils/functions/getUrlRoute.js";
import renderChats from "../utils/functions/renderChats.js";
import setEditPasswordFields from "../utils/functions/setEditPasswordFields.js";
import setEditUserFields from "../utils/functions/setEditUserFields.js";
import setUserFields from "../utils/functions/setUserFields.js";
import { store } from "../utils/store/storeObj.js";
import ChatsPage from "./classes/ChatsPage.js";
import ErrorPage from "./classes/ErrorPage.js";
import MyAccountDataPage from "./classes/MyAccountDataPage.js";
import MyAccountPage from "./classes/MyAccountPage.js";
import MyAccountPasswordPage from "./classes/MyAccountPasswordPage.js";
import SignInPage from "./classes/SignInPage.js";
import SignUpPage from "./classes/SignUpPage.js";

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
  .catch((err) => console.log(err));

console.log(store);
