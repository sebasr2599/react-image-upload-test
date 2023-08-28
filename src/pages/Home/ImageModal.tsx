import React from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { InputAdornment, TextField } from '@mui/material';
import { Image } from '../../utils/Image.interface';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export interface ImageModalProps {
  open: boolean;
  handleOnClose: () => void;
  handleOnDeleteAccept: (id: number | null | undefined) => void;
  onAccept: () => void;
  setImage: React.Dispatch<React.SetStateAction<Image>>;
  title?: string;
  file?: Blob;
  image: Image;
  mode: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  handleOnClose,
  file,
  image,
  onAccept,
  setImage,
  mode,
  handleOnDeleteAccept,
}) => {
  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setImage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      {mode === 'Delete' ? (
        <ModalTemplate
          open={open}
          handleOnAccept={() => handleOnDeleteAccept(image?.id)}
          handleOnClose={handleOnClose}
          title="Delete image"
        >
          <h1>
            Are you sure you want to delete the file titled {image.title}?
          </h1>
        </ModalTemplate>
      ) : (
        <ModalTemplate
          open={open}
          handleOnAccept={onAccept}
          handleOnClose={handleOnClose}
          title={image?.id ? 'Edit Image' : 'Add new Image'}
        >
          <div className="mt-2 w-full flex flex-col gap-4">
            <TextField
              className="w-full"
              required
              label="Image Title"
              name="title"
              defaultValue={image?.title}
              onChange={onInputChange}
            />
            <TextField
              className="w-full"
              required
              label="Image file name"
              disabled
              defaultValue={file?.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddPhotoAlternateIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </ModalTemplate>
      )}
    </div>
  );
};

export default ImageModal;
// TODO: Edit image
//  TODO: Images display
//  TODO: Images Click and open idividual
//  TODO: Send Image edit request
// TODO: Delete Image
//TODO: Done:)
