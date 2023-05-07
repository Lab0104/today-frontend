export const getCurrentTimeToDatetime = (): string => {
  const offset = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - offset).toISOString().slice(0, 16);
};

export const getCurrentTimeToNumber = (): number => {
  const now = getCurrentTimeToDatetime();
  return new Date(now).getTime();
};

export const DAY_TO_MILLISECOND = 86400000;
