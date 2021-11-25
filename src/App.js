import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Grid from  '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ComplexGrid from "./componentes/Options"
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
      myHeaders.append("Authorization", "Bearer BQBPp6LGpvwm7_tLENFfadLD2AJAgMOPCsLFJYCjQLZUrIraOpd118dgUHdQrsmQ5Y0VQx6hnGxxFJ3tMJKTEEUpuOzKH-MkCqzNMOcEdhyEe-QKlWznJ8UdIluZHbbwTHUkuum0cdEYzd3MZ6984mAbdHCWw03ziLShIol6a813PaspmQ");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.spotify.com/v1/search?query=" + this.state.busqueda + "&type=artist,album,track&include_external=audio&offset=0&limit=5", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
           this.setState({artists: result.artists.items,song: result.tracks.items},()=>console.log(this.state.artista,this.state.song))
        
        
        })
        .catch(error => console.log('error', error));
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
                  {m.images != undefined && <ComplexGrid name={m.name} imagen={m.images[0].url} genres={m.genres[0]}> </ComplexGrid>}
                  </Paper>)
                })
              }
            </Grid>
            <Grid item xs={4}>
            <Paper style={{width:"500px"}}>
            {
                this.state.song.map(function(m)
                {
                  return(
                  <Paper style={{width:"500px"}}>
                  {m.images != undefined && <ComplexGrid name={m.name} imagen={m.images[0].url} genres={m.genres[0]}> </ComplexGrid>}
                  </Paper>)
                })
              }
            </Paper>
            </Grid>
            </div>);
    }
}
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
      <TextField id="standard-basic" label="Standard" />
      <Button variant="contained">Default</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;