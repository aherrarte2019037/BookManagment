import React from "react";  
import "./RegisterForm.css";
import { FaUser, FaLock } from "react-icons/fa";


const RegisterForm = () => {
    return (
        <div  className='wrapper'>
            <form action="" >
                <h1>
                    Register
                </h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Name" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Last Name" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="email" placeholder="E-mail" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Access code" required />
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>

                <button type="submit">Log in</button>
                <div className="log-link" >
                    <p>You have an account?  <a href="/login">Register</a></p>
                </div>
    
            </form>

        </div>
    );
}

export default RegisterForm;