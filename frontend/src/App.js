import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './Components/Todos/todos';
import Header from './Components/Layout/header';
import About from './Components/pages/about'
import AddTodo from './Components/Todos/addTodo';
// import uuid from 'uuid'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      activeItem: {
        id: null,
        title: '',
        completed: false,
      },
      editing: false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  
  UNSAFE_componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...')
    let url = 'http://127.0.0.1:8000/api/todo-list/';
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({
      todos: data
    }))
    .catch(() => console.log("Can’t access " + url + " response."))
  }

  markComplete = (id) => {

    // let newTodo = this.state.todos.filter(todo => {return todo.id === id});
    // newTodo.completed = !newTodo.completed;
    // console.log('Striking or Unstriking Item:', newTodo)
    // let csrftoken = this.getCookie('csrftoken');
    // let url = `http://127.0.0.1:8000/api/todo-update/${id}`;
    // fetch(url, {
    //   'method': 'POST',
    //   'headers': {
    //     'Content-type': 'application/json',
    //     'X-CSRFToken': csrftoken,
    //   },
    //   'body': JSON.stringify({'completed': newTodo.completed, 'title': newTodo.title})
    // }).then(response => {
    //   this.fetchTasks()
    // })
    // console.log('TASK:', newTodo.completed)

    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    }) })
  }
  
  delTodo = (id) => {
    console.log('Deleting Item', id)
    let csrftoken = this.getCookie('csrftoken');
    let url = `http://127.0.0.1:8000/api/todo-delete/${id}`;
    fetch(url, {
      'method': 'DELETE',
      'headers': {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    }).then(response => {
      this.fetchTasks()
    }).catch(err => console.log('ERROR: ', err))
  }

  addTodo = (title) => {
    this.setState({ activeItem: {
      ...this.state.activeItem,
      title: title
    }}, 
    () => {
      console.log('Item:', this.state.activeItem)
      let csrftoken = this.getCookie('csrftoken');
      let url = 'http://127.0.0.1:8000/api/todo-create/';
      fetch(url, {
        'method': 'POST',
        'headers': {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        'body': JSON.stringify(this.state.activeItem)
      }).then(response => {
        this.fetchTasks()
        this.setState({
          activeItem: {
            id: null,
            title: '',
            completed: false,
          }
        })
      }).catch(err => console.log('ERROR: ', err))
      }
    );
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                        delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path='/about' component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
