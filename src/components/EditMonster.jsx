import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {baseUrl} from '../config'

export default function EditMonster() {

    const navigate = useNavigate()

    const { monsterName } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        strength: '',
        intelligence: '',
        level: '',
    })
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchMonster() {
            try {
                const token = localStorage.getItem('token')
                const resp = await axios.get(`${baseUrl}/monsters/${monsterName}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = resp.data
                setFormData({
                    name: `${data.name}`,
                    description: `${data.description}`,
                    image: `${data.image}`,
                    strength: `${data.strength}`,
                    intelligence: `${data.intelligence}`,
                    level: `${data.level}`,
                })
            } catch (err) {
                const error = err.response.data.message
                setError(error)
            }
        }
        fetchMonster()
    }, [monsterName])

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            await axios.put(`${baseUrl}/monsters/${monsterName}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate(`/monsters/${formData.name}`)
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }

    return <div className="section">
        <p>{error}</p>
        <div className="container">

            <h1 className="title">Edit Monster</h1>
            <form onSubmit={handleSubmit} className="box">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'name'}
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'description'}
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'image'}
                            onChange={handleChange}
                            value={formData.image}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Strength</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'strength'}
                            onChange={handleChange}
                            value={formData.strength}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Intelligence</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'intelligence'}
                            onChange={handleChange}
                            value={formData.intelligence}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Level</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'level'}
                            onChange={handleChange}
                            value={formData.level}
                        />
                    </div>
                </div>

                <button className="button is-primary">Submit</button>
            </form>
            <Link to={`/monsters/${monsterName}`} className='button is-warning' >Back to {formData.name}</Link>
        </div>
    </div>
}