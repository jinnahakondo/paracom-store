import { NextResponse } from "next/server";
import mongoose from "mongoose";
import slugify from 'slugify';
import crypto from 'crypto'

type SuccessResponse<T = unknown> = {
    data?: T;
    message: string;
    status?: number;
};

type ErrorResponse = {
    message?: string;
    status?: number;
    error?: unknown;
};

export const response = {
    success<T>({
        data,
        message = "Success",
        status = 200,
    }: SuccessResponse<T>) {
        return NextResponse.json(
            {
                success: true,
                message,
                ...(data !== undefined && { data }),
            },
            { status }
        );
    },

    error({
        message = "Something went wrong",
        status = 500,
        error,
    }: ErrorResponse = {}) {
        return NextResponse.json(
            {
                success: false,
                message,
                ...(process.env.NODE_ENV === "development" &&
                    error !== undefined && { error }),
            },
            { status }
        );
    },
};



export const isValidId = (id: string) => {
    return mongoose.Types.ObjectId.isValid(id);
};




// generate unique slug 
export const generateSlug = (name: string) => {
    const baseSlug = slugify(name, {
        lower: true,
        strict: true,
        trim: true
    })

    const uniqueId = crypto.randomBytes(2).toString('hex');
    return `${baseSlug}-${uniqueId}`
}
