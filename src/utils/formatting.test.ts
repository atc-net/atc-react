import { truncate } from "./formatting";

test("Truncate", () => {
  expect(truncate("abcdefghijklemnop", 10)).toBe("abcdefghi…");
  expect(truncate("********a*****bc***************", 10)).toBe("********a…");
  expect(truncate("abcdddddddddddddddddddddddd", 20)).toBe(
    "abcdddddddddddddddd…"
  );
  expect(truncate("abc************************", 20)).toBe("abc**********(14)");
  expect(truncate("abcdefghijk****************", 20)).toBe(
    "abcdefghijk********…"
  );
});
