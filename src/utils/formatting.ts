import { format as fnsFormat, formatDistance, isValid, parse } from "date-fns";

const formatTimeStamp = (value: Date | undefined, formatTemplate: string) => {
  if (!value || !isValid(value)) {
    return "";
  }

  return value ? fnsFormat(value, formatTemplate) : "";
};

export const formatDate = (value: Date | undefined) =>
  formatTimeStamp(value, "dd.MM.yyyy");

export const formatShortDate = (value: Date | undefined) =>
  formatTimeStamp(value, "d.M");

export const formatTime = (value: Date | undefined) =>
  formatTimeStamp(value, "HH:mm:ss");

export const formatShortTime = (value: Date | undefined) =>
  formatTimeStamp(value, "HH:mm");

export const formatDateTime = (value: Date | undefined) =>
  formatTimeStamp(value, "dd.MM.yyyy HH:mm");

export const formatLongDateTime = (value: Date | undefined) =>
  formatTimeStamp(value, "dd.MM.yyyy HH:mm:ss");

export const formatSystemDate = (value: Date | undefined) => {
  if (!value) return "";
  return formatTimeStamp(value, "YYYY-MM-DDThh:mm");
};

const isDateValid = (value: string | undefined, formatTemplate: string) => {
  if (!value) {
    return false;
  }

  try {
    return isValid(parse(value, formatTemplate, new Date()));
  } catch (e) {
    return false;
  }
};

const tryParse = (value: string | undefined, formatTemplate: string) => {
  if (!value) {
    return undefined;
  }

  try {
    const parsedDate = parse(value, formatTemplate, new Date());
    return isValid(parsedDate) ? parsedDate : undefined;
  } catch (e) {
    return undefined;
  }
};

export const validateLongDateTime = (value: string | undefined) =>
  isDateValid(value, "dd.MM.yyyy HH:mm:ss");

export const parseLongDateTime = (value: string | undefined) =>
  tryParse(value, "dd.MM.yyyy HH:mm:ss");

export const parseShortTime = (value: string | undefined) =>
  tryParse(value, "HH:mm");

export const parseTime = (value: string | undefined) =>
  tryParse(value, "HH:mm:ss");

export const dateTimePickerShortTimeFormat = "HH:mm";
export const dateTimePickerTimeFormat = "HH:mm:ss";
export const dateTimePickerFormat = "dd.MM.yyyy HH:mm:ss";

const prefix = (value: number) => {
  const valueStr = value.toString();
  if (valueStr.length === 1) {
    return `0${valueStr}`;
  }

  return valueStr;
};

export const formatDurationTime = (
  started: Date | undefined,
  stopped: Date | undefined,
  humanized: boolean = false
): string => {
  const startedTick = started?.getTime?.();
  if (stopped && startedTick) {
    if (humanized) {
      return formatDistance(stopped, startedTick);
    }

    const diff = Math.abs(stopped.getTime() - startedTick);
    const negative = stopped.getTime() < startedTick ? "-" : "";
    const seconds = prefix(Math.round(diff / 1000) % 60);
    const minutes = prefix(Math.floor(diff / 60000) % 60);
    const hrsCount = Math.floor(diff / 3600000);
    if (hrsCount > 24) {
      const daysCount = Math.floor(diff / 86400000);
      const hrs = prefix(hrsCount % 24);
      return `${negative}${daysCount}.${hrs}:${minutes}:${seconds}`;
    }

    return `${negative}${prefix(hrsCount)}:${minutes}:${seconds}`;
  }

  return "";
};

export const formatDurationTimeSince = (started: Date | undefined): string =>
  started ? formatDistance(started, new Date(), { addSuffix: true }) : "";

export const formatDurationTimeLong = (
  started: Date | undefined,
  stopped?: Date | undefined
) => {
  if (started && stopped) {
    const startTime = formatLongDateTime(started);
    const endTime = formatLongDateTime(stopped);
    return `From ${startTime} to ${endTime}.`;
  }

  return formatLongDateTime(started ?? stopped);
};

const TEST_NUMBER = 0.01;
let DECIMAL_SEPARATOR: string;
const decimalSeparator = () => {
  if (DECIMAL_SEPARATOR) {
    return DECIMAL_SEPARATOR;
  }
  DECIMAL_SEPARATOR = TEST_NUMBER.toLocaleString().substring(1, 2);
  return DECIMAL_SEPARATOR;
};

const round = (value: number | undefined, digits?: number): number => {
  if (!value) {
    return 0;
  }

  if (digits === undefined) {
    return value;
  }

  if (digits <= 0) {
    return Math.round(value);
  }

  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
};

export const formatFixed = (value: number | undefined, digits?: number) => {
  const formattedValue = round(value, digits).toLocaleString();
  if (!digits || digits <= 0 || value === 0) {
    // Should 0 be returned with fixed decimals? 0.000 v. 0?
    // For now just return 0...
    return formattedValue;
  }

  const separator = decimalSeparator();
  const separatorIndex = formattedValue.indexOf(separator);
  if (separatorIndex === -1) {
    return `${formattedValue}${separator}${"0".repeat(digits)}`;
  }

  const missingDigits = digits - (formattedValue.length - separatorIndex - 1);
  if (missingDigits > 0) {
    return `${formattedValue}${"0".repeat(missingDigits)}`;
  }

  return formattedValue;
};

export const format = (value: number | undefined, digits?: number) => {
  return round(value, digits).toLocaleString();
};

export const truncate = (value: string | undefined, maxLength: number = 70) => {
  const stars = value?.match(/\*+$/g);
  if (
    value &&
    stars &&
    stars.length === 1 &&
    stars[0].length > 10 &&
    value.length - stars[0].length + 15 < maxLength
  ) {
    const text = value.substring(0, value.length - stars[0].length);
    return `${text}**********(${format(stars[0].length - 10)})`;
  }

  if (!value || value.length < maxLength) {
    return value;
  }

  return `${value.substring(0, maxLength - 1)}…`;
};
