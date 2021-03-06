import { store } from "../store/storeObj";

export default function getDataFromStore(key: string) {

  if (store.objects[key] !== null) {
    return store.objects[key];
  }
  
  return null;
}
