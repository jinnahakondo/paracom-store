import { categoryType } from "./category";

export interface ProductType {
    _id: string;

    title: string;
    slug: string;
    description: string;

    images?: string[];

    price: number;
    discountPrice?: number;

    stock: number;

    brand?: string;

    category: string | categoryType

    averageRating: number;
    totalReviews: number;

    createdBy?: {
        _id: string;
        name: string;
        email: string;
    };

    createdAt: string;
    updatedAt: string;
}