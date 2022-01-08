import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import Link from "next/link";
import router, { useRouter } from "next/router";

const Nav = () => {
    const [current, setCurrent] = useState("");
    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    // console.log("current ==>", current);

    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    };

    return (
        <nav
            className="nav d-flex justify-content-between"
            style={{ backgroundColor: "blue" }}
        >
            <Link href="/">
                <a
                    className={`nav-link text-light logo ${
                        current === "/" && "active"
                    }`}
                >
                    MERNCAMP
                </a>
            </Link>

            {state !== null ? (
                <>
                    {/* dropdown */}
                    <div className="dropdown">
                        <a
                            className="btn text-light dropdown-toggle"
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {state && state.user && state.user.name}
                        </a>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                        >
                            <li>
                                <Link href="/user/dashboard">
                                    <a
                                        className={`nav-link dropdown-item  ${
                                            current === "/user/dashboard" &&
                                            "active"
                                        }`}
                                    >
                                        Dashboard
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/profile/update">
                                    <a
                                        className={`nav-link dropdown-item  ${
                                            current ===
                                                "/user/profile/update" &&
                                            "active"
                                        }`}
                                    >
                                        Profile
                                    </a>
                                </Link>
                            </li>
                            {/* admin route */}
                            {state.user.role === "Admin" && (
                                <li>
                                    <Link href="/admin">
                                        <a
                                            className={`nav-link dropdown-item  ${
                                                current === "/admin" && "active"
                                            }`}
                                        >
                                            Admin
                                        </a>
                                    </Link>
                                </li>
                            )}

                            <li>
                                <a onClick={logout} className="nav-link">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <Link href="/login">
                        <a
                            className={`nav-link text-light ${
                                current === "/login" && "active"
                            }`}
                        >
                            LOGIN
                        </a>
                    </Link>

                    <Link href="/register">
                        <a
                            className={`nav-link text-light ${
                                current === "/register" && "active"
                            }`}
                        >
                            REGISTER
                        </a>
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Nav;
