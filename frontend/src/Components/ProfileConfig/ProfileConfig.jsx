import React, { useEffect, useState } from 'react';
import './ProfileConfig.css';
import { supabase } from '../../Utils/supabase';
import toast from "react-hot-toast";

function ProfileConfig() {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [initialEmail, setInitialEmail] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                toast.error('No se pudo obtener la información del perfil');
                return;
            }
            if (data?.user) {
                setProfile({
                    firstName: data.user.user_metadata.name,
                    lastName: data.user.user_metadata.lastname,
                    email: data.user.email,
                });
                setInitialEmail(data.user.email);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updates = {
            data: {
                name: profile.firstName,
                lastname: profile.lastName
            }
        };

        // Include email only if it has changed
        if (profile.email !== initialEmail) {
            updates.email = profile.email;
        }

        const { error } = await supabase.auth.updateUser(updates);
        if (error) {
            toast.error('No se pudo actualizar la información del perfil');
        } else {
            toast.success('Perfil actualizado correctamente');
        }
    };

    const handleCancel = () => {
        console.log('Cambios cancelados');
    };

    return (
        <div className="profile-config">
            <h1>Configuración del Perfil</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:
                        <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Apellido:
                        <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Email:
                        <input type="email" name="email" value={profile.email} onChange={handleChange} />
                    </label>
                </div>

                <div className="button-container">
                    <button type="submit" className="cta">
                        <span>Guardar</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </button>
                    <button type="button" onClick={handleCancel} className="button cancel-changes-button">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileConfig;
