import { PlainObject } from "../../types/PlainObject.js";
import getKey from "./getKey.js";
import isArrayOrObject from "./isArrayOrObject.js";

export default function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for(const [key, value] of Object.entries(data)) {
      if (isArrayOrObject(value)) {
          result.push(...getParams(value, getKey(key, parentKey)));
      } else {
          result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
      }
  }

  return result;
}