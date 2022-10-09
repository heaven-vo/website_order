export const LOCALSTORAGE_CART_NAME = "Cart";
export const LOCALSTORAGE_USER_NAME = "User";
export const LOCALSTORAGE_USER_LOGIN = "Auth";
export const CATE_FITLER = "cate";
export const STORE_FILTER = "store";
export const IMAGE_NOTFOUND = "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/food%2Ftopic-2.webp?alt=media&token=54a5086f-f2ea-4009-9479-28624019703e";
export const IMAGE_NOTFOUND_v2 = "https://cdn.dribbble.com/users/1078347/screenshots/2787652/category_not_found.png";

export const PAYMENT = [
    {
        paymentName: "Tiền mặt",
        paymentDescription: "Tiền mặt",
        paymentIcon: "Thanh toán tiền mặt khi nhận hàng",
        paymentId: "1",
    },
    {
        paymentName: "Momo",
        paymentDescription: "Thanh toán qua MoMo",
        paymentIcon: "",
        paymentId: "1",
    },
];

export const STATUS_ORDER = [
    {
        id: "1",
        statusName: "Chờ xác nhận",
        color: "rgba(0,0,0,.4)",
        img: "",
    },
    {
        id: "2",
        statusName: "Đang chuẩn bị",
        color: "var(--primary)",
        img: "",
    },
    {
        id: "3",
        statusName: "Đang giao",
        color: "#077E8C",
        img: "",
    },
    {
        id: "4",
        statusName: "Hoàn thành",
        color: "#52b65b",
        img: "",
    },
    {
        id: "5",
        statusName: "Đã hủy",
        color: "#e94560",
        img: "",
    },
];

export const getStatusName = (id) => {
    let statusName = "";
    STATUS_ORDER.map((item) => {
        if (id === item.id) {
            statusName = item.statusName;
        }
    });
    return statusName;
};
export const getStatusColor = (id) => {
    let color = "";
    STATUS_ORDER.map((item) => {
        if (id === item.id) {
            color = item.color;
        }
    });
    return color;
};
export const getStatusImg = (id) => {
    let img = "";
    STATUS_ORDER.map((item) => {
        if (id === item.id) {
            img = item.img;
        }
    });
    return img;
};
