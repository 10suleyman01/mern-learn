import React, { useState, useEffect, useContext } from "react"
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${ auth.token }`
                })
                history.push(`/detail/${ data.link._id }`)
            } catch (e) {
            }
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    })

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={ { paddingTop: '2rem' } }>
                <div className="input-field s1">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        value={ link }
                        onChange={ event => setLink(event.target.value) }
                        onKeyPress={ pressHandler }
                        type="text"/>
                    <label className="white-text" htmlFor="link">Link</label>
                </div>
            </div>
        </div>
    )
}