import { File } from 'babel-types';
import { Article } from '../types/article';
import { Reach } from '../enums/reach';

const toSlug = (text: string, suffix: string = ''): string => (
  text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + suffix
);

const getDetailPage = ({ id, title }: Article): string => (
  encodeURI(`/artikelen/${id}/${toSlug(title)}`)
);

const getPostDate = (article: Article): string => new Date(article.createdAt).toLocaleDateString('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

const getDateSince = (date: string, now: number = new Date().getTime()): string => {
  const edited = new Date(date).getTime();
  const hoursSince = (now - edited) / (3600 * 1000);

  if (hoursSince * 60 < 1) return 'Zojuist';
  if (Math.round(hoursSince * 60) === 1) return '1 minuut geleden';
  if (hoursSince < 1) return `${Math.round(hoursSince * 60)} minuten geleden`;
  if (hoursSince < 24) return `${Math.round(hoursSince)} uur geleden`;
  if (hoursSince < 48) return 'Gisteren';
  if (hoursSince < 72) return 'Eergisteren';
  if (hoursSince / 24 < 30) return `${Math.round(hoursSince / 24)} dagen geleden`;
  if (hoursSince / 24 < 60) return 'Een maand geleden';
  if (hoursSince / 24 < 365) return `${Math.round(hoursSince / 24 / 30)} maanden geleden`;

  return `${Math.round(hoursSince / 24 / 365)} jaar geleden`;
};

const getReachNewsType = (article: Article): string | null => {
  switch (article.reach) {
    case Reach.CITY:
      return 'Stedelijk nieuws';
    case Reach.NEIGHBOURHOOD:
      return 'Buurtnieuws';
    case Reach.STREET:
      return 'Straatnieuws';
    default:
      return null;
  }
};

const lightenOrDarkenColor = (color: string, amount: number): string => {
  let usePound = false;
  let strippedColor = color;

  if (color[0] === '#') {
    strippedColor = color.slice(1);
    usePound = true;
  }

  const number = parseInt(strippedColor, 16);

  let r = (number >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((number >> 8) & 0x00FF) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (number & 0x0000FF) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

const isImage = (file: File): boolean => file && file.type.split('/')[0] === 'image';

const imageSizeToLarge = (size: number, maxSize: number): boolean => size && size <= maxSize;

export {
  toSlug,
  getDetailPage,
  lightenOrDarkenColor,
  getPostDate,
  getDateSince,
  getReachNewsType,
  isImage,
  imageSizeToLarge,
};
