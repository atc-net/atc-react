const getBaseInputClassName = (css: string) =>
  [
    "appearance-none border block bg-white text-sm border-grey-300 px-4 text-grey-700 ",
    "focus:outline-none focus:bg-white focus:border focus:border-grey-500",
    css,
  ].join(" ");

export const baseInputSlimClassName = getBaseInputClassName("w-full h-7");
export const baseInputSlimClassNameNoWidth = getBaseInputClassName("h-7");

export const baseInputClassName = getBaseInputClassName("w-full leading-9 h-9");
export const baseInputClassNameNoWidth = getBaseInputClassName("leading-9 h-9");

const baseBtn =
  "inline-flex items-center font-bold disabled:opacity-50 border-solid whitespace-nowrap";

export const baseBtnClassName = [
  baseBtn,
  "h-9 py-1 px-2 text-white bg-custom-700 border-custom-700 border rounded-md",
  "hover:bg-custom-800 hover:border-custom-800",
  "active:bg-custom-900 active:border-grey-900",
  "focus:bg-custom-900 focus:border-grey-900",
].join(" ");

export const secondaryBorderClassName =
  "h-9 rounded-md border border-grey-200 active:border-grey-900 focus:border-grey-900";
export const secondaryBorderWithinClassName =
  "h-9 rounded-md border border-grey-200 active-within:border-grey-900 focus-within:border-grey-900";

export const baseBtnSecondaryNoBorderClassName = [
  baseBtn,
  "text-grey-900 bg-white hover:bg-grey-50 active:bg-grey-100 focus:bg-grey-50 focus:outline-none",
].join(" ");

export const baseBtnSecondaryClassName = [
  baseBtnSecondaryNoBorderClassName,
  secondaryBorderClassName,
  "py-1 px-2",
].join(" ");

export const baseBtnTertiaryClassName = [
  baseBtn,
  "h-9 py-1 px-2 text-white bg-red-900 border-red-900 border rounded-md",
  "hover:bg-red-800",
  "active:bg-red-700 active:border-grey-900",
  "focus:bg-red-800 focus:border-grey-900",
].join(" ");

export const baseBtnQuaternaryClassName = [
  baseBtn,
  "text-white bg-white bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-30 focus:bg-opacity-30 focus:outline-none",
  "h-9 rounded-md border border-grey-200 active:border-grey-900 focus:border-grey-900",
  "py-1 px-2",
].join(" ");
