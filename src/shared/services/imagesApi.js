import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '30765883-517ae795d1e2950758ca42c2f',
    image_type: 'photo',
    orientation: 'horizontal',

    per_page: 12,
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
