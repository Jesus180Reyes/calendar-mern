import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks/';
import './LoginPage.css';

const loginFormFields = {
  loginEmail: '',
  loginPassowrd: '',
}
const registerFormFields = {
  registerEmail: '',
  registerName: '',
  registerPassowrd: '',
  registerPassowrd2: '',
}

export const LoginPage = () => {

  const { startLogin, startRegister, errorMsg } = useAuthStore();
  const { loginEmail, loginPassowrd, onInputChange: onLoginInputChange, formState } = useForm(loginFormFields);
  const { registerEmail, registerName, registerPassowrd, registerPassowrd2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);
  const loginSubmit = (e) => {
    e.preventDefault();

    startLogin({ email: loginEmail, password: loginPassowrd });

  }
  const registerSubmit = (e) => {
    e.preventDefault();
    if (registerPassowrd !== registerPassowrd2) {
      Swal.fire('Error en Registro', 'Contrasenas no coinciden', 'error');
      return;
    }

    startRegister({ email: registerEmail.trim(), nombre: registerName.trim(), password: registerPassowrd });

  }

  useEffect(() => {
    if (errorMsg !== undefined) {
      Swal.fire('Error en la autenticacion', errorMsg, 'error');

    }


  }, [errorMsg]);





  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassowrd'
                value={loginPassowrd}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='registerPassowrd'
                value={registerPassowrd}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name='registerPassowrd2'
                value={registerPassowrd2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                onClick={registerSubmit}
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}