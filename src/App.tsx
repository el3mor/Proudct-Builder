import { FormEvent, useState } from 'react';
import ProductCard from './components/ProductCard';
import Modal from './components/ui/Modal';
import { categories, colorsList, formInputsList, productList } from './data';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import { IProduct } from './interfaces';
import { productValidation } from './validation';
import ErrorMassage from './components/ErrorMassage';
import CircleColor from './components/ui/CircleColor';
import { v4 as uuid } from "uuid";
import Select from './components/ui/Select';

function App() {
  const defaultProductObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: '',
    },
  };

  const [prodcuts, setProducts] = useState<IProduct[]>(productList);
  const [prodcut, setProduct] = useState<IProduct>(defaultProductObj);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
  });
  console.log(selectedCategory)

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...prodcut, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  function submitHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { title, description, imageURL, price } = prodcut;
    const errors = productValidation({
      title,
      price,
      description,
      imageURL,
    });
    const hasValidted =
      Object.values(errors).some((err) => err === '') &&
      Object.values(errors).every((val) => val === '');
    if (!hasValidted) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [{ ...prodcut, colors: tempColor, id:uuid() , category:selectedCategory}, ...prev]);
    setTempColor([]);
    setProduct(defaultProductObj);
    setSelectedCategory(categories[0]);
    close();
  }
  const onClose = () => {
    setProduct(defaultProductObj);
    close();
  };
  const colorHandler = (color: string) => {
    if(tempColor.includes(color)){
      setTempColor(prev => prev.filter((c) => c !== color))
    }else{
      setTempColor(prev => [...prev, color])
    }
  }

  const randerProductLists = prodcuts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const randerFormInputsLists = formInputsList.map((input) => (
    <div className="flex flex-col gap-2" key={input.id}>
      <label htmlFor={input.id} className="text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={prodcut[input.name]}
        onChange={handleChange}
      />
      <ErrorMassage msg={errors[input.name]} />
    </div>
  ));
  const randerColorsList = colorsList.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => colorHandler(color)}
    />
  ));

  return (
    <div className="@container mx-auto">
      <Button className="bg-indigo-700" width="w-fit" onClick={open}>
        Add New Product
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md ">
        {randerProductLists}
      </div>
      <Modal close={close} isOpen={isOpen} title="ADD A NEW PRODUCT">
        <form className="space-y-5" onSubmit={submitHandler}>
          {randerFormInputsLists}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center justify-around">{randerColorsList}</div>
          {tempColor.length > 0 && (
            <div className="flex items-center   flex-wrap gap-4">
              {tempColor.map((color) => (
                <span
                  style={{ background: color }}
                  className=" text-[10px] text-white  flex items-center justify-center  w-12 h-7 rounded-lg"
                >
                  {color}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex space-x-4">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-300 hover:bg-gray-400" onClick={onClose}>
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
