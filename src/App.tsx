import { useState } from 'react';
import ProductCard from './components/ProductCard';
import Modal from './components/ui/Modal';
import { formInputsList, productList } from './data';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import { IProduct } from './interfaces';

function App() {
  const [prodcut, setProduct] = useState<IProduct>({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: '',
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...prodcut, [e.target.name]: e.target.value });
  }


  const randerProductLists = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const randerFormInputsLists = formInputsList.map((input) => (
    <div className="flex flex-col gap-2" key={input.id}>
      <label htmlFor={input.id} className="text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input type={input.type} id={input.id} name={input.name} value={prodcut[input.name]} onChange={handleChange}/>
    </div>
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
        <div className="flex flex-col gap-5 mb-4">{randerFormInputsLists}</div>
        <div className="flex space-x-4">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button className="bg-gray-300 hover:bg-gray-400" onClick={close}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
