import { FormEvent, useCallback, useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import Modal from './components/ui/Modal';
import { categories, colorsList, formInputsList, productList } from './data';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import { IProduct } from './interfaces';
import { productValidation } from './validation';
import ErrorMassage from './components/ErrorMassage';
import CircleColor from './components/ui/CircleColor';
import { v4 as uuid } from 'uuid';
import Select from './components/ui/Select';
import toast, { Toaster } from 'react-hot-toast';

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
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: '',
  });
  console.log(productToEdit);
  const open = useCallback(() => setIsOpen(true),[])
  const close = () => setIsOpen(false);
  const openEdit = useCallback(() => setIsEditModelOpen(true),[]);
  const closeEdit = useCallback(() => setIsEditModelOpen(false),[]);
  const openConfirmModal = useCallback(() => setIsConfirmModalOpen(true),[]);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  },[]);
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value });
  };
  function submitHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { title, description, imageURL, price } = prodcut;
    const errors = productValidation({
      title,
      price,
      description,
      imageURL,
      colors: tempColor,
    });
    const hasValidted =
      Object.values(errors).some((err) => err === '') &&
      Object.values(errors).every((val) => val === '');
    if (!hasValidted) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      { ...prodcut, colors: tempColor, id: uuid(), category: selectedCategory },
      ...prev,
    ]);
    setTempColor([]);
    setProduct(defaultProductObj);
    setSelectedCategory(categories[0]);
    close();
    toast('Product Added Successfully',
      {
        icon: '✅',
        
      }
    );
  }
  const editHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price, colors } = productToEdit;
    const errors = productValidation({
      title,
      price,
      description,
      imageURL,
      colors,
    });
    const hasValidted =
      Object.values(errors).some((err) => err === '') &&
      Object.values(errors).every((val) => val === '');
    if (!hasValidted) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...prodcuts];
    updatedProducts[productToEditIdx] = { ...productToEdit, colors: productToEdit.colors, category: selectedCategory };
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setSelectedCategory(categories[0]);
    closeEdit();
    toast('Product Edit Successfully',
      {
        icon: '✅',
        
      }
    );
  };
  const onClose = () => {
    setProduct(defaultProductObj);
    setErrors({
      title: '',
      description: '',
      imageURL: '',
      price: '',
      colors: '',
    });
    setTempColor([]);
    close();
  };
  const colorHandler = (color: string) => {
    if (tempColor.includes(color)) {
      setTempColor((prev) => prev.filter((c) => c !== color));
    } else {
      setTempColor((prev) => [...prev, color]);
    }
  };

  const editColorHandler = (color: string) => {
    if (productToEdit.colors.includes(color)) {
      setProductToEdit((prev) => ({ ...prev, colors: prev.colors.filter((c) => c !== color) }));
    } else {
      setProductToEdit((prev) => ({ ...prev, colors: [...prev.colors, color] }));
    }
  };

  const randerProductLists = prodcuts.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEdit={openEdit}
      setSelectedCategory={setSelectedCategory}
      setProductToEditIdx={setProductToEditIdx}
      idx={idx}
      openConfirmModal={openConfirmModal}
    />
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
  const randerEditFormInputsLists = formInputsList.map((input) => (
    <div className="flex flex-col gap-2" key={input.id}>
      <label htmlFor={input.id} className="text-sm font-medium text-gray-700">
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={productToEdit[input.name]}
        onChange={handleEditChange}
      />
      <ErrorMassage msg={errors[input.name]} />
    </div>
  ));
  const randerColorsList = colorsList.map((color) => (
    <CircleColor key={color} color={color} onClick={() => colorHandler(color)} />
  ));
  const randerColorsEditList = colorsList.map((color) => (
    <CircleColor key={color} color={color} onClick={() => editColorHandler(color)} />
  ));
  const removeProductHandler = () => {
    
    const filteredProducts = prodcuts.filter(prodcut => prodcut.id !== productToEdit.id);
    setProducts(filteredProducts);
    closeConfirmModal();
    toast('Product Removed Successfully',
      {
        icon: '✅',
        
      }
    );
  }

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('products', JSON.stringify(prodcuts));
    }, 500)
    
  }, [prodcuts])
  useEffect(() => {
    const data = localStorage.getItem('products');
    if (data) {
      setProducts(JSON.parse(data));
    }
  }, [])
  return (
    <div className="@container flex flex-col items-center mt-5   ">
      <Button className="bg-indigo-700" width="w-fit" onClick={open}>
        Add New Product
      </Button>
      {prodcuts.length === 0 && <div className='w-full h-full flex items-center justify-center '>
        <h1 className="text-2xl font-bold text-center">No Products Found</h1>
        </div>}
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md ">
       
        {randerProductLists}
      </div>
      {/* {Add Product Model} */}
      <Modal close={onClose} isOpen={isOpen} title="ADD A NEW PRODUCT">
        <form className="space-y-5" onSubmit={submitHandler}>
          {randerFormInputsLists}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center justify-around">{randerColorsList}</div>
          <ErrorMassage msg={errors.colors} />
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
          </div>
        </form>
      </Modal>
      {/* Edit Product Model */}
      <Modal close={closeEdit} isOpen={isEditModelOpen} title="EDIT THIS PRODUCT">
        <form className="space-y-5" onSubmit={editHandler}>
          {randerEditFormInputsLists}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center justify-around">{randerColorsEditList}</div>
          <ErrorMassage msg={errors.colors} />
          {productToEdit.colors.length > 0 && (
            <div className="flex items-center   flex-wrap gap-4">
              {productToEdit.colors.map((color) => (
                <span
                  key={color}
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
          </div>
        </form>
      </Modal>
      {/* Delete Product Model  */}
      <Modal close={closeConfirmModal} isOpen={isConfirmModalOpen} title="Are You Sure you want to delete this product?" 
      description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action.">
        

          <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>

      </Modal>
      <Toaster 
        position="bottom-left"
      />
    </div>
  );
}

export default App;
