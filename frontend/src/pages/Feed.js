import React, { Component } from 'react';
import './Feed.css';
import api from "../services/api"
import io from 'socket.io-client';

class Feed extends Component {
    state = {
        feed: [],
    };
    async componentDidMount(){
        this.registerToSocket();
        const response = await api.get('posts');
        this.setState({ feed: response.data });
    }
    // recebe da funcao handleLike um parametro id
    handleLike = (id,e) =>{
        api.post(`/posts/${id}/like`);

    }
    registerToSocket = () =>{
        const socket = io("http://localhost:3333");

        socket.on('post', newPost=>{
            this.setState({ feed: [newPost, ...this.state.feed] });
        })
        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => {
                    if(post._id === likedPost._id){
                        return likedPost;
                    }else{
                        return post;
                    }
                })
            })
        })
    }
    render(){
        return(
            <section id="post-list">
               { this.state.feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span> 
                        </div>
                        <button><i className="fas fa-ellipsis-h"></i></button>
                    </header>

                    <img src={`http://localhost:3333/files/${post.image}`} alt={`post do ${post.author}`}></img>

                    <footer>
                        <div className="actions">
                            <Heart isClicked={false}  id={post._id}/>
                            <button><i className="far fa-comment"></i></button>
                            <button className="right"><i className="far fa-paper-plane"></i></button>
                        </div>
                        <strong>{post.likes} curtidas</strong>
                        <p>
                           {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                        <div className="info">
                            Ver todos os Comentários
                            <p>HÁ 40 MINUTOS</p>
                        </div>
                    </footer>
                </article>
               ))}
            </section>
        );
    }
}

class Heart extends Component {

    constructor(props){
        super(props)
        this.state = {
            clicked: this.props.isClicked,
            id : this.props.id
        }
    }

    handleClick = () => {
        api.post(`/posts/${this.state.id}/like`);
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        const {clicked} = this.state
        return(<button onClick={this.handleClick}>
                <i className={clicked ? "fas fa-heart" : "far fa-heart"}></i>
               </button>)
    }
}
export default Feed;