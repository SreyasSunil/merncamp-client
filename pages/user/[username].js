import { useContext, useState, useEffect } from "react";
import { Avatar, Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

const { Meta } = Card;

const Username = () => {
    const [state, setState] = useContext(UserContext);
    // state
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (router.query.username) fetchUser();
    }, [router.query.username]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/user/${router.query.username}`);
            // console.log("username ==>", data);
            setUser(data);
        } catch (err) {
            console.log(err);
        }
    };
    const imageSource = (user) => {
        if (user.image) {
            return user.image.url;
        } else {
            return "/images/default.jpg";
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
            <div className="d-flex align-items-center justify-content-between h4">
                <Link href="/user/dashboard" className=" sticky-top">
                    <a>
                        <RollbackOutlined style={{ color: "black" }} />
                    </a>
                </Link>
            </div>
            {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
            <div className="py-5">
                <Card
                    hoverable
                    cover={
                        <img
                            style={{ height: "20vw", objectFit: "cover" }}
                            src={imageSource(user)}
                            alt={user.name}
                        />
                    }
                >
                    <Meta title={user.name} description={user.about} />

                    <p className="pt-2 text-muted">
                        Joined {moment(user.createdAt).fromNow()}
                    </p>

                    <div className="d-flex justify-content-between">
                        <span className="btn btn-sm">
                            {user.followers && user.followers.length} Followers
                        </span>

                        <span className="btn btn-sm">
                            {user.following && user.following.length} Following
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Username;
