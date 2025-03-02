import axios from "axios";

const SERVER_URL = "";

// @desc Get All Categories
export const getAllCategories = () => {
    const url = `${SERVER_URL}/api/category/GetAllCategories`;
    return axios.get(url)
}

// @desc Get All Products
export const getAllProducts = () => {
    const url = `${SERVER_URL}/api/Products/GetAllProducts`;
    return axios.get(url)
}

// @desc Get a category products
export const getProductsByCategory = (id) => {
    const url = `${SERVER_URL}/api/Products/GetProductsByCaterory?categoryId=${id}`;
    return axios.get(url)
}
