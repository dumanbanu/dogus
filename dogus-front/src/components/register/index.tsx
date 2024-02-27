import React, { useState } from 'react';
import './style.css'; 
import { CreateUserDto } from '../../services/api/model/createUserDto';
import StandardButton from '../standart-buton/Index';
import createUserUsingPost from '../../services/api/userControllerService';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const RegisterScreen = () => {


  const [registerFormData , setRegisterFormData] = useState<CreateUserDto | null >(null)
  const navigate = useNavigate()


  const handleInputChange = (fieldName:string , value:string | number) =>  {
    setRegisterFormData((prevData) => ({
      ...prevData,
    [fieldName] : value
    }) )
  }

  const onSubmitForm = () => {
    const body = registerFormData 
    createUserUsingPost(body).then((data) => {
      if(data.error){
        Swal.fire({
          title: "Warning!",
          text: data.error.response.data,
          icon: "warning"
        })
        return;
      }
      navigate("/login");
      
    })
  }

  return (
    <div className="register-container">
      <form className="register-form" >
        <h2>Kaydol</h2>
        <div className="input-group">
          <label htmlFor="name">Ad</label>
          <input
            type="text"
            id="name"
            value={registerFormData?.name}
            onChange={(event) => {handleInputChange("name" , event.target.value)}}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor= "email">Email</label>
          <input
            type="email"
            id="email"
            value={registerFormData?.email}
            onChange={(e) => {handleInputChange("email" , e.target.value)}}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={registerFormData?.password}
            onChange={(e) => {handleInputChange("password" , e.target.value)}}
            required
          />
        </div>
        <StandardButton
        size='large'
        content={"Create"}
        bg='green'
        color='white'
        onClickEventHandler={onSubmitForm}
        />
      </form>
    </div>
  );
};

export default RegisterScreen;
