import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react'; //create components to add methods
class App extends Component{

  //adding constructor for this class
  constructor(props){
    super(props); //parent constructor
    this.state = { //can include the variables to be accessed
      notes:[]
      
    }
  }

  //variable to store api url
  API_URL='http://localhost:5038';


  componentDidMount(){ //method to call refreshNotes-inbuilt
    this.refreshNotes();
  }
  //methods to get data from api to notes array
  async refreshNotes(){
    fetch(this.API_URL + '/api/todoapp/GetNotes' ).then(response=>response.json()).
    then(data=>
      this.setState({notes:data})
      );
    //fetching data from server using GET method
  }

  async addClick(){
    var newNotes=document.getElementById('newNotes').value; //captured date from textbox 
    const data=new FormData(); //form data to send to post api method
    data.append('description',newNotes);

    fetch(this.API_URL + '/api/todoapp/AddNotes',{
      method:'POST',
      body:data
    }).then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshNotes();
    })
  }

  async deleteClick(id){
   fetch(this.API_URL + '/api/todoapp/DeleteNotes?id='+id,{  //passing it as a query string
      method:'DELETE',
    }).then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshNotes();
    })
  }

render() {
  const{notes} = this.state;
  return (
    <div className="App">
      <h1>TO DO APP</h1><br/>
      <div className="form-container">
      <input id='newNotes' />&nbsp; <br/><br/>
      <button onClick={()=>this.addClick()}>ADD NOTES</button>
      </div>
     <div className="notes-container">
      {notes.map((note)=>
      //added extra key to avoid warning message in react
  <div key={note.id} className="note"> 
    <h2> {note.description}</h2>&nbsp;
    <button onClick={()=>this.deleteClick(note.id)}>DELETE NOTES</button>
  </div>
)}
      </div>
    </div>
  );
}
}
export default App;
