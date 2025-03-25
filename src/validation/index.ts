export const productValidation = (product: {title: string;price: string;description: string;imageURL: string;colors:string[]}) => {
  const errors: {title: string;price: string;description: string;imageURL: string; colors:string} = {
    title: '',
    price: '',
    description: '',
    imageURL: '',
    colors: '',
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

    if(!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
      errors.title = 'Title must be between 10 and 80 characters';
    }
    if(!product.description.trim() || product.description.length < 10 || product.description.length > 1500) {
      errors.description = 'Title must be between 10 and 1500 characters';
    }
    if(!product.imageURL.trim() || !validUrl) {
      errors.imageURL = 'Valid image URL is required';
    }
    if(!product.price.trim() || isNaN(Number(product.price))) {
      errors.price = 'Valid price is required';
    }
    if(product.colors.length === 0) {
      errors.colors = 'Select at least one color';
    }
  return errors
};
