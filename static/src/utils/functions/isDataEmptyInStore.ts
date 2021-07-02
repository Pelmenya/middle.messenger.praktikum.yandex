import { store } from "../store/storeObj";

export default function isDataEmptyInStore(key: string) {
  let empty: boolean = true;
  const obj: any = store.objects[key];
  for (let k in obj as Object) {
    if (obj[k] !== null) {
      empty = false;
    }
  }
  return empty;
}
