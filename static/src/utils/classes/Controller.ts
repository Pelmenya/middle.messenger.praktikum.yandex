import { Nullable } from "../../types/Nullable.js";
import { currentUser } from "../../const/objects/currentUser.js";
import { signInProps } from "../../const/objects/signInProps.js";
import { signUpProps } from "../../const/objects/signUpProps.js";
import Store from "../store/Store.js";
import { store } from "../store/storeObj.js";
import { chatsProps } from "../../const/objects/chatsProps.js";
import { errorProps } from "../../const/objects/errorProps.js";
import { chatsSelectedProps } from "../../const/objects/chatsSelectedProps.js";
import { myAccountProps } from "../../const/objects/myAccountProps.js";
import { myAccountDataProps } from "../../const/objects/myAccountDataProps.js";
import { myAccountPasswordProps } from "../../const/objects/myAccountPasswordProps.js";

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
