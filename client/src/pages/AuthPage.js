import React, { useState, useEffect, useContext } from "react"
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3 brd">
                <h1 className="white-text"> Сокращение ссылки</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field s1">
                                <input
                                    value={form.email}
                                    className="yellow-input"
                                    name="email"
                                    placeholder="Введите email"
                                    id="email"
                                    onChange={ changeHandler }
                                    type="text"/>
                                <label className="white-text" htmlFor="email">Email</label>
                            </div>
                            <div className="input-field s1">
                                <input
                                    value={form.password}
                                    className="yellow-input"
                                    name="password"
                                    placeholder="Введите пароль"
                                    id="password"
                                    onChange={ changeHandler }
                                    type="password"/>
                                <label className="white-text" htmlFor="email">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn green waves-effect waves-light btn-mg"
                            onClick={ loginHandler }
                            disabled={ loading }> Login
                        </button>
                        <button
                            className="btn red waves-effect waves-light"
                            onClick={ registerHandler }
                            disabled={ loading }> Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

