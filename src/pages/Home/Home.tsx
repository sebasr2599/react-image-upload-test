import { useCallback, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { getImages, updateImage } from '../../services/ImageService';
import { Image } from '../../utils/Image.interface';
import ImagesGrid from './imagesGrid/ImagesGrid';
import ImageModal from './ImageModal';
import { addImage } from '../../services/ImageService';
import { deleteImage } from '../..//services/ImageService';

export interface HomeProps {
  // text: string;
  num?: number;
  // fn?: (name: string) => void;
  // owner?: Person;
}
const fileTypes = ['png', 'jpg', 'jpeg'];
const model: Image = {
  id: null,
  title: null,
  fileName: null,
};
export const Home: React.FC<HomeProps> = () => {
  const [file, setFile] = useState<Blob>();
  const [imagesArr, setimagesArr] = useState<Image[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('');
  const [image, setImage] = useState<Image>({
    id: null,
    title: null,
    fileName: null,
  });

  const allImages = useCallback(() => {
    getImages()
      .then((data) => {
        setimagesArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnAccept = () => {
    if (!image.title) {
      image.title = '';
    }
    if (image.id) {
      updateImage(image)
        .then((data) => console.log(data))
        .finally(() => {
          handleOnCloseModal();
          allImages();
        });
    } else {
      const fileFormData = new FormData();
      if (file) {
        fileFormData.append('file', file);
      }

      addImage(fileFormData, image.title)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          handleOnCloseModal();
          allImages();
        });
    }
  };

  const handleOnOpenModal = () => setOpen(true);
  const handleOnCloseModal = () => {
    setOpen(false);
    setMode('');
  };

  const handleOnChangeFileDrag = (file: Blob) => {
    handleOnOpenModal();
    setFile(file);
    // model.file = file;
    setImage(model);
  };

  const onDelete = (image: Image) => {
    setMode('Delete');
    setImage(image);
    handleOnOpenModal();
  };

  const onDeleteImage = (id: number | null | undefined) => {
    if (!id) {
      console.log('error');
    } else {
      deleteImage(id)
        .then((data) => console.log(data))
        .finally(() => {
          allImages();
          handleOnCloseModal();
        });
    }
  };
  const handleOnEdit = (image: Image) => {
    setImage(image);
    handleOnOpenModal();
  };
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-4xl font-bold my-2">BHCG Exam</h1>
      <FileUploader
        handleChange={handleOnChangeFileDrag}
        name="file"
        label="Upload or drop an image here"
        types={fileTypes}
      />
      <ImagesGrid
        imagesArr={imagesArr}
        allImages={allImages}
        onEdit={handleOnEdit}
        onDelete={onDelete}
      />
      <ImageModal
        open={open}
        handleOnClose={handleOnCloseModal}
        onAccept={handleOnAccept}
        title="Test Modal"
        file={file}
        image={image}
        setImage={setImage}
        handleOnDeleteAccept={onDeleteImage}
        mode={mode}
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
