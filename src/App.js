import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Grid from  '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ComplexGrid from "./componentes/Options"
import Image from "./fondo.jpg"
//import Header from './components/Header'
//import Footer from './components/Footer'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {busqueda: "",artists: [],song: []}
        this.getParam=this.getParam.bind(this)
        this.getInfo=this.getInfo.bind(this)
    }
    getParam(event){
      this.setState({busqueda: event.target.value})
     // console.log(event.target)
    }
    getInfo(){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer BQC0U58NrOzOiUxpp1LpGorrvZqBj4BOvity79SndT5xzgKlsw7reuK1B14APvE9sjJkiHDD3w4rLZOUhU_y0VxGNE16AY5ziBvy1offTWw4iJMpExNnP2WCEb9ZPxdwuyKjFQd4D8wnJf5jfaDsuw2V8zde_OMw1vg-DcPa1fxRBKvG-A");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.spotify.com/v1/search?query=" + this.state.busqueda + "&type=artist,album,track&include_external=audio&offset=0&limit=5", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
           this.setState({artists: result.artists.items},()=>console.log(this.state.artista))
        
        
        })
        .catch(error => {
          console.log('error', error)
          alert("Se ha encontrado un error en la app")
        });
    }
    render(){
        return (<div>
          <center>
          <Grid container spacing={3} >
           <Grid item xs={12}>
             <Paper style={{width:"800px"}}>
            <TextField id="standard-basic" label="Coloca el nombre de la cancion" name="busqueda" value={this.state.busqueda} fullWidth={true} onChange={this.getParam} />
            </Paper>
            </Grid>
            <Grid item xs={12}>
            <Button onClick={this.getInfo} variant="contained">Consultar</Button>
            </Grid>
            </Grid>
            </center>
            <Grid item xs={4}>
              {
                this.state.artists.map(function(m)
                {
                  return(
                  <Paper style={{width:"500px"}}>
                    {m.images.length != 0 && m.images != undefined ? <ComplexGrid name={m.name} imagen={m.images[0].url} genres={m.genres[0]}/>:  <ComplexGrid name={m.name} imagen={Image} genres={m.genres[0]} followers={m.followers.total}/>}
                  </Paper>)
                })
              }
            </Grid>
           
            </div>);
    }
}
export default App;