import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { getImages } from '../../services/ImageService';
import { Image } from '../../utils/Image.interface';
import ImagesGrid from '../../components/imagesGrid/ImagesGrid';
import ImageModal from './ImageModal';
import { Button } from '@mui/material';

export interface HomeProps {
  // text: string;
  num?: number;
  // fn?: (name: string) => void;
  // owner?: Person;
}
const fileTypes = ['png', 'jpg', 'jpeg'];

export const Home: React.FC<HomeProps> = () => {
  const [file, setFile] = useState<File>();
  const [imagesArr, setimagesArr] = useState<Image[]>([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<Image>({
    id: null,
    title: null,
    fileName: null,
  });

  useEffect(() => {
    getImages()
      .then((data) => {
        console.log(data);
        setimagesArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnOpenModal = () => setOpen(true);
  const handleOnCloseModal = () => setOpen(false);
  const handleOnChangeFileDrag = (file: File) => {
    handleOnOpenModal();
    setFile(file);
  };
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-4xl font-bold my-2">BHCG Exam</h1>
      <FileUploader
        handleChange={handleOnChangeFileDrag}
        name="file"
        label="Upload or drop an image here"
        types={fileTypes}
      />
      <ImagesGrid imagesArr={imagesArr} />
      <Button onClick={handleOnOpenModal}>Click</Button>
      <ImageModal
        open={open}
        handleOnClose={handleOnCloseModal}
        title="Test Modal"
        handleOnAccept={handleOnCloseModal}
        file={file}
        image={image}
      />
    </div>
  );
};
export default Home;
/*
 * Big drag and drop that displays a modal to upload the image
 * Image listing with individual card that display the image + information
 * Clicking the image displays a modal with a edit/delete option
 *
 * */
