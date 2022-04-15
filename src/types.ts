import type { RefObject } from "react";

export type Elements = RefObject<HTMLElement>[];

export type OnOffClick = (event: MouseEvent) => void;

export type UseOffClick = (
  onOffClick: OnOffClick,
  ...elements: Elements
) => OnOffClick;
