import { Nullable } from "./Nullable.js";

export default interface CurrentUser {
  [key: string]: Nullable<String | Number>;
  avatar: Nullable<String>;
  display_name: Nullable<String>;
  email: Nullable<String>;
  first_name: Nullable<String>;
  id: Nullable<Number>;
  login: Nullable<String>;
  phone: Nullable<String>;
  second_name: Nullable<String>;
};
