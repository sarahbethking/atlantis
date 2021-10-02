import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Drawer } from ".";

afterEach(cleanup);

describe("Drawer", () => {
  describe("when open", () => {
    it("should render children and close button", () => {
      const content = "Drawer Content";
      const { container, getByText } = render(
        <Drawer open onRequestClose={jest.fn}>
          {content}
        </Drawer>,
      );
      expect(getByText(content)).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
    describe("with title", () => {
      it("should also render title", () => {
        const title = "Drawer Title";
        const content = "Drawer Content";
        const { container, getByText } = render(
          <Drawer title={title} open onRequestClose={jest.fn}>
            {content}
          </Drawer>,
        );
        expect(getByText(content)).toBeInTheDocument();
        expect(getByText(title)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });
    });
    describe("when clicking on dismiss button", () => {
      it("should trigger request close", () => {
        const onRequestCloseFn = jest.fn();
        const { getByLabelText } = render(
          <Drawer open onRequestClose={onRequestCloseFn}>
            {"Drawer Content"}
          </Drawer>,
        );
        fireEvent.click(getByLabelText("Close drawer"));
        expect(onRequestCloseFn).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe("when closed", () => {
    it("shouldnt render the children", () => {
      const content = "Drawer Content";
      const { container, debug, getByTestId } = render(
        <Drawer open={false} onRequestClose={jest.fn}>
          {content}
        </Drawer>,
      );
      debug(container);
      expect(
        getByTestId("drawer-container").classList.contains("open"),
      ).toBeFalsy();
    });
  });
});
