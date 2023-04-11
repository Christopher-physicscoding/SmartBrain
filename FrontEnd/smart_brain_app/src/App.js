
import Clarifai from 'clarifai';
import Logo from './component/logo/logo';
import Navigation from './component/navigation/navigation';
import ImageLinkForm from "./component/imagelinkform/imagelinkform"
import Rank from "./component/rank/rank"
import './App.css';
import ParticlesBg from 'particles-bg'
import { Component } from 'react';
import Facerecognition from './component/facerecognition/facerecognition';
import SignIn from './component/SingIn/SignIn';
const app = new Clarifai.App({
  apiKey: '79bafb9e66be4bc2a18919b8a03b259d'
 });


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      box : {},
      imageUrl : "",
      route: "signin"

      
    }
    this.onInputChange = this.onInputChange.bind(this);
    // this.displayFaceBox = this.displayFaceBox.bind(this);

  }
  onRouteChange = (data) => {
    this.setState({route : data});
  }

  displayFaceBox = (databox) => {
    this.setState({box : databox});
  }
  
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onInputChange = function(event){
    this.setState({input : event.target.value});

  }
  onButtonSubmit = () => {
    this.setState({"imageUrl" : this.state.input})
    console.log(typeof(this.state.imageUrl));
    // this.displayFaceBox({eka : 50});
    // console.log(this.state.box)
    // app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg')
    // .then(response => console.log(response))
    //  .catch(error => console.log(error));

    app.models.predict(
      {
          id: 'face-detection',
          name: 'face-detection',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        }, this.state.input)
      
      .then(response => {
        console.log('hi', response);
        console.log("hello world" + response.outputs[0].data.regions[0].region_info.bounding_box.left_col);
        this.displayFaceBox(this.calculateFaceLocation(response));
        console.log("hello world"+ this.calculateFaceLocation(response));
        console.log(this.state.box);  
      });

    // if (response) {
    //     fetch('http://localhost:3000/image', {
    //       method: 'put',
    //       headers: {'Content-Type': 'application/json'},
    //       body: JSON.stringify({
    //         id: this.state.user.id
    //       })
    //     })
    //       .then(response => response.json())
    //       .then(count => {
    //         this.setState(Object.assign(this.state.user, { entries: count}))
    //       })

    // //   }
    // //   this.displayFaceBox(this.calculateFaceLocation(response))
    // // })
    // .catch(err => console.log(err));

    
  }

  
  // eslint-disable-next-line no-dupe-class-members
  onRouteChange = () =>{
    if(this.state.route === "home"){
      this.setState({route : "signin"})
    } else {
    this.setState({route :"home"})}
  }
  render(){
    return (
          <div className="App">
            <ParticlesBg type="fountain" bg={true} />
            {this.state.route === "signin" ? <SignIn onRouteChange ={this.onRouteChange}/> : 
            <div>
              <Navigation onRouteChange={this.onRouteChange}></Navigation>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}  />
              <Facerecognition imageUrl={this.state.imageUrl} box = {this.state.box}/>   
            </div>}

           
          </div>
      );
  }
}
export default App;
