import { useContext, useState, useEffect } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

const Following = () => {
    const [state, setState] = useContext(UserContext);
    // state
    const [people, setPeople] = useState([]);

    useEffect(() => {
        if (state && state.token) fetchFollowing();
    }, [state && state.token]);

    const router = useRouter();

    const fetchFollowing = async () => {
        try {
            const { data } = await axios.get("/user-following");
            // console.log("folowing ==>", data);
            setPeople(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnfollow = async (user) => {
        // console.log(`${user.name} was unfollowed`);
        try {
            const { data } = await axios.put("/user-unfollow", {
                _id: user._id,
            });
            //updateing localstorage , user and keep token
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            // update context
            setState({ ...state, user: data });
            //update people state
            let filtered = people.filter((p) => p._id !== user._id);
            setPeople(filtered);
            toast.error(`Unfollowed ${user.name}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="row col-md-6 offset-md-3">
            {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
            <div className="d-flex align-items-center justify-content-between h4 ">
                <div className="h1 text-dark">Following</div>
                <Link href="/user/dashboard">
                    <a>
                        <RollbackOutlined style={{ color: "black" }} />
                    </a>
                </Link>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={people}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    className="user-select-none"
                                    src={(user.image && user.image.url) || null}
                                >
                                    {user.image ? user.image.url : user.name[0]}
                                </Avatar>
                            }
                            title={
                                <div className="d-flex justify-content-between">
                                    {user.name}
                                    <span
                                        role={"button"}
                                        onClick={() => handleUnfollow(user)}
                                        className="text-primary "
                                    >
                                        Unfollow
                                    </span>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Following;
