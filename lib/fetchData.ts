import { CategoryType, ProductType } from "@/types/types";

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