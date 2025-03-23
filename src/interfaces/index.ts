import { inputName } from "../types";

export interface IProduct {
  id?: string | undefined;
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

export interface IFormInput {
  id: string;
  name: inputName;
  label: string;
  type:string;
}
