import React, { useState } from 'react';
import './ProfileConfig.css';  // Asegúrate de que el path al archivo CSS es correcto.

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
    const [showPasswordFields, setShowPasswordFields] = useState(false);

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
        console.log('Perfil actualizado:', profile);
    };

    const handleCancel = () => {
        console.log('Cambios cancelados');
    };

    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
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
                <div className="form-group">
                    <label>Teléfono:
                        <input type="tel" name="phone" value={profile.phone} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Cambiar Avatar:
                        <input type="file" onChange={handleAvatarChange} />
                    </label>
                </div>
                
                <div className="button-container">
                    <button type="button" onClick={togglePasswordFields} className="button change-password-button">
                        Cambiar Contraseña
                    </button>
                </div>

                {showPasswordFields && (
                    <div>
                        <div className="form-group">
                            <label>Contraseña Actual:
                                <input type="password" name="password" value={profile.password} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Nueva Contraseña:
                                <input type="password" name="newPassword" value={profile.newPassword} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Confirmar Nueva Contraseña:
                                <input type="password" name="confirmNewPassword" value={profile.confirmNewPassword} onChange={handleChange} />
                            </label>
                        </div>
                    </div>
                )}

                <div className="button-container">
                    <button type="submit" className="button save-changes-button">Guardar Cambios</button>
                    <button type="button" onClick={handleCancel} className="button cancel-changes-button">Cancelar Cambios</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileConfig;