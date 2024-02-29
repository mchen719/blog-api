import { useState } from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import styles from './AuthPage.module.scss'

export default function AuthPage (props) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
            <button onClick={() => setShowLogin(!showLogin)}>{!showLogin? 'Already Have an Account. Click Here to Sign In': 'New Here? Click Here to Sign Up'}</button>
            { !showLogin ? <SignUpForm signUp={props.signUp}/> : <LoginForm login={props.login}/>}
        </>
    )

}