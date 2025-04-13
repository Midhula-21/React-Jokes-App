import React, {useState } from 'react';
import './App.css' ;

const App = () => {

  //jokeObject is a variable, setJoke is a function
  //inside jokeObject variable we will store the joke
  //setJoke function is used to update the jokeObject variable
  const [jokeObject,setJoke] = useState([])
  const [category,setCategory] = useState('Any') //default category any

  function getCategory(event){
    setCategory(event.target.value) //which element is targetted we will get the targeted element value
  }

  //using async and await be ause it takes time to fetch jokes and for responses 
  async function getJoke(){
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
    const joke = await response.json()
    console.log(joke)
    if(joke.type === "twopart"){
      setJoke([joke.setup,joke.delivery])
    }else{
      // setJoke([joke.jokeObject])
      setJoke(joke.joke)
    }
  }

  return (
    <div style={{display : "flex" , justifyContent : "center" , alignItems : "center" , flexDirection : "column", marginTop : "10%"}}>
      <div style = {
        {border:"1px solid " , 
        borderRadius : "20px", 
        marginBottom : "10px", 
        height : "100%" , 
        width : "500px", 
        padding :"20px" , 
        fontSize : "15px" , 
        fontFamily:  '"SF Pro Rounded", "Segoe UI" ,system-ui, sans-serif',
        fontWeight : "normal",
        textAlign:"center",
        boxShadow: "5px 5px rgb(0,0,0,0.5)",
        }}> 
        {
          jokeObject.length === 0 ? (
          <p style={{textAlign:"center"}}>Click on " Get Joke " to see a joke....</p>) :
          jokeObject.length === 2 ? (<div> <h1>{jokeObject[0]}</h1><h1>{jokeObject[1]}</h1></div>) : (<h1>{jokeObject}</h1>)
        }
      </div>
      <div style = {{display : "inline"}}>
        <button onClick={getJoke} style = {{height: "40px", width : "150px" , borderRadius : "10px" , marginRight: "20px", fontFamily:  '"SF Pro Rounded", "Segoe UI" ,system-ui, sans-serif',}}>
          Get Joke 😂
        </button>
        <select onChange={getCategory} style = {{height: "40px", width : "150px" , borderRadius : "10px", textAlign : "center" , fontFamily:  '"SF Pro Rounded", "Segoe UI" ,system-ui, sans-serif',}}>
          <option value="Any">Any</option>
          <option value="Programming">Programming</option>
          <option value="Misc">Misc</option>
          <option value="Dark">Dark</option>
          <option value="Pun">Pun</option>
          <option value="Spooky">Spooky</option>
          <option value="Christmas">Christmas</option>
        </select>
      </div>
    </div>
  )
}

export default App
