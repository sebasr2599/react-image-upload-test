import { Image } from '../utils/Image.interface';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:3000';

export const getImages = async (): Promise<Image[]> => {
  return await axios
    .get(`${BACKEND_URL}/api/image`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
