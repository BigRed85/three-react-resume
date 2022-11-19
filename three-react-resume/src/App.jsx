import { Component } from 'react';

import './App.css';
import { AboutMe, ExperianceAndTech, MyProjects } from './content.jsx';
import Background3D from './Background3D.jsx';

class LightSwitch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lightState = this.props.light ? 'lightOn' : 'lightOff';

    return(
      <div className='lightSwitch'>
        <button className={'lightButton ' + lightState} onClick={() => {this.props.onLightSwitch()}}><div>||</div></button>
      </div>
      
    );
  }
}


class CloseButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className='closeButton' onClick={() => this.props.onClick()}>&times;</button>
    )
  }
}

class PageContent extends Component {
  constructor(props) {
    super(props);
  }

  getContent() {
    switch (this.props.navSelection) {
      case 0:
        return (
          <AboutMe/>
        );
      case 1:
        return (
          <MyProjects/>
        );
      case 2:
        return (
          <ExperianceAndTech/>
        );
      default:
        return null;
    }
  }

  getTitle() {
    switch (this.props.navSelection) {
      case 0:
        return <h2>About Me</h2>;
      case 1:
        return <h2>My Projects</h2>
      case 2:
        return <h2>Experiance and Technologies</h2>

      default:
        return null;
    }
  }

  render() {
    if (this.props.navSelection === null)
      return null;

    const title = this.getTitle();
    const content = this.getContent();

    return (
      <div className='pageContent'>
        {title}
        <CloseButton onClick={() => this.props.onClose()} />
        {content}
      </div>
    )
  }
}

class NavItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.selected
        ?
        <li className='navItem navItemSelected'>
          <button onClick={this.props.onClick}> {this.props.name} </button>
        </li>
        :
        <li className='navItem'>
          <button onClick={this.props.onClick}> {this.props.name} </button>
        </li>
    )
  }
}

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sections = ['About Me', 'My Projects', 'Experiance and Technologies'];

    let navItems = sections.map((section, index) => {
      return (index === this.props.navSelection
        ?
        <NavItem name={section} key={index} onClick={() => this.props.onClick(index)} selected={true} />
        :
        <NavItem name={section} key={index} onClick={() => this.props.onClick(index)} selected={false} />
      )
    });

    return (
      <nav className='navBar'>
        <ul>
          {navItems}
        </ul>
      </nav>
    );
  }
}

class UserInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelection: null,
    }
  }

  navClick(index) {
    this.setState({
      navSelection: index,
    });
  }

  closeContent() {
    this.setState({
      navSelection: null,
    })
  }

  render() {
    return ( this.state.navSelection === null 
      ?
      <div id='userInterface'>
        <LightSwitch light={this.props.light} onLightSwitch={() => this.props.onLightSwitch()} />
        <NavBar onClick={(i) => { this.navClick(i) }} navSelection={this.state.navSelection} light={this.props.light}/>
      </div>
      :
      <div id='userInterface' className='pageContainer'>
        <LightSwitch light={this.props.light} onLightSwitch={() => this.props.onLightSwitch()} />
        <PageContent navSelection={this.state.navSelection} onClose={() => { this.closeContent() }} light={this.props.light}/>
        <NavBar onClick={(i) => { this.navClick(i) }} navSelection={this.state.navSelection} light={this.props.light}/>
      </div>
    );
  }
}

class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      light: false,
    }
  }

  lightSwitch() {
    this.setState({
      light: !this.state.light,
    }, () => {

      const rootStyle = document.documentElement.style;

      if (this.state.light) {
        rootStyle.setProperty('--main-bg-color', 'rgb(255, 255, 255)');
        rootStyle.setProperty('--main-bg-transparent', 'rgba(255, 255, 255, 0.7)');
        rootStyle.setProperty('--main-text-color', 'rgb(0, 0, 0)');
        rootStyle.setProperty('--button-bg-color1', '#8a2be2');
        rootStyle.setProperty('--button-bg-color2', 'rgb(35, 11, 57)');

      }
      else {
        rootStyle.setProperty('--main-bg-color', 'rgb(41, 41, 41)');
        rootStyle.setProperty('--main-bg-transparent', 'rgba(41, 41, 41, 0.7)');
        rootStyle.setProperty('--main-text-color', 'rgb(255, 255, 255)');
        rootStyle.setProperty('--button-bg-color1', 'rgb(35, 11, 57)');
        rootStyle.setProperty('--button-bg-color2', '#8a2be2');
      }

    });

    
  }

  render() {
    
  
    return (
      <div className="App">
        <Background3D light={this.state.light}/>
        <UserInterface light={this.state.light} onLightSwitch={() => {this.lightSwitch()}}/>
      </div>
    )
  }
  
}

export default App
