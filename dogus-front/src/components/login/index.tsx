import React, { useState } from 'react';
import './style.css';
import loginUserUsingPost from '../../services/api/userLoginControllerService';
import { UserLoginDto } from '../../services/api/model/userLoginDto';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { setAuthUser } from '../../utils/authService/Index';
import { CreateUserDto } from '../../services/api/model/createUserDto';



const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate()

  const handleLogin = (e: any) => {
    const body: UserLoginDto = {
      email: email,
      password: password
    }
    e.preventDefault();
    loginUserUsingPost(body).then(data => {
      if (data.error) {
        Swal.fire({
          title: "Error!",
          text: data.error.response.data,
          icon: "error"
        })

      } else {
        const userId = (data.data as CreateUserDto).id
        setAuthUser(userId as string);
        navigate("/home")
      }
    })
  };

  return (
    <div className="login-container">
      <form className="login-form" >
        <h2>Giriş Yap</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleLogin} className="login-button">Giriş Yap</button>
        <p className="redirect-text">Hesabın yok mu? <a href="/register">Kaydol</a></p>
      </form>
    </div>
  );
};

export default LoginScreen;
