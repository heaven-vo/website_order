import axios from "axios";

const BASE_URL = "https://deliveryvhgp-webapi.azurewebsites.net/api/v1/";
const PRODUCT = "products";
const MENU = "menus";
const CATEGORY = "category-management";
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/filter?modeId=1&gb=cate?page=1&pageSize=10
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/filter?modeId=1&gb=cate&page=1&pageSize=10
export const getMenuByMode = (modeId, groupBy, page, size) => {
    return axios.get(`${BASE_URL}${MENU}/filter?modeId=${modeId}&gb=${groupBy}&page=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/products/p1
export const getProductDetail = (id) => {
    return axios.get(`${BASE_URL}${PRODUCT}/${id}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
