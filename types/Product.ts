export interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;
    images: string[];
    price: number;
    discountPrice?: number;
    stock: number;
    brand: string;
    category: { name: string; slug: string },
    averageRating: number;
    totalReviews: number;
    createdAt?: string;
    updatedAt?: string;
}