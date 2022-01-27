import axios from 'axios';
import { Article } from '../types/article';

const getZipcodeData = async (zipcode: string) => {
  const params = { zipcode };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/maps`, { params });
  return res;
};

const getZipcodeDataForEachArticle = async (articles: Article[]) => {
  const zipcodes = articles.map((article) => ({ zipcode: article.zipcode }));
  const params = { zipcodes };
  const res = (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/maps/articles`, { params })).data;

  return res;
};

export { getZipcodeData, getZipcodeDataForEachArticle };
