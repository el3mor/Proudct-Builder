import { IProduct } from '../interfaces';
import Button from './ui/Button';
import CircleColor from './ui/CircleColor';

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  const { title, description, imageURL, price, category, colors } = product;
  return (
    <div className="border p-2 flex   justify-between flex-col min-h-[600px]    border-gray-400 rounded-md">
      <img src={imageURL} alt="product" className="rounded-md w-auto h-72 object-cover" />
      <div className="mt-3 space-y-2">
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-base text-gray-500 line-clamp-3">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <CircleColor color={color} key={color} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-base text-indigo-500">${price}</p>
        <img src={category.imageURL} alt={category.name} className="rounded-full w-10 h-auto" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button className="bg-indigo-700">EDIT</Button>
        <Button className="bg-red-700">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
