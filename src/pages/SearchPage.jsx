import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getListSearchByKey } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import ShopList from "../components/products/ShopList";
import { AppContext } from "../context/AppProvider";

export const SearchPage = () => {
    const { setHeaderInfo, keySearch, setKeySearch, isSearchSubmit, setIsSearchSubmit, menuIdProvider } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [listSearch, setListSearch] = useState(null);
    const [tabActive, setTabActive] = useState(0);
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        let modeId = location.pathname.trim().split("/")[2];
        if (menuIdProvider === "0") {
            history.push(`/mode/${modeId}`);
        }
        setHeaderInfo({ isSearchHeader: true, title: "" });
        return () => {
            setHeaderInfo({});
            // setKeySearch("");
        };
    }, [setHeaderInfo, keySearch]);

    useEffect(() => {
        if (isSearchSubmit) {
            console.log(menuIdProvider);
            setIsLoadingCircle(true);
            getListSearchByKey(keySearch, menuIdProvider, 1, 100)
                .then((res) => {
                    if (res.data) {
                        const data = res.data;
                        setListSearch(data.store);
                        console.log({ data });
                        setIsLoadingCircle(false);
                        setIsSearchSubmit(false);
                    } else {
                        setIsLoadingCircle(false);
                        setIsSearchSubmit(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setListSearch([]);
                    setIsLoadingCircle(false);
                    setIsSearchSubmit(false);
                });
        }
        return () => {};
    }, [isSearchSubmit]);

    return (
        <div>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>
            {listSearch?.length === 0 && (
                <div className="loading-wrapper container">
                    <div className="center_flex" style={{ flexDirection: "column", gap: 20 }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="" />
                        <span style={{ fontSize: 18, fontWeight: "lighter" }}>Không tìm thấy kết quả nào</span>
                    </div>
                </div>
            )}
            <div style={{ paddingTop: 140 }}></div>

            <ShopList data={listSearch !== null && [...listSearch]} />
        </div>
    );
};
