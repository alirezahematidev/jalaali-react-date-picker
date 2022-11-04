import moment from "moment-jalaali";

export const listOfYears = () => {
  const currentYear = moment().jYear();

  return Array.from({ length: currentYear }, (_, i) => i + 1);
};
