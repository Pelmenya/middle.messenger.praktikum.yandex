import { assert, expect } from "chai";
import queryString from "../functions/getString";
import { METHOD } from "../../const/methods";
import { Options } from "../../types/Options";
import "@babel/polyfill";

type OptionsWithoutMethod = Omit<Options, "method">;

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
        xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}

describe("Проверяем модуль отправки запросов к серверу", () => {
  function requestTest() {
    const httpTransport = new HTTPTransport("http://localhost:3000");
    return httpTransport.get("/get", {} as Options);
  }
  it('При вызове метода GET возвращается от сервера объект { status: "success", message: "Welcome To Testing API" } и статус 200', async () => {
    return requestTest().then((data) => {
      const response = JSON.parse(data.responseText);
      console.log(response);
      const status = data.status;
      expect(response).deep.equal({ status: "success", message: "Welcome To Testing API" });
      assert.equal(status, 200);
    });
  });
});

describe("Проверяем модуль отправки запросов к серверу", () => {
  function requestTest() {
    const httpTransport = new HTTPTransport("http://localhost:3000");
    return httpTransport.post("/post", {} as Options);
  }
  it('При вызове метода POST возвращается от сервера объект { status: "success", message: "Ok" } и статус 200', async () => {
    return requestTest().then((data) => {
      const response = JSON.parse(data.responseText);
      console.log(response);
      const status = data.status;
      expect(response).deep.equal({ status: "success", message: "Ok" });
      assert.equal(status, 200);
    });
  });
});

describe("Проверяем модуль отправки запросов к серверу", () => {
  function requestTest() {
    const httpTransport = new HTTPTransport("http://localhost:3000");
    return httpTransport.delete("/delete", {} as Options);
  }

  it('При вызове метода DELETE возвращается от сервера объект { status: "success", message: "Ok" } и статус 200', async () => {
    return requestTest().then((data) => {
      const response = JSON.parse(data.responseText);
      console.log(response);
      const status = data.status;
      expect(response).deep.equal({ status: "success", message: "Ok" });
      assert.equal(status, 200);
    });
  });
});

describe("Проверяем модуль отправки запросов к серверу", () => {
  function requestTest() {
    const httpTransport = new HTTPTransport("http://localhost:3000");
    return httpTransport.put("/put", {} as Options);
  }
  it('При вызове метода PUT возвращается от сервера объект { status: "success", message: "Ok" } и статус 200', async () => {
    return requestTest().then((data) => {
      const response = JSON.parse(data.responseText);
      console.log(response);
      const status = data.status;
      expect(response).deep.equal({ status: "success", message: "Ok" });
      assert.equal(status, 200);
    });
  });
});
