import { Types } from "mongoose";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export interface ProductType<TCategory = string> {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  discountPrice?: number;
  stock: number;
  brand?: string;
  category: TCategory;
  averageRating: number;
  totalReviews: number;
  createdBy?: UserType;
  createdAt: string;
  updatedAt: string;
}


export interface CartItemType {
  _id?: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  isSelected: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}




export interface ReviewType<
  TUser = string,
  TProduct = string
> {
  _id: string;
  user: TUser;
  product: TProduct;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}


export interface SearchSuggestionItemType {
  _id?: string;
  title: string;
  images: string[];
  price: number;
  category: {
    name: string,
    slug: string,
  };
  slug: string;
}


export interface AddressType {
  _id?: string;
  name: string;
  phone: string;
  division: string;
  district: string;
  city: string;
  postalCode: number | string;
  address: string;
  isDefault?: boolean;
}