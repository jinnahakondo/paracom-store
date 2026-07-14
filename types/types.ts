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


export interface CartItemType<TItem = string> {
  _id: Types.ObjectId;
  product: TItem;
  quantity: number;
}


export interface CartType {
  user?: Types.ObjectId;
  items: CartItemType[];
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