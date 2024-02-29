import { useState, useEffect } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import Blogs from '../../components/Blogs/Blogs'
import styles from './HomePage.module.scss'

export default function HomePage (props) {
    const [blogs, setBlogs] = useState([])
    const [showCreate, setShowCreate] = useState(false)

    // Blogs
    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                const data = await props.getAllBlogs()
                setBlogs(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogs()
    }, []) ///if dependency array is empty it will only run once on load 

    // Checking the token & user in localStorage
    useEffect(() => {
        if(localStorage.token && !props.token){
            props.setToken(localStorage.getItem('token'))
            setShowCreate(true) 
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, []) ///if dependency array is empty it will only run once on load 

    return(
        <div className={styles.homePage}>
            <h1>Welcome to Matty Ice's Blog</h1>
            { showCreate? <CreateForm createBlog={props.createBlog} user={props.user} token={props.token}/> : <></> }
            { blogs.length? <Blogs blogs={blogs}/> : 'Sorry our writers are lazy' }
        </div>
    )
}