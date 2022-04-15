import { useCallback } from "react";
import type { UseOffClick, OnOffClick } from "./types";

/**
 * Hook used to handle element off clicks
 * @param onOffClick Method to be called on an off click
 * @param elements Elements for which off click are allowed i.e. with a div and a trigger element.
 */
export const useOffClick: UseOffClick = (onOffClick, ...elements) =>
  useCallback<OnOffClick>(
    (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (
        elements.every(
          (element) => !element.current?.contains(event.target as Node)
        )
      ) {
        onOffClick(event);
      }
    },
    [onOffClick, elements]
  );
