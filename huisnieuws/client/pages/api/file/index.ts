import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (request: NextApiRequest): Promise<void> => {
  const form = new formidable.IncomingForm();

  form.parse(request, async (err, fields, files) => {
    await saveFile(files.file, fields.name);
  });
};

const saveFile = async ({ filepath }, name: string): Promise<void> => {
  const data = fs.readFileSync(filepath);
  fs.writeFileSync(`./public/images/${name}`, data);
  await fs.unlinkSync(filepath);
};

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  if (request.method === 'POST') {
    try {
      await post(request);
      return response.status(201).send('');
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  return response.status(404).send('');
};
