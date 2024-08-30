import { useSelector } from "react-redux";

const Profile = () => {
    const {user, name, email} = useSelector(state => state.auth);
    console.log(user);
    return (
        <>
            <div>

                <h1>{user.name}</h1>
                <p>{}</p>

            </div>
        </>
    )
};

export default Profile;