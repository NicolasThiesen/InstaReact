import React, { Component } from 'react'; 
import "./New.css";
import api from "../services/api";

class New extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: null,
            image: null,
            author: '',
            place: '',
            description: '',
            hashtags: '',
            spin: 0,
            dis: {display:"none"},
        }
        this.handleChange = this.handleChange.bind(this)
      }
    handleSpin= async () => {
        if(this.state.spin === 360){
            this.setState({spin:0});
        }else{
            this.setState({spin: this.state.spin +90});
        }
        console.log(this.state.spin);
    }

    handleSubmit = async e => {
        e.preventDefault();
        
        // Usa-se FormData pois existe um arquivo/file junto do array
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);
        
        await api.post('/posts', data);

        this.props.history.push("/");
    }

    handleImageChange = e =>{
        this.setState({ image: e.target.files[0], file: URL.createObjectURL(e.target.files[0]), dis:{display:"block"} })
    }

    handleChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return(
            
            <form id="new-post" onSubmit={this.handleSubmit}>
                <h1>Novo Post</h1>
                <div className="row">
                    <label>Inserir um arquivo<input type="file" onChange={this.handleImageChange} id="file"></input></label>
                    <div className="preview">
                        <img src={this.state.file}></img>
                        <button style={this.state.dis} type="button" onClick={ () =>  this.handleSpin()} className="spin"><i className="fas fa-redo"></i></button>
                    </div>
                </div>
                <input type="text" name="author" placeholder="Autor" onChange={this.handleChange} value={this.state.author}></input>
                <input type="text" name="place" placeholder="Local" onChange={this.handleChange} value={this.state.place}></input>
                <input type="text" name="description" placeholder="Descrição" onChange={this.handleChange} value={this.state.description}></input>
                <input type="text" name="hashtags" placeholder="Hashtags" onChange={this.handleChange} value={this.state.hashtags}></input>
                <button type="submit">Compartilhar Novo Post</button>
            </form>
        );
    }
}

function Preview(file){
    return <img ></img>
}
export default New;