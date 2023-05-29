import React, { useState } from "react";
import axios from "axios";
import NavbarTeam from "../../components/shared/Navbar/NavbarTeam";
import Footer from "../../components/shared/Footer/Footer";
import './Details.css'
const Recuitmentdetails = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.trim() === "") {
            setError("Please enter the password.");
            return;
        }

        if (password === process.env.REACT_APP_DETAILS_PWD) {
            try {
                setLoading(true);
                const response = await axios.get(process.env.REACT_APP_AXIOSGET);
                setListOfUsers(response.data);
                setLoggedIn(true);
            } catch (error) {
                console.log("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setPassword("");
            setError("Wrong password. Access denied.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return (
            <div>
                <NavbarTeam />
                <div className="topdetailsre">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                            className='input-common-recruit halfinptdtls'
                        />
                        <button type="submit" className='submtformrecuit'>Submit</button>
                    </form>
                    {error && <div>{error}</div>}
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <>
            {/* <NavbarTeam /> */}
            {listOfUsers.map((user) => (
                <div >
                    <div key={user.id} >
                    <h1>name: <span style={{color:"red"}}>{user.name}</span></h1>
                    <h1>email: <span style={{color:"red"}}>{user.email}</span> </h1>
                    <h1>Scholar Id: <span style={{color:"red"}}>{user.scholarId}</span> </h1>
                    <h1>branch: <span style={{color:"red"}}>{user.branch}</span> </h1>
                    <h1>WP number: <span style={{color:"red"}}>{user.mobileno}</span></h1>
                    <h1>domain in technical team of ecell: <span style={{color:"red"}}>{user.techteam}</span></h1>
                    <a href={user.resume} target="_blank" rel="noreferrer">
                        <p className="rsmlink"> Resume link</p>
                    </a>
                    <h1>why ecell: <span style={{color:"red"}} >{user.whyecell}</span> </h1>
                    <hr />
                </div>
                </div>
                
            ))}
            <Footer />
        </>
    );
};

export default Recuitmentdetails;
