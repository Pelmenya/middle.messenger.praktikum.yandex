import Store from "../store/Store.js";

export default function getElementFromStore(store: Store, pageProps: string, name: string) {
  let obj: any;

  if (store.objects[pageProps] !== null) {
    if (store.objects[pageProps].elements !== undefined) {
      store.objects[pageProps].elements.forEach((element: any) => {
        if (element.block.props.name !== undefined)
          if (element.block.props.name === name) {
            obj = element.block;
          }
      });
      return obj;
    }
  }
}
