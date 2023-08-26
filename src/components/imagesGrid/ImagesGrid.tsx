import { Image } from '../../utils/Image.interface';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

export interface ImageGridProps {
  imagesArr: Image[];
}
const ImagesGrid: React.FC<ImageGridProps> = ({ imagesArr }) => {
  return (
    <div className="w-full p-2 bg-gray-300 mt-4 rounded-md min-h-[10em] text-center">
      {imagesArr?.length === 0 ? (
        <div className="flex flex-col justify-center h-full items-center gap-4">
          <h2 className="text-3xl">No images found :( Submit a new one!</h2>
          <BrokenImageIcon sx={{ fontSize: 45 }} color="action" />
        </div>
      ) : (
        <h1>Image Array is not empty</h1>
      )}
    </div>
  );
};

export default ImagesGrid;
