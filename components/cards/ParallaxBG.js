const ParallaxBG = ({ url, children = "MERNCAMP" }) => {
    return (
        <div
            className="container-fluid "
            style={{
                backgroundImage: "url(" + url + ")",
                backgroundAttachment: "fixed",
                padding: "100px 0px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                display: "block",
            }}
        >
            <h1 className="display-1 text-center ">{children}</h1>
            {/* <pre className="width-20">{JSON.stringify(state,null,4)}</pre> */}
        </div>
    );
};

export default ParallaxBG;
