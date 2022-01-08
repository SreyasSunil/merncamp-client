import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    secret,
    setSecret,
    loading,
    page,
    username,
    setUsername,
    about,
    setAbout,
    profileUpdate,
}) => (
    <form onSubmit={handleSubmit}>
        {profileUpdate && (
            <div className="form-group p-3">
                <small>
                    <label className="text-muted ">Username</label>
                </small>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Type your username"
                />
            </div>
        )}
        {profileUpdate && (
            <div className="form-group p-3">
                <small>
                    <label className="text-muted ">About</label>
                </small>
                <input
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Type something about you"
                />
            </div>
        )}

        {page !== "login" && (
            <div className="form-group p-3">
                <small>
                    <label className="text-muted ">Your name</label>
                </small>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Type your name"
                />
            </div>
        )}

        <div className="form-group p-3 ">
            <small>
                <label className="text-muted ">Email Address</label>
            </small>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Type your email"
                disabled={profileUpdate}
            />
        </div>

        <div className="form-group p-3">
            <small>
                <label className="text-muted ">Your password</label>
            </small>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Type your password"
            />
        </div>

        {page !== "login" && (
            <div className="form-group p-3">
                <small>
                    <label className="text-muted">Pick a question</label>
                </small>
                <select className="form-control">
                    <option value="">What is your favorite color?</option>
                    <option value="">What is your best friend's name?</option>
                    <option value="">What city you were born? </option>
                </select>
                <small className="text-muted form-text">
                    You can use this to reset your forgotten password
                </small>
            </div>
        )}

        {page !== "login" && (
            <div className="form-group p-3">
                <input
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Write your answer here"
                />
            </div>
        )}

        <div className="d-grid p-2">
            <button
                disabled={
                    profileUpdate
                        ? loading
                        : page === "login"
                        ? !email || !password || loading
                        : !name || !password || !email || !secret || loading
                }
                className="btn btn-primary btn-block"
            >
                {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
            </button>
        </div>
    </form>
);

export default AuthForm;
