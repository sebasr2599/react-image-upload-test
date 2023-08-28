import { Image } from '../utils/Image.interface';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:3000';

// List
export const getImages = async (): Promise<Image[]> => {
  return await axios
    .get(`${BACKEND_URL}/api/image`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
// Create
export const addImage = async (
  file: FormData,
  title: string | null
): Promise<Image> => {
  return await axios
    .post(`${BACKEND_URL}/api/image`, file, { params: { title: title } })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

// Update
export const updateImage = async (image: Image): Promise<Image> => {
  return await axios
    .patch(`${BACKEND_URL}/api/image/${image.id}`, { title: image.title })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
// Url
export const getImageFileURL = async (
  fileName: string
): Promise<{ fileURL: string }> => {
  return await axios
    .get(`${BACKEND_URL}/api/image/img/${fileName}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

//Delete
export const deleteImage = async (id: number): Promise<Image> => {
  return await axios
    .delete(`${BACKEND_URL}/api/image/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
