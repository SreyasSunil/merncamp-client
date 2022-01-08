import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import { toast } from "react-toastify";
import Post from "../../components/cards/Post";
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";

const PostComment = ({ commentsCount }) => {
    const [post, setPost] = useState({});
    const router = useRouter();
    const _id = router.query._id;

    useEffect(() => {
        if (_id) fetchPost();
    }, [_id]);

    const fetchPost = async () => {
        try {
            const { data } = await axios.get(`/user-post/${_id}`);
            setPost(data);
        } catch (err) {
            console.log(err);
        }
    };

    const removeComment = async (postId, comment) => {
        // console.log(postId, comment);
        let answer = window.confirm("Are you sure ?");
        if (!answer) return;
        try {
            const { data } = await axios.put("/remove-comment", {
                postId,
                comment,
            });
            console.log("comment removed", data);
            fetchPost();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container-fluid">
            {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
            <div className="row py-3 bg-default-image ">
                <div className="col text-center">
                    <h1
                        className="display-3 text-center py-5 "
                        style={{ fontWeight: "500" }}
                    >
                        MERNCAMP
                    </h1>
                </div>
            </div>
            <Link href={`/user/dashboard`}>
                <a className="h2 text-dark d-flex justify-content-center pt-2">
                    {" "}
                    <RollbackOutlined />
                </a>
            </Link>
            <div className="container col-md-8 offset-md-2 pt-5">
                <Post
                    post={post}
                    commentsCount={100}
                    removeComment={removeComment}
                />
            </div>
        </div>
    );
};

export default PostComment;
