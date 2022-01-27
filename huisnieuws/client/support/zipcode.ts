const getZipcode = () => window.localStorage.getItem('postcode') || null;

const getSubmittedZipcode = (): string | null => JSON.parse(window.localStorage.getItem('submittedPostcode') || null);

const regex: RegExp = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[A-Z]{2}$/i;

const zipcodeIsValid = (code: string): boolean => code && code.length >= 6 && regex.test(code);

export { getZipcode, getSubmittedZipcode, zipcodeIsValid };
