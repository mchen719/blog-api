import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App(){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
   
    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            console.error(error)
        }        
    }

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
    
            const tokenData = data.token 
            localStorage.setItem('token', tokenData)
            setToken(tokenData)
                                                        /// User authentication MUST send the token. You can choose afterwards what other data you want to send back i.e. User. We want user here because the user data has the blog posts 
            const userData = data.user
            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)
        } catch (error) {
            console.error(error)
        }
        
    }

    const createBlog = async (blogData, token) => {
        if(!token) {
            return
        }
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            })
            const data = await response.json()
            return(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getAllBlogs = async() => {
        try {
            const response = await fetch('/api/blogs') 
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const getIndividualBlog = async (id) => {
        try {
            const response = await fetch(`/api/blogs/${id}`)
            const data = await response.json()
            return data 
        } catch (error) {
            console.error(error)
        }
    }

    const updateBlog = async (newBlogData, id, token) => {
        if(!token) {
            return
        }

        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newBlogData)
            })
            const data = await response.json()
            return data 
        } catch (error) {
            console.error(error)
        }
    }

    const deleteBlog = async (id, token) => {
        if(!token) {
            return
        }

        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await response.json()
            return data 
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.App}>
            <Routes>
                <Route path="/" element={<HomePage user={user} token={token} setUser ={setUser} setToken={setToken} getAllBlogs={getAllBlogs} createBlog={createBlog}/>}></Route>
                <Route path="/register" element={<AuthPage setUser={setUser} setToken={setToken} signUp={signUp} login={login}/> }></Route>
                <Route path="/blog/:id" element={<ShowPage user={user} token={token} setUser={setUser} setToken={setToken} getIndividualBlog={getIndividualBlog} deleteBlog={deleteBlog} updateBlog={updateBlog}/>}></Route>
            </Routes>
        </div>
    )
}