import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import Link from "next/link";

const People = ({ people, handleFollow, handleUnfollow }) => {
    const [state] = useContext(UserContext);

    const router = useRouter();

    const imageSource = (user) => {
        if (user.image) {
            return user.image.url;
        } else {
            return "/images/default.jpg";
        }
    };
    return (
        <div>
            {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
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
                                    <Link href={`/user/${user.username}`}>
                                        <a>{user.name}</a>
                                    </Link>

                                    {state &&
                                    state.user &&
                                    user.followers &&
                                    user.followers.includes(state.user._id) ? (
                                        <span
                                            role={"button"}
                                            onClick={() => handleUnfollow(user)}
                                            className="text-primary "
                                        >
                                            Unfollow
                                        </span>
                                    ) : (
                                        <span
                                            role={"button"}
                                            onClick={() => handleFollow(user)}
                                            className="text-primary "
                                        >
                                            Follow
                                        </span>
                                    )}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default People;
