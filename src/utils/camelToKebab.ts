export const camelToKebab = (value: string) => {
  // check if value is pascal case
  const cameled = `${value.slice(0, 1).toLowerCase()}${value.slice(1)}`;

  return cameled.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};
