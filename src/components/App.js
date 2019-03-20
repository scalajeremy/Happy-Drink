import React, { Component } from 'react';
import logo                 from '../assets/logo.svg';
import splash               from '../assets/splash2.svg';
import '../css/App.css';

import { establishments }    from './establishments/fixtures';
import Establishment         from './establishments/Establishment';

class App extends Component {
  constructor(props) {
          super(props);
          this.state = {
              pseudo            : "STRANGER",
              searchStringUser  : ""
          }
          this.handleChange = this.handleChange.bind(this);
      }
      handleChange(e){
        this.setState({searchStringUser: e.target.value})
      }

      componentWillMount () {
              console.log("componentWillMount")
          }

          componentDidMount () {
              console.log("componentDidMount")
          }

      randomPseudo = () => {
          let randomPseudo    = ""
          const possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
          const size          = Math.floor(Math.random() * 10) + 5
          for( let i=0; i < size; i++ ){
              randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))
          }
          this.setState({
              pseudo : randomPseudo
          })
      }

  render() {
    const establishmentFilter = establishments.filter((searchText) => {
            let search = searchText.name + " " + searchText.description;
            return search.toLowerCase().match(this.state.searchStringUser);
        });

    const listEstablishment = establishmentFilter.map( (establishment) => {
      return (
       <Establishment key={ establishment.id } establishment={ establishment }/>
        )
    })

    return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <img src={splash} className="splash" alt="splash" />
                    <h2>Welcome "{ this.state.pseudo }" to { this.props.title }</h2>
                </div>
                <div className="App-intro">
                    {/* On appelle notre fonction lors du clic sur le lien */}
                    <p> <button onClick={ this.randomPseudo } >Changer le pseudo !</button> </p>
                    <div>
                      <input type="text" placeholder="search" walue={this.state.searchStringUser} onChange={this.handleChange}/>
                    </div>
                    <section>
                        { listEstablishment }
                    </section>
                </div>
            </div>
        );
}
}

export default App;
