import { PlainObject } from "../../types/PlainObject";
import isArray from "./isArray";
import isPlainObject from "./isPlainObject";

export default function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}