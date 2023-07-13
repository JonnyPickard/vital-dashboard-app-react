import { render, screen } from "@testing-library/react";

import App, { APP_NAME } from "./App";

describe("App", () => {
  it("renders the heading with the correct title", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1, name: APP_NAME });

    expect(heading.textContent).toEqual(APP_NAME);
  });
});
