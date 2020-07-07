import React from 'react'

class AddTodo extends React.Component{
    
    state = {
        title: ''
    }

    changeTodo = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitTodo = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title)
        this.setState({ title: '' });
    }

    render(){
        return(
            <form style={{display: 'flex'}} onSubmit={this.submitTodo}>
                <input type="text" name="title" placeholder="Add Todo" 
                    style={{flex: '10', padding: '10px'}}
                    value={this.state.title} onChange={this.changeTodo}/>
                <input type="submit" style={{flex: '1'}} className="btn"/>
            </form>
        );
    }
}

export default AddTodo;