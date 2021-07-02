import { PlainObject } from "../../types/PlainObject";
import getKey from "./getKey";
import isArrayOrObject from "./isArrayOrObject";

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