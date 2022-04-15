# react-off-click

A simple element off click hook for React whereby triggering a provided callback when an element outside the bounded context has been clicked
with elements arguments for which offclicks are permitted.

## Example:

The following example demonstrates a simple implementation whereby clicking outside the "Inner Container" would trigger the off click with an exception for the "Outer allowed button" as it's ref has been provided to the `useOffClick`.

```typescript
const Component: FC<Props> = ({ onOffClick }) => {
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

  return (
    <div ref={outerContainerRef}>
      Outer Container
      <button ref={outerAllowedButtonRef}>Outer allowed button</button>
      <div ref={innerContainerRef}>Inner Container</div>
    </div>
  );
};
```

A more comprehensive use case would be something along the lines of a dropdown whereby both the trigger and the contents of the dropdown wouldn't call the `onOffClick` callback.
