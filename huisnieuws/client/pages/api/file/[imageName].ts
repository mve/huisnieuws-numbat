import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const deleteImage = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  const { imageName } = request.query;

  try {
    fs.unlinkSync(`./public/images/${imageName}`);
  } catch (err) {
    return response.status(500).send(err);
  }

  return response.status(200).send('');
};
const serveImage = (request: NextApiRequest, response: NextApiResponse): any => {
  const { imageName } = request.query;
  try {
    return fs.readFile(`./public/images/${imageName}`, (error, data) => (
      error
        ? response.status(404).send('')
        : response.setHeader('Content-Type', 'image').send(data)));
  } catch (err) {
    return response.status(404).send('');
  }
};

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  if (request.method === 'DELETE') {
    return deleteImage(request, response);
  }

  if (request.method === 'GET') {
    return serveImage(request, response);
  }

  return response.status(404).send('');
};
