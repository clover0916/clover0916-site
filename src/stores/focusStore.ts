import { atom } from "nanostores";

/** True while the page is in "crosshair mode" (native cursor hidden). */
export const isFocused = atom(false);
