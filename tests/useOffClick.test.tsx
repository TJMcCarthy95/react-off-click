import { type FC, useEffect, useRef, createElement } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { render, fireEvent } from "@testing-library/react";
import { useOffClick } from "../src";

describe("useOffClick", () => {
  it("doesn't call callback when event target isn't a Node type", () => {
    // Arrange
    const onOffClick = jest.fn();
    const { result } = renderHook(() => useOffClick(onOffClick));
    const event = new MouseEvent("test");

    // Act
    result.current(event);

    // Assert
    expect(onOffClick).not.toHaveBeenCalled();
  });

  it("doesn't call callback when clicks inside", () => {
    // Arrange
    const onOffClick = jest.fn();
    const outerContainerText = "outer-container";
    const innerContainerText = "inner-container";

    const Component: FC = () => {
      const outerContainerRef = useRef<HTMLDivElement>(null);
      const innerContainerRef = useRef<HTMLDivElement>(null);
      const handleOffClick = useOffClick(onOffClick, innerContainerRef);

      useEffect(() => {
        if (outerContainerRef.current) {
          outerContainerRef.current.addEventListener("click", handleOffClick);
        }
      }, [outerContainerRef.current]);

      return createElement(
        "div",
        { ref: outerContainerRef },
        outerContainerText,
        createElement("div", { ref: innerContainerRef }, innerContainerText)
      );
    };

    // Act
    const { getByText } = render(createElement(Component));

    // Assert
    fireEvent.click(getByText(innerContainerText));
    expect(onOffClick).not.toHaveBeenCalled();
  });

  it("doesn't call callback when clicks outside on allowed element", () => {
    // Arrange
    const onOffClick = jest.fn();
    const outerContainerText = "outer-container";
    const outerAllowedButtonText = "outer-allowed";
    const innerContainerText = "inner-container";

    const Component: FC = () => {
      const outerContainerRef = useRef<HTMLDivElement>(null);
      const outerAllowedButtonRef = useRef<HTMLButtonElement>(null);
      const innerContainerRef = useRef<HTMLDivElement>(null);
      const handleOffClick = useOffClick(
        onOffClick,
        innerContainerRef,
        outerAllowedButtonRef
      );

      useEffect(() => {
        if (outerContainerRef.current) {
          outerContainerRef.current.addEventListener("click", handleOffClick);
        }
      }, [outerContainerRef.current]);

      return createElement(
        "div",
        { ref: outerContainerRef },
        outerContainerText,
        createElement(
          "button",
          { ref: outerAllowedButtonRef },
          outerAllowedButtonText
        ),
        createElement("div", { ref: innerContainerRef }, innerContainerText)
      );
    };

    // Act
    const { getByText } = render(createElement(Component));

    // Assert
    fireEvent.click(getByText(outerAllowedButtonText));
    expect(onOffClick).not.toHaveBeenCalled();
  });

  it("calls callback when null element", () => {
    // Arrange
    const onOffClick = jest.fn();
    const outerContainerText = "outer-container";
    const innerContainerText = "inner-container";

    const Component: FC = () => {
      const outerContainerRef = useRef<HTMLDivElement>(null);
      const innerContainerRef = useRef<HTMLDivElement>(null);
      const handleOffClick = useOffClick(onOffClick, innerContainerRef);

      useEffect(() => {
        if (outerContainerRef.current) {
          outerContainerRef.current.addEventListener("click", handleOffClick);
        }
      }, [outerContainerRef.current]);

      return createElement(
        "div",
        { ref: outerContainerRef },
        outerContainerText,
        createElement("div", null, innerContainerText)
      );
    };

    // Act
    const { getByText } = render(createElement(Component));

    // Assert
    fireEvent.click(getByText(innerContainerText));
    expect(onOffClick).toHaveBeenCalled();
  });

  it("calls callback when clicks outside", () => {
    // Arrange
    const onOffClick = jest.fn();
    const outerContainerText = "outer-container";
    const innerContainerText = "inner-container";

    const Component: FC = () => {
      const outerContainerRef = useRef<HTMLDivElement>(null);
      const innerContainerRef = useRef<HTMLDivElement>(null);
      const handleOffClick = useOffClick(onOffClick, innerContainerRef);

      useEffect(() => {
        if (outerContainerRef.current) {
          outerContainerRef.current.addEventListener("click", handleOffClick);
        }
      }, [outerContainerRef.current]);

      return createElement(
        "div",
        { ref: outerContainerRef },
        outerContainerText,
        createElement("div", { ref: innerContainerRef }, innerContainerText)
      );
    };

    // Act
    const { getByText } = render(createElement(Component));

    // Assert
    fireEvent.click(getByText(innerContainerText));
    fireEvent.click(getByText(outerContainerText));
    expect(onOffClick).toHaveBeenCalledTimes(1);
  });
});
