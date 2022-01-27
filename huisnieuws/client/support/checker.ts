export const checkLength = (str: string, min: number, max: number): boolean => (
  str.length >= min && str.length <= max
);

export default checkLength;
