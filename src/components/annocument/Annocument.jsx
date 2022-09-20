import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const Annocument = () => {
    const { mobileModde } = useContext(AppContext);
    const data = [
        {
            id: 1,
            img: "https://dl.airtable.com/.attachments/6dc51fdd29622a10cf683ca8ad203019/01959bec/FS-vi2x.jpg",
        },
        {
            id: 2,
            img: "https://cdn.tgdd.vn/Files/2019/10/15/1208999/chuong-trinh-khuyen-mai-20-10-danh-cho-chi-em-giam-den-50-201910152131516783.jpg",
        },
        {
            id: 3,
            img: "https://dl.airtable.com/.attachments/6dc51fdd29622a10cf683ca8ad203019/01959bec/FS-vi2x.jpg",
        },
    ];
    return (
        <>
            <section className="annocument background">
                <div className="container c_flex annocument-grid" style={{ gap: 10 }}>
                    {data.map((item, index) => (
                        <div className="img" key={index}>
                            <img style={{ borderRadius: "5px" }} src={item.img} width="100%" height="100%" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Annocument;
