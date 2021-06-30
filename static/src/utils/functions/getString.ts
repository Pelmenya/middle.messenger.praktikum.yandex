import { PlainObject } from "../../types/PlainObject.js";
import getParams from "./getParams.js";
import isPlainObject from "./isPlainObject.js";

export default function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
      throw new Error('input must be an object');
  }

  return getParams(data).map(arr => arr.join('=')).join('&');
} 