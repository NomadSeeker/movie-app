import { useSelector } from "react-redux";

const Profile = () => {
    const {user, name, email} = useSelector(state => state.auth);
    console.log(user);
    return (
        <>
               
            <div className=" h-screen text-left text-white mt-10 [&>p]:my-4 mx-4">
                <h1 className="">Account information: </h1>
                <p>Name: {user.name}</p>
                <p>email: {user.email}</p>
            

            </div>
        </>
    )
};

export default Profile;