import React, { useEffect, useState } from 'react';
import './ProfileConfig.css';
import { supabase } from '../../Utils/supabase';
import toast from "react-hot-toast";

const useProfile = () => {
    const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '' });
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

    const updateProfile = async (updates) => {
        const { error } = await supabase.auth.updateUser(updates);
        if (error) {
            toast.error('No se pudo actualizar la información del perfil');
        } else {
            toast.success('Perfil actualizado correctamente');
        }
    };

    return { profile, setProfile, initialEmail, updateProfile };
};

function ProfileConfig() {
    const { profile, setProfile, initialEmail, updateProfile } = useProfile();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updates = {
            data: {
                name: profile.firstName,
                lastname: profile.lastName,
            },
            ...(profile.email !== initialEmail && { email: profile.email }),
        };
        await updateProfile(updates);
    };

    const handleCancel = () => {
        console.log('Cambios cancelados');
    };

    const fields = {
        firstName: { label: 'Nombre', type: 'text' },
        lastName: { label: 'Apellido', type: 'text' },
        email: { label: 'Email', type: 'email' },
    };

    return (
        <div className="profile-config">
            <h1>Configuración del Perfil</h1>
            <form onSubmit={handleSubmit}>
                {Object.entries(fields).map(([key, { label, type }]) => (
                    <div className="form-group" key={key}>
                        <label>
                            {label}:
                            <input
                                type={type}
                                name={key}
                                value={profile[key]}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                ))}
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
