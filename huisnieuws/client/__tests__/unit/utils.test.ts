import {
  getDateSince, getPostDate, getReachNewsType, toSlug,
} from '../../support/utils';
import { Article } from '../../types/article';
import { Reach } from '../../enums/reach';

const article: Article = {
  _id: '5c9b9f9f9f9f9f9f9f9f9f9',
  title: 'Test Article',
  zipcode: '7007CL',
  author: '5c9b9f9f9f9f9f9f9f9f9f9',
  updatedAt: String(new Date(2018, 0, 1, 21, 0, 0)),
  createdAt: String(new Date(2018, 0, 1, 20, 0, 0)),
  tags: [{
    name: 'test',
    color: '#ffffff',
  },
  {
    name: 'test2',
    color: '#ffffff',
  }],
  image: 'city.jpeg',
  text: 'This is a test article',
  reach: Reach.STREET,
  comments: [],
};

describe('Utilities should work', () => {
  it('should convert a string to a slug', () => {
    expect(toSlug('Hello World')).toBe('hello-world');
  });

  it('should get the post date correctly', () => {
    expect(getPostDate(article)).toBe('1 januari 2018 20:00');
  });

  it('should get date since correctly', () => {
    const twoMinAgo = new Date().getTime() - 120000;

    expect(getDateSince(new Date(twoMinAgo).toString(), (new Date().getTime()))).toBe('2 minuten geleden');
  });

  it('should get reach news type successfully', () => {
    expect(getReachNewsType(article)).toBe('Straatnieuws');
    expect(getReachNewsType({ ...article, reach: Reach.NEIGHBOURHOOD })).toBe('Buurtnieuws');
    expect(getReachNewsType({ ...article, reach: Reach.CITY })).toBe('Stedelijk nieuws');
  });
});
