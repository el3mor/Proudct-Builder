export interface IProduct {
  id: string;
  title: string;
  price: string;
  description: string;
  imageURL: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  }
}
