import { render } from "@testing-library/react";
import SignOut from "./signout";

describe("SignOut Component", () => {
  beforeEach(() => {
    Storage.prototype.removeItem = jest.fn();
  });

  it("should remove the token from localStorage on mount", () => {
    render(<SignOut />);
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });
});
