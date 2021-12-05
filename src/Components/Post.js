import React, {useEffect, useRef, useState} from "react"
import { getPost, setItem } from "../Services/List";
import "../Post.css"

function Post(){

    const [alert, setAlert] = useState(false);
    const [posts,setPosts] = useState([]);
    
    const [itemTitle, setItemTitle] = useState('');
    const [itemBody, setItemBody] = useState('');
    
    const [visible, setVisible] = useState(7);

    const mounted = useRef(true);

    useEffect(()=>{
        mounted.current = true;
        if(posts.length && !alert){
            return;
        }
        getPost()
            .then(items=>{
                if(mounted.current){
                    setPosts(items);
                }
            })
            return () => mounted.current = false;
    },[alert, posts])

    useEffect(()=>{
        if(alert){
            setTimeout(() => {
                if(mounted.current){
                setAlert(false)
            }
            }, 1000);
        }
    }, [alert])


    const handleSubmit = (e) => {
        e.preventDefault();
        setItem(itemTitle, itemBody)
            .then(()=>{
                if(mounted.current){
                setItemBody('');
                setItemTitle('');
                setAlert(true)
            }
            })
     
    }
    function deleteUser(id){
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method: "DELETE"
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn(resp)
                getPost();
            })
        })
    }

    const showMorePosts = () => {
        setVisible((prevValue)=> prevValue + 5);
    };


    return (
        <div className="post--container">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-div">
                    <input type="text" placeholder="Title..." onChange={e=>setItemTitle(e.target.value)} value={itemTitle} className="form--title"/> 
                    <textarea type="text" placeholder="Post..." onChange={e=>setItemBody(e.target.value)} value={itemBody} className="form--post"/>   
                </div>
                <button type="submit" className="form--button">Post</button>
            </form>
            {alert && <h2>Submit Successful</h2>}
            {posts.slice(0, visible).map(post => 
            <div className="post" key={post.id}>
                <h4 className="post--title--text"><span className="post--title">Title: </span>{post.title}</h4>
                <p className="post--text"><span className="post--post">Post: </span>{post.body}</p>
                <div className="post--buttons">
                    <button className="post--delete" onClick={()=>deleteUser(post.id)}>Delete</button>
                </div>
            </div>
            )}
            <button onClick={showMorePosts} className="post--load">Load More</button>
            
        </div>
    )
}
export default Post

