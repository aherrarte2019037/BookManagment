import React, { useState } from 'react';

function ProfileConfig() {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [avatar, setAvatar] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envía los datos al backend aquí
        console.log('Perfil actualizado:', profile);
    };

    const handleCancel = () => {
        // Lógica para manejar la cancelación de cambios
        console.log('Cambios cancelados');
    };

    const handleDeactivateAccount = () => {
        // Lógica para desactivar la cuenta
        console.log('Cuenta desactivada');
    };

    return (
        <div>
            <h1>Configuración del Perfil</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
                </label>
                <label>
                    Apellido:
                    <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={profile.email} onChange={handleChange} />
                </label>
                <label>
                    Teléfono:
                    <input type="tel" name="phone" value={profile.phone} onChange={handleChange} />
                </label>
                <label>
                    Contraseña Actual:
                    <input type="password" name="password" value={profile.password} onChange={handleChange} />
                </label>
                <label>
                    Nueva Contraseña:
                    <input type="password" name="newPassword" value={profile.newPassword} onChange={handleChange} />
                </label>
                <label>
                    Confirmar Nueva Contraseña:
                    <input type="password" name="confirmNewPassword" value={profile.confirmNewPassword} onChange={handleChange} />
                </label>
                <label>
                    Cambiar Avatar:
                    <input type="file" onChange={handleAvatarChange} />
                </label>
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={handleCancel}>Cancelar Cambios</button>
                <button type="button" onClick={handleDeactivateAccount}>Desactivar Cuenta</button>
            </form>
        </div>
    );
}

export default ProfileConfig;
