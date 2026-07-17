import { CartItemType, CartType, CategoryType, ProductType } from "@/types/types";
import axiosInstance from "./axiosInstance";


export const getSingleProduct = async (
    slug: string
): Promise<ProductType<CategoryType>> => {
    try {
        const url = `${process.env.BASE_URL}/api/products/${slug}`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch product");
        }

        const { data } = await res.json();

        return data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }

        throw new Error("Failed to get product");
    }
};


export const getAllProducts = async (urlParams: string) => {
    try {
        const url = `${process.env.BASE_URL}/api/products?${urlParams}`
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error("failed to fetch products")
        }

        const { data: products, total }: { data: ProductType<CategoryType>[], total: number } = await res.json()

        return { products, total }
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }

        throw new Error("Failed to get products");
    }
}


export const getAllCategories = async () => {
    try {
        const url = `${process.env.BASE_URL}/api/categories`
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error("failed to fetch categories")
        }

        const { data }: { data: CategoryType[] } = await res.json()

        return data

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }

        throw new Error("Failed to get categories");
    }
}

export const getCategoryWiseProduct = async (categorySlug: string) => {
    try {
        const url = `${process.env.BASE_URL}/api/products?category=${categorySlug}&limit=4`

        const res = await fetch(url)

        if (!res.ok) {
            throw new Error("failed to fetch category wise product")
        }

        const { data }: { data: ProductType[] } = await res.json()

        return data;

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }

        throw new Error("Failed to get category wise product");
    }
}


// client api 
export const getCartData = async () => {
    const res = await axiosInstance.get("/api/cart")
    return res.data
}

export const addToCartDB = async ({ product, quantity }:
    { product: string, quantity?: number }
) => {
    const res = await axiosInstance.post("/api/cart", { product, quantity });
    return res.data
}

export const removeDBCartItem = async (itemId: string) => {
    const res = await axiosInstance.delete(`/api/cart/removeItem/${itemId}`);
    return res.data

}

export const updateQuantity = async ({ itemId, value }: {
    itemId: string, value: number
}) => {
    const res = await axiosInstance.patch(`/api/cart/${itemId}`,
        { value }
    )
    return res.data
}

export const mergeCartDb = async (cart: CartItemType[]) => {
    const res = await axiosInstance.post('/api/cart/merge', cart)
    return res.data;
}