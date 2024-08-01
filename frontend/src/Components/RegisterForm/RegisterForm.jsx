import React, { useState } from "react";
import "./RegisterForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { supabase } from "../../Utils/supabase.js";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        accessCode: '',
        password: ''
    });

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const accessCodeResponse = await supabase
                .from('Access Codes')
                .select('*')
                .eq('code', formData.accessCode)
                .limit(1)
                .single();

            if (!accessCodeResponse || accessCodeResponse.error) {
                throw new Error('Access code not found');
            }

            if (accessCodeResponse.data.used) {
                throw new Error('Access code already used');
            }

            const signUpResponse = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: formData.username,
                        name: formData.name,
                        lastname: formData.lastname,
                        accessCode: formData.accessCode
                    }
                }
            });

            if (signUpResponse.error) {
                throw new Error(signUpResponse.error.message);
            }

            await supabase
                .from('Access Codes')
                .update({ used: true })
                .eq('code', formData.accessCode);

            navigate('/login');

        } catch (error) {
            console.log('Error: ', error.message);
            alert(error);
        }
    }

    return (
        <div className="main-wrapper">
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>
                        Register
                    </h1>
                    <div className="input-box">
                        <input onChange={handleChange} name="username" type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="name" type="text" placeholder="Name" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="lastname" type="text" placeholder="Last Name" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="email" type="email" placeholder="E-mail" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="accessCode" type="password" placeholder="Access code" />
                        <FaLock className="icon" />
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} name="password" type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit">Register</button>
                    <div className="log-link" >
                        <p>You have an account?  <a href="/login">Log in</a></p>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default RegisterForm;