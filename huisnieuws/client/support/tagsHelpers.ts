import axios from 'axios';

const getTags = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`);
  return res;
};

export default getTags;
