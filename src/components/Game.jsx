import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Team = () => {

    const [team, setTeam] = useState([])
    const [money, setMoney] = useState(0)
    const [strength, setStrength] = useState(0)
    const [intelligence, setIntelligence] = useState(0)
    const [level, setLevel] = useState(0)

    const [isHidden, setIsHidden] = useState(true)
    const [winner, setWinner] = useState("")

    const [monster, setMonster] = useState({})

    async function fetchUser() {
        const token = localStorage.getItem('token')
        const resp = await fetch('/api/your-team', { headers: { Authorization: `Bearer ${token}` } })
        const data = await resp.json()
        const gameplay = data.gameplay
        setTeam(gameplay.team)
        setMoney(gameplay.money)
        setStrength(gameplay.totalStrength)
        setIntelligence(gameplay.totalIntelligence)
        setLevel(gameplay.level)

    }

    async function fetchMonster() {
        const token = localStorage.getItem('token')
        const resp = await fetch('/api/monster', { headers: { Authorization: `Bearer ${token}` } })
        const data = await resp.json()
        setMonster(data)
        setIsHidden(true)
    }

    useEffect(() => {
        fetchMonster()
        fetchUser()
    }, [])

    async function playHandle() {
        setIsHidden(false)
        if (strength > monster.strength && intelligence > monster.intelligence) {
            const winner = true
            setWinner(winner)

        } else {
            const winner = false
            setWinner(winner)
        }
        console.log(winner);

    }
    async function nextLevelHandle() {
        let newLevel = level
        if (level < 5) {
            newLevel = level++
            setLevel(newLevel)
        }
        const newmoney = money + 50
        setMoney(newmoney)

        const token = localStorage.getItem('token')
        await axios.put('api/your-team', { newMoney, newLevel }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        fetchMonster()
    }



    if (level < 1) {
        return <div className="section">
            <div className="container">
                <div className="title">
                    Loading ...
                </div>
            </div>
        </div>
    }



    return <>
        <h1 className="title">Your Team</h1>
        <h3>Money: {money}</h3>
        <h3>Team Strength: {strength}</h3>
        <h3>Team Intelligence: {intelligence}</h3>

        {isHidden && <button className="button is-primary" onClick={playHandle}>Play</button>}
        {isHidden ? ""
            : winner ? <div>
                <p className="has-background-success-light has-text-primary-dark">Congratulations, your team is the best. Try the next level</p>
                <button className="button is-primary " onClick={nextLevelHandle}>Next Level</button>
            </div>
                : <div>
                    <p className="has-background-danger-light has-text-danger">Buuuuu, your team is the wort. go back and rebuild your team</p>
                    <Link className="button is-primary" to="/your-team">Try again</Link>
                </div>}
        <div>
            <h2 className="title">Team Members</h2>
            <div className="columns is-multiline is-mobile">
                {team.map((character, index) => {
                    return <div className="column is-one-third-desktop is-half-tablet is-half-mobile"
                        key={character.name}>
                        <p>{character.name}</p>
                        {/* <figure className="image is-128x128">
                           <img src={character.images.regular} alt={character.name}/>
                       </figure> */}

                        <p>Cost: {character.cost}</p>
                        <p>Strength: {character.strength}</p>
                        <p>Intelligence: {character.intelligence}</p>
                    </div>
                })}
            </div>
        </div>
        <div>
            <h1 className="title">Monster Level {monster.level}</h1>
            {/* <figure className="image is-128x128">
                           <img src={monster.image} alt={monster.name}/>
                       </figure> */}
            <p className="subtitle">{monster.name}</p>
            <p>Strength: {isHidden ? "???" : monster.strength}</p>
            <p>Intelligence: {isHidden ? "???" : monster.intelligence}</p>
        </div>
    </>

}

export default Team