import { PlainObject } from "../../types/PlainObject.js";
import isArray from "./isArray.js";
import isPlainObject from "./isPlainObject.js";

export default function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}