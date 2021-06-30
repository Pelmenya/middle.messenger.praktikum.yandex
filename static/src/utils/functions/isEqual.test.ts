import { expect } from "chai";

import isEqual from "./isEqual";

type StringIndexed = Record<string, any>;

const obj1: StringIndexed = {
  key: 1,
  key2: "test",
  key3: false,
  key4: true,
  key5: [
    1,
    2,
    3,
  ],
  key6: { a: 1 },
  key7: { b: { d: 2 } },
};

const obj2: StringIndexed = {
  key: 1,
  key2: "test",
  key3: false,
  key4: true,
  key5: [
    1,
    2,
    3,
  ],
  key6: { a: 1 },
  key7: {
    b: {
      d: () => {},
      m: {
        d: {
          k: [
            1,
            2,
            3,
          ],
        },
      },
    },
  },
};

describe("Проверяем работу функции isEqual", () => {
  it("При вызове функции с параметрами obj1, obj1 возвращается true", () => {
    expect(isEqual(obj1, obj1)).equal(true);
  });
});

describe("Проверяем работу функции isEqual", () => {
  it("При вызове функции с параметрами obj1, obj2 возвращается false", () => {
    expect(isEqual(obj1, obj2)).equal(false);
  });
});

describe("Проверяем работу функции isEqual", () => {
  it("При вызове функции с параметрами obj2, obj2 возвращается true", () => {
    expect(isEqual(obj1, obj1)).equal(true);
  });
});
