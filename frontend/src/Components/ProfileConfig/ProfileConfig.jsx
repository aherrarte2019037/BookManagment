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
            try{
                const {data} = await supabase.auth.getUser();
                if (data?.user){
                    const {name, lastname} = data.user.user_metadata;

                    setProfile({firstName: name, lastName: lastname, email: data.user.email});
                    setInitialEmail(data.user.email);
                }
            } catch{
                toast.error("No se pudo obtener la información del perfil");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = ({target: {name, value}}) =>{
        setProfile(prev => ({...prev, [name]: value}));
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

        try{
            const {error} = await supabase.auth.updateUser(updates);
            if (error)throw new Error();
            toast.success('Perfil actualizado correctamente');
        }catch{
            toast.error('No se pudo actualizar la información del perfil')
        }
    };

    return (
        <div className="profile-config">
            <h1>Configuración del Perfil</h1>
            <form onSubmit={handleSubmit}>
                {['firstName', 'lastName', 'email'].map(field => (
                    <div className='form-group' key={field}>
                        <label>
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                            <input 
                            type={field === 'email' ? 'email':'text'}
                            name={field}
                            value={profile[field]}
                            onChange={handleChange}
                            />
                        </label>
                    </div>
                ))}
                <div className="button-container">
                    <button type="submit" className="cta">
                        <span>Guardar</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5" />
                            <polyline points="8 1 12 5 8 9" />
                        </svg>
                    </button>
                    <button type="button" onClick={() => console.log('Cambios cancelados')} className="button cancel-changes-button">Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileConfig;
