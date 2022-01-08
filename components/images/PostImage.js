const PostImage = ({ url }) => {
    return (
        <div>
            <div
                style={{
                    backgroundImage: "url(" + url + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "contain",
                    // backdropFilter: 'contrast(0.5)',
                    height: "400px",
                }}
            ></div>
        </div>
    );
};

export default PostImage;
