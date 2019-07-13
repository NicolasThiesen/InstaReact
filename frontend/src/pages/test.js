import React, { Component } from 'react';

class Test extends Component {
    handleLike = props =>{
        props.isCheck = true;
    }
    renderer(){
        return(
            <div>
            <Heart isClicked={false} onClick={() => this.handleLike(this.props)}/>
            <Heart isClicked={false} onClick={() => this.handleLike(this.props)}/>
            <Heart isClicked={false} onClick={() => this.handleLike(this.props)}/>
            <Heart isClicked={false} onClick={() => this.handleLike(this.props)}/>
            <Heart isClicked={false} onClick={() => this.handleLike(this.props)}/>
            </div>
        )
    }
}
function Heart(props){
    const isClicked = props.isClicked;
    if(isClicked){
        return <button onClick={props.onClick}><i className="fas fa-heart"></i></button>
    }else{
        return <button onClick={props.onClick}><i className="far fa-heart"></i></button>
    }
}
export default Test;