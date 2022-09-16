import React from "react";

const Annocument = () => {
    const mystyle = {
        width: "32.5%",
        height: "340px",
    };
    // const mystyle1 = {
    //     width: "33%",
    //     height: "340px",
    // };
    return (
        <>
            <section className="annocument background">
                <div className="container d_flex">
                    <div className="img" style={mystyle}>
                        <img style={{ borderRadius: "5px" }} src="https://dl.airtable.com/.attachments/6dc51fdd29622a10cf683ca8ad203019/01959bec/FS-vi2x.jpg" width="100%" height="100%" />
                    </div>
                    <div className="img" style={mystyle}>
                        <img
                            style={{ borderRadius: "5px" }}
                            src="https://cdn.tgdd.vn/Files/2020/07/04/1267609/bach-hoa-xanh-online-sap-co-mat-tai-can-tho-dat-mua-online-giam-den-50-202007041131290004.png"
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div className="img" style={mystyle}>
                        <img
                            style={{ borderRadius: "5px" }}
                            src="https://cdn.tgdd.vn/Files/2019/10/15/1208999/chuong-trinh-khuyen-mai-20-10-danh-cho-chi-em-giam-den-50-201910152131516783.jpg"
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Annocument;
