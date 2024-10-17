import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const [isRegisterView, setIsRegisterView] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const toggleToRegister = () => {
        setIsRegisterView(true);
    };

    const toggleToLogin = () => {
        setIsRegisterView(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!validateEmail(email)) {
            setErrorMessage('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres, con letras, números y un símbolo.');
            return;
        }

        try {
            await login({ email, password });
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!validateName(name) || !validateName(lastName)) {
            setErrorMessage('El nombre y apellido solo pueden contener letras.');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres, con letras, números y un símbolo.');
            return;
        }

        try {
            await register({ nombre: name, apellido: lastName, correo: email, password });
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMessage('Error al registrarse. Intenta nuevamente.');
        }
    };

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (value) => /^[a-zA-Z\s]+$/.test(value);

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
    };

    return (
        <main className="main">
            <div className={`contenedor__todo ${isRegisterView ? 'register-view' : ''}`}>
                <div className="caja__trasera">
                    <div className="caja__trasera_login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <button id="btn__iniciar_sesion" onClick={toggleToLogin}>Iniciar sesión</button>
                    </div>
                    <div className="caja__trasera_register">
                        <h3>¿Aún no tienes una cuenta?</h3>
                        <p>Regístrate para que puedas iniciar sesión</p>
                        <button id="btn__registrarse" onClick={toggleToRegister}>Registrarse</button>
                    </div>
                </div>

                <div className="contenedor__login-register">
                    <form className={`formulario__login ${isRegisterView ? 'hidden' : ''}`} onSubmit={handleLogin}>
                        <h2>Iniciar sesión</h2>
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={30} // Limitar a 50 caracteres
                            required
                        />
                        <div className="password-container">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={20} // Limitar a 20 caracteres
                                required
                            />
                            <span className="password-icon" onClick={handlePasswordVisibility}>
                                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit">Entrar</button>
                    </form>

                    <form className={`formulario__register ${!isRegisterView ? 'hidden' : ''}`} onSubmit={handleRegister}>
                        <h2>Registrarse</h2>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} // Quita números
                            maxLength={20} // Limitar a 30 caracteres
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} // Quita números
                            maxLength={20} // Limitar a 30 caracteres
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={30} // Limitar a 50 caracteres
                            required
                        />
                        <div className="password-container">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={20} // Limitar a 20 caracteres
                                required
                            />
                            <span className="password-icon" onClick={handlePasswordVisibility}>
                                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
