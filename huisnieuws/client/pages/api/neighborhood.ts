import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

const getGeojsonNeighborhoodData = () => (
  JSON.parse(fs.readFileSync(`./geojson/neighborhoods.json`, 'utf-8'))
);

const getNeighborhoodData = (zipcode: string): object => ({
  type: 'FeatureCollection',
  features: getGeojsonNeighborhoodData().features.filter(({ properties }) => (
    properties.zipcode === zipcode)),
});

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  if (request.method === 'GET') {
    let { zipcode } = request.query;
    zipcode = String(zipcode).substring(0, 4);
    const neighborhoodData = getNeighborhoodData(zipcode);

    return response.status(200).json(neighborhoodData);
  }

  return response.status(404).send('');
};
