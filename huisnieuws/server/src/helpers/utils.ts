const formatZipcode = (value: string): string => value.replace(/ /g, '').toUpperCase();

export { formatZipcode };
