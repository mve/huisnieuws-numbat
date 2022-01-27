import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

const getProvinceData = (province: string): any => (
  JSON.parse(fs.readFileSync(`./geojson/provinces/${province}.json`, 'utf-8'))
);

const getCityData = (province: string, city: string): object => ({
  type: 'FeatureCollection',
  features: getProvinceData(province).features.filter(({ properties }) => properties.name === city),
});

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  if (request.method === 'GET') {
    const { city, province } = request.query;
    const cityData = getCityData(String(province), String(city));

    return response.status(200).json(cityData);
  }

  return response.status(404).send('');
};
