import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {baseUrl} from '../config'

export default function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/login`, formData);
            const token = data.token;
            localStorage.setItem('token', token);
        
            navigate('/your-team')
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    return <div className="section">
        <p>{error}</p>
        <div className="container">
            <h1 className="title">Login</h1>
            <form onSubmit={handleSubmit} className="box">

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'email'}
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="e.g. name@email.com"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name={'password'}
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="********"
                        />
                    </div>
                </div>
                
                <button className="button is-primary">Submit</button>
    
            </form>
        </div>
    </div>
}