import React from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { TextField } from '@mui/material';
import { Image } from '../../utils/Image.interface';
export interface ImageModalProps {
  open: boolean;
  handleOnClose: () => void;
  handleOnAccept: () => void;
  title?: string;
  file?: File;
  image: Image;
}

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  handleOnClose,
  handleOnAccept,
  file,
  image,
}) => {
  return (
    <ModalTemplate
      open={open}
      handleOnAccept={handleOnAccept}
      handleOnClose={handleOnClose}
      title={image?.id ? 'Edit Image' : 'Add new Image'}
    >
      <div className="mt-2 w-full flex flex-col ">
        <TextField
          className="w-full"
          required
          label="Image Title"
          defaultValue={image?.title}
        />
      </div>
    </ModalTemplate>
  );
};

export default ImageModal;
// TODO: Add onChange to fill data
// TODO: Send Image in Post request
// TODO: Edit image
//  TODO: Images display
//  TODO: Images Click and open idividual
//  TODO: Send Image edit request
// TODO: Delete Image
//TODO: Done:)
