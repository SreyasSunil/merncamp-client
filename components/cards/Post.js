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
    UserOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";

const Post = ({
    post,
    handleDelete,
    handleLike,
    handleDislike,
    handleComment,
    removeComment,
    commentsCount = 2,
}) => {
    const [state] = useContext(UserContext);
    const router = useRouter();
    return (
        <>
            {post && post.postedBy && (
                <div key={post._id} className="card mb-5">
                    <div className="card-header">
                        <div>
                            {/* <Avatar className="mb-2" size={40}>
                                    {post.postedBy.name[0]}
                                </Avatar> */}
                            <Avatar
                                className="user-select-none"
                                src={
                                    (post.postedBy &&
                                        post.postedBy.image &&
                                        post.postedBy.image.url) ||
                                    null
                                }
                            >
                                {post.postedBy.image
                                    ? post.postedBy.image.url
                                    : post.postedBy.name[0]}
                                {/* <UserOutlined /> */}
                            </Avatar>{" "}
                            <span
                                className="pt-2 "
                                style={{ marginLeft: ".5rem" }}
                            >
                                {post.postedBy.name}
                            </span>
                            <span
                                className="pt-2 "
                                style={{ marginLeft: "1rem" }}
                            >
                                {moment(post.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>{renderHTML(post.content)} </div>
                    </div>
                    <div className="card-footer">
                        {post.image && <PostImage url={post.image.url} />}
                        <div className="d-flex pt-2">
                            {state &&
                            state.user &&
                            post.likes &&
                            post.likes.includes(state.user._id) ? (
                                <HeartFilled
                                    onClick={() => {
                                        handleDislike(post._id);
                                    }}
                                    className="text-danger pt-2 h5"
                                />
                            ) : (
                                <HeartOutlined
                                    onClick={() => {
                                        handleLike(post._id);
                                    }}
                                    className="text-danger pt-2 h5"
                                />
                            )}

                            <div
                                className="pt-2 ps-2"
                                style={{ marginRight: "1.5rem" }}
                            >
                                {post.likes.length} likes
                            </div>

                            <CommentOutlined
                                onClick={() => handleComment(post)}
                                className="text-danger pt-2 h5"
                            />
                            <div className="pt-2 ps-2">
                                <Link href={`/post/${post._id}`}>
                                    <a className="text-dark">
                                        {post.comments.length} comments{" "}
                                    </a>
                                </Link>
                            </div>

                            {state &&
                                state.user &&
                                state.user._id === post.postedBy._id && (
                                    <>
                                        <EditOutlined
                                            onClick={() =>
                                                router.push(
                                                    `/user/post/${post._id}`
                                                )
                                            }
                                            className="text-danger pt-2 h5 ms-auto"
                                        />
                                        <DeleteOutlined
                                            onClick={() => handleDelete(post)}
                                            className="text-danger pt-2 h5 ms-4"
                                        />
                                    </>
                                )}
                        </div>
                    </div>
                    {/* commentList */}
                    {post.comments && post.comments.length > 0 && (
                        <ul className="list-group ">
                            {post.comments.slice(0, commentsCount).map((c) => (
                                <li
                                    key={c._id}
                                    className="list-group-item d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="d-flex align-items-center ">
                                            <Avatar
                                                className="user-select-none"
                                                size={20}
                                                src={
                                                    (c.postedBy.image &&
                                                        c.postedBy.image.url) ||
                                                    null
                                                }
                                            >
                                                {c.image
                                                    ? c.postedBy.image.url
                                                    : c.postedBy.name[0]}
                                                {/* <UserOutlined /> */}
                                            </Avatar>
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    paddingLeft: "5px",
                                                }}
                                            >
                                                {`${c.postedBy.name}`}
                                            </div>
                                        </div>
                                        <div className="text-muted">
                                            {c.text}
                                        </div>
                                    </div>
                                    <span className="badge text-muted rounded-pill">
                                        {moment(c.created).fromNow()}
                                        {state &&
                                            state.user &&
                                            state.user._id ===
                                                c.postedBy._id && (
                                                <div className="ms-auto mt-1">
                                                    <DeleteOutlined
                                                        onClick={() =>
                                                            removeComment(
                                                                post._id,
                                                                c
                                                            )
                                                        }
                                                        className="ps-3 text-danger"
                                                    />
                                                </div>
                                            )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
};

export default Post;
