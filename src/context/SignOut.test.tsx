import SigOut from "./SignOut";

describe("SigOut function", () => {
  beforeEach(() => {
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("removes token from localStorage", () => {
    expect(localStorage.getItem("token")).toBe("test-token");
    SigOut();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
