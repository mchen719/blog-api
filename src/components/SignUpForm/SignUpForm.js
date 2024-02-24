import { useState } from 'react'
import styles from './SignUpForm.module.scss'

export default function SignUpForm(props) {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return(
        <>
        <h2 className={styles.heading}>Sign Up For My Blog Below</h2>
            <form className={styles.form} onSubmit= {(e) => {
                e.preventDefault()
                props.signUp(credentials)
            }}>
                <input type='text' name='name' onChange={handleChange} value={credentials.name}/>
                <input type='text' name='email' onChange={handleChange} value={credentials.email}/>
                <input type='text' name='password' onChange={handleChange} value={credentials.password}/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}