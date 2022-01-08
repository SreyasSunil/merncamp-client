import React, { useContext } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import {
    HeartOutlined,
    HeartFilled,
    CommentOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import Post from "./Post";

const PostList = ({
    posts,
    handleDelete,
    handleLike,
    handleDislike,
    handleComment,
    removeComment,
}) => {
    const [state] = useContext(UserContext);
    const router = useRouter();
    return (
        <>
            {posts &&
                posts.map((post) => (
                    <Post
                        key={post._id}
                        post={post}
                        handleDelete={handleDelete}
                        handleLike={handleLike}
                        handleDislike={handleDislike}
                        handleComment={handleComment}
                        removeComment={removeComment}
                    />
                ))}
        </>
    );
};

export default PostList;
