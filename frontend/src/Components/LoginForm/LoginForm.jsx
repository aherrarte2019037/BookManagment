import React from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { supabase } from "../../Utils/supabase.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    async function signInWithPass(event) {
        event.preventDefault();
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            });

            if (error) throw error;

            if (!data) throw new Error('Error signing in');

            supabase.auth.setSession({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
            })
            navigate('/dashboard');

        } catch (error) {
            console.error(`Error signing in with password: ${error}`);
            alert(`Error signing in with password: ${error}`);
        }
    }

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            };
        });
    }

    return (
        <div className="main-wrapper">
            <div className='wrapper'>
                <form onSubmit={signInWithPass}>
                    <h1>
                        Login
                    </h1>
                    <div className="input-box">
                        <input onChange={handleChange} type="email" name="email" placeholder="Email" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} type="password" name="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="/forgot-password">Forgot Password</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link" >

                        <p>Don't have an account? <a href="/register">Register here</a></p>

                    </div>
                </form>

            </div>
        </div>
    );

}

export default LoginForm;