import express from 'express';
import axios from 'axios';
import { Promise } from 'mongoose';
import { formatZipcode } from '../helpers/utils';
import { verifyZipcode } from '../helpers/middleware';

const mapRouter = express.Router();

mapRouter.get('/', verifyZipcode, async (request, result) => {
  const zipcode = formatZipcode(JSON.stringify(request.query.zipcode));
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search.php?q=${zipcode}, Nederland&format=jsonv2&countrycodes=NL&limit=1`,
    );
    return result.status(200).json(res.data[0]);
  } catch (e: any) {
    return result.status(500).json(JSON.stringify(e));
  }
});

mapRouter.get('/articles', async (request: any, result) => {
  const zipcodes = request.query.zipcodes?.map((zipcode: string) => JSON.parse(zipcode));

  if (zipcodes?.length >= 20) {
    zipcodes.splice(20, zipcodes.length - 1);
  }

  const res: Promise<any>[] = [];
  try {
    for (let i = 0; i < zipcodes?.length; i += 1) {
      res.push(axios.get(
        `https://nominatim.openstreetmap.org/search.php?q=${zipcodes[i].zipcode}, Nederland&format=jsonv2&countrycodes=NL&limit=1`,
      ));
    }
    let zipcodeData: any[] = [];
    await Promise.all(res)
      .then((e: any) => {
        zipcodeData = e.map((element: any) => element.data[0]);
      });

    return result.status(200).json(zipcodeData);
  } catch (e: any) {
    return result.status(500).json(JSON.stringify(e));
  }
});

mapRouter.use((error: any, req: any, res: any, next: any) => {
  next();

  return res.status(400).send(JSON.stringify(error));
});

export default mapRouter;
