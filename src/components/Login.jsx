import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/login', formData);
            const token = data.token;

            localStorage.setItem('token', token);

            navigate('/cheeses')

        } catch (err) {
            console.log(err);
        }
    }


    return <div className="section">
        <div className="container">
            <h1 className="title">Login</h1>
            <form onSubmit={handleSubmit}>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'email'}
                            onChange={handleChange}
                            value={formData.email}
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
                        />
                    </div>
                </div>
                <button className="button">Submit</button>
    
            </form>
        </div>
    </div>
}