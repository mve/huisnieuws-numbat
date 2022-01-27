import { Request, Response } from 'express';
import axios from 'axios';
import { formatZipcode } from './utils';
import { findUserById } from '../database/controllers/user-controller';
import { userRole } from '../database/models/enums/userRole';
import { get } from '../database/controllers/article-controller';

const regex: RegExp = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[A-Z]{2}$/i;
const zipcodeIsValid = (code: string): boolean => !!code && regex.test(code);

const verifyZipcode = async (req: Request, res: Response, next: any) => {
  if (!req.body.zipcode && !req.query.zipcode && req.method === 'POST') {
    return next({
      error: 'Geen postcode.',
      type: 'zipcode',
    });
  }
  if (!req.body.zipcode && !req.query.zipcode && req.method === 'PUT') return next();
  const zipcode = formatZipcode(req.body.zipcode || req.query.zipcode);

  if (zipcode && zipcodeIsValid(zipcode)) {
    const zipCheck = await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${zipcode}, Nederland&format=jsonv2&countrycodes=NL&limit=1`);
    return (
      zipCheck.data.length === 1 && zipCheck.data[0]?.type === 'postcode'
        ? next()
        : next({ error: 'Ingevulde postcode is niet gevonden.', type: 'zipcode' })
    );
  }
  return next({ error: 'Geen geldig formaat voor postcode.', type: 'zipcode' });
};

const verifyIsLoggedIn = async (req: Request, res: Response, next: any) => {
  if (!req.headers.userid) return next({ error: 'Geen gebruiker, geen toegang.', type: 'user' });

  const { headers } = req;
  const { userid: userId } = headers;

  const userExists = await findUserById(String(userId));

  if (!userExists) return next({ error: 'Gebruiker bestaat niet.', type: 'user' });

  return next();
};

const verifyAuthor = async (req: Request, res: Response, next: any) => {
  const { id } = req.params;
  const { author } = await get(id);

  if (!author) {
    return next({
      error: 'Geen auteur bekend, refresh de pagina, artikel bestaat mogelijk niet.',
      type: 'user',
    });
  }

  return (
    author.toString() === req.headers.userid
      ? next()
      : next({ error: 'Gebruiker is niet de eigenaar van het artikel', type: 'user' })
  );
};

const verifyRole = async (expectedRole: string, userId: string): Promise<boolean> => {
  const { role } = await findUserById(String(userId));
  return expectedRole === role;
};

const verifyAdmin = async (req: Request, res: Response, next: any) => {
  const { headers } = req;
  const { userid: userId } = headers;
  const isAdmin = await verifyRole(userRole.ADMIN, String(userId));

  return (
    isAdmin
      ? next()
      : next({ error: 'Gebruiker is geen administrator', type: 'user' })
  );
};

const verifyPoster = async (req: Request, res: Response, next: any) => {
  const { headers } = req;
  const { userid: userId } = headers;
  const isAdmin = await verifyRole(userRole.ADMIN, String(userId));
  const isPoster = await verifyRole(userRole.POSTER, String(userId));

  return (
    (isPoster || isAdmin)
      ? next()
      : next({ error: 'Geen rechten om te plaatsen.', type: 'user' })
  );
};

const verifyCanDeleteArticle = async (req: Request, res: Response, next: any) => {
  const { id } = req.params;
  const { userid: userId } = req.headers;
  const { author } = await get(id);
  const isAuthor = author.toString() === userId;
  const isAdmin = await verifyRole(userRole.ADMIN, String(userId));

  return (isAuthor || isAdmin)
    ? next()
    : next({ error: 'Geen rechten om te verwijderen.', type: 'user' });
};

export {
  verifyZipcode,
  verifyIsLoggedIn,
  verifyAuthor,
  verifyPoster,
  verifyRole,
  verifyCanDeleteArticle,
  verifyAdmin,
};
export default verifyZipcode;
