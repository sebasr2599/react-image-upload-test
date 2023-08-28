import React, { useEffect } from 'react';
import { Image } from '../../../utils/Image.interface';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Button, Card, CardActionArea, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import { getImageFileURL } from '../../../services/ImageService';

export interface ImageGridProps {
  imagesArr: Image[];
  allImages: () => void;
  onDelete: (image: Image) => void;
  onEdit: (image: Image) => void;
}
const ImagesGrid: React.FC<ImageGridProps> = ({
  imagesArr,
  allImages,
  onDelete,
  onEdit,
}) => {
  useEffect(() => {
    allImages();
  }, [allImages]);

  return (
    <div className="w-full p-2 bg-gray-300 mt-4 rounded-md min-h-[10em] text-center">
      {imagesArr?.length === 0 ? (
        <div className="flex flex-col justify-center h-full items-center gap-4">
          <h2 className="text-3xl">No images found :( Submit a new one!</h2>
          <BrokenImageIcon sx={{ fontSize: 45 }} color="action" />
        </div>
      ) : (
        <div className="grid imgGridContainer gap-2 p-4">
          {imagesArr.map((image, index) => (
            <Card key={index} className="p-2 w-4/12 justify-self-center">
              <CardActionArea onClick={() => onEdit(image)}>
                <CardMedia
                  component="img"
                  src={`http://localhost:3000/${image.fileName}`}
                />
                <h1 className="w-full text-2xl">
                  {image?.title ? image?.title : 'No title available'}
                </h1>
              </CardActionArea>
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                // onClick={() => onDeleteImage(image?.id)}
                onClick={() => onDelete(image)}
              >
                Delete Image
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesGrid;
