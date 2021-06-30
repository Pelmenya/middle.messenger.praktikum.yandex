import queryString from "../functions/getString.js";
import { METHOD } from "../../const/methods.js";
import { Options } from "../../types/Options.js";

type OptionsWithoutMethod = Omit<Options, "method">;

export default class HTTPTransport {
  public baseUrl: string;

  constructor(url: string = "") {
    this.baseUrl = url;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
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
    const { method, data = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      if (method === METHOD.GET) xhr.open(method, `${this.baseUrl}${url}${queryString(data)}`);
      else xhr.open(method, `${this.baseUrl}${url}`);

      xhr.onload = function() {
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
