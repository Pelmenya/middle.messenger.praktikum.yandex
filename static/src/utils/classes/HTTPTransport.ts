import queryString from "../functions/getString";
import { METHOD } from "../../const/methods";
import { Options } from "../../types/Options";

type OptionsWithoutMethod = Omit<Options, "method">;

export default class HTTPTransport {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const { data } = options;
    if (data)
      return this.request(`${url}?${queryString(data)}`, { ...options, method: METHOD.GET });
    else return this.request(url, { ...options, method: METHOD.GET });
  }

  post(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  delete(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, data = {}, id = undefined } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      if (id === undefined) {
        xhr.open(method, `${this.baseUrl}${url}`);
      } else xhr.open(method, `${this.baseUrl}${url}/${String(id)}`);

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
