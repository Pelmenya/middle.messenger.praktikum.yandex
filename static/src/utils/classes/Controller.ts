import { Nullable } from "../../types/Nullable";
import { currentUser } from "../../const/objects/currentUser";
import { signInProps } from "../../const/objects/signInProps";
import { signUpProps } from "../../const/objects/signUpProps";
import Store from "../store/Store";
import { store } from "../store/storeObj";
import { chatsProps } from "../../const/objects/chatsProps";
import { errorProps } from "../../const/objects/errorProps";
import { chatsSelectedProps } from "../../const/objects/chatsSelectedProps";
import { myAccountProps } from "../../const/objects/myAccountProps";
import { myAccountDataProps } from "../../const/objects/myAccountDataProps";
import { myAccountPasswordProps } from "../../const/objects/myAccountPasswordProps";

export default class Controller {
  private putToStore(store: Store, obj: Nullable<Object>, key: string) {
    store.objects[key] = obj;
  }

  setSignInProps = () => {
    this.putToStore(store, signInProps, "signInProps");
  };

  setSignUpProps = () => {
    this.putToStore(store, signUpProps, "signUpProps");
  };

  setChatsProps = () => {
    this.putToStore(store, chatsProps, "chatsProps");
  };

  setErrorProps = () => {
    this.putToStore(store, errorProps, "errorProps");
  };

  setChatsSelectedProps = () => {
    this.putToStore(store, chatsSelectedProps, "chatsSelectedProps");
  };

  setMyAccountProps = () => {
    this.putToStore(store, myAccountProps, "myAccountProps");
  };

  setMyAccountDataProps = () => {
    this.putToStore(store, myAccountDataProps, "myAccountDataProps");
  };

  setMyAccountPasswordProps = () => {
    this.putToStore(store, myAccountPasswordProps, "myAccountPasswordProps");
  };
 
  setCurrentUserProps = () => {
    this.putToStore(store, currentUser, "currentUser");
  };
}

export const controller = new Controller();
