import axios from "axios";

const BASE_URL = "https://deliveryvhgp-webapi.azurewebsites.net/api/v1/";
const PRODUCT = "products";
const MENU = "menus";
const ORDER = "orders";
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

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/products/byCategoryId?categoryId=4&page=1&pageSize=10
export const getListProductByCateId = (menuId, cateId, page, size) => {
    return axios.get(`${BASE_URL}${MENU}/${menuId}/${PRODUCT}/byCategoryId?categoryId=${cateId}&page=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/products/byStoreId?storeId=s4&page=1&pageSize=10
export const getListProductByStoreId = (menuId, cateId, page, size) => {
    return axios.get(`${BASE_URL}${MENU}/${menuId}/${PRODUCT}/byStoreId?storeId=${cateId}&page=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings?pageIndex=1&pageSize=20
export const getBuildings = (page, size) => {
    return axios.get(`${BASE_URL}buildings?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas?pageIndex=1&pageSize=20
export const getAreas = (page, size) => {
    return axios.get(`${BASE_URL}areas?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas?pageIndex=1&pageSize=20
export const getApartment = (areaId) => {
    return axios.get(`${BASE_URL}areas/ByAreaId?areaId=${areaId}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/1/customers?pageIndex=1&pageSize=20
export const getListOrder = (userId, page, size) => {
    return axios.get(`${BASE_URL}${ORDER}/${userId}/customers?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders
export const postOrder = (order) => {
    return axios.post(`${BASE_URL}${ORDER}`, order, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/9a552a0b-aea5-4327-97bc-d27fdb960179
export const getOrderDetail = (orderId) => {
    return axios.get(`${BASE_URL}${ORDER}/${orderId}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
