import { Component, useEffect } from 'react';

import * as THREE from 'three';
import { Reflector } from './Reflector.js';

import { Stars } from './stars.js';

import './App.css';
import { AboutMe, ExperianceAndTech, MyProjects } from './content.jsx';

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
        <NavBar onClick={(i) => { this.navClick(i) }} navSelection={this.state.navSelection} />
      </div>
      :
      <div id='userInterface' className='pageContainer'>
        <PageContent navSelection={this.state.navSelection} onClose={() => { this.closeContent() }} />
        <NavBar onClick={(i) => { this.navClick(i) }} navSelection={this.state.navSelection} />
      </div>
    );
  }
}

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;

    const camera = new THREE.PerspectiveCamera(
      50,
      aspectRatio,
      0.1,
      100
    );
    camera.position.set(0, 2, 16);
    camera.lookAt(new THREE.Vector3(0, 2, 0));


    const canvas = document.getElementById('myThreeJSCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);


    //------------- add lights -------------------------------
    const ambidentLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambidentLight);


    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    // ------------------------- add meshes -------------
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const boxMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);
    boxMesh.position.set(0, 2, 0);



    const stars = new Stars(200, new THREE.Vector3(-128, 4, -32), new THREE.Vector3(128, 32, -60));

    // -------------------------- add static meshes --------------------------------
    addFloor();

    addSky();


    //---------------- set up variables for box roatation
    const rotationDelta = 1.0;
    let isDefaltRotation = true;

    let mousePos1 = new THREE.Vector2();
    let mousePos2 = new THREE.Vector2();

    //-------------------- setup events for user interactions
    setupEvents();

    const clock = new THREE.Clock();

    const animate = () => {
      let clockDelta = clock.getDelta();
      stars.update(clockDelta);
      rotateBox({ clockDelta: clockDelta });
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    function addFloor() {
      const floorGeo = new THREE.PlaneGeometry(64, 32, 2, 1);
      const floorMat = new THREE.MeshDepthMaterial({
        wireframe: false,
        transparent: true,
        opacity: 0.9,
      });
      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      scene.add(floorMesh);
      floorMesh.position.y = -0.001;
      floorMesh.rotateX(-Math.PI / 2);

      addFloorGrid(-32, 32, -16, 16);

      //-------- setup reflector --------
      addMirrorFloor();
    }

    function addFloorGrid(xmin, xmax, ymin, ymax) {
      //create a grid to siplay the floor

      //then create a seriaes of line segments.

      let gridPoints = [];
      let gridMaterial = new THREE.LineBasicMaterial({ color: 0x550055, linewidth: 1, });
      let gridGeometry = new THREE.BufferGeometry();

      for (let x = xmin; x <= xmax; x++) {
        gridPoints.push(
          x, ymin, 0,
          x, ymax, 0
        );
      }

      for (let y = ymin; y <= ymax; y++) {
        gridPoints.push(
          xmin, y, 0,
          xmax, y, 0
        )
      }

      //create then add the grid
      gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPoints, 3));
      let gridlines = new THREE.LineSegments(gridGeometry, gridMaterial);
      scene.add(gridlines);
      gridlines.position.y = 0;
      gridlines.rotateX(-Math.PI / 2)

    }

    function addMirrorFloor() {
      const mirrorOptions = {
        clipBias: 0.000,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x808080,
        multisample: 4,
      };

      const mirrorGeometry = new THREE.PlaneGeometry(64, 32, 2, 1);
      const mirror = new Reflector(mirrorGeometry, mirrorOptions);

      mirror.rotateX(-Math.PI / 2);
      mirror.position.set(0, -0.002, 0)
      scene.add(mirror);
    }

    function addSky() {
      //sky will consist of a stary sky

      //add background gradiant (this needs to be in world so that there is a reflection)
      addSkyGradiant();

      //add stars
      addStars();
      //add clouds?
    }

    function addStars() {
      scene.add(stars.object);
    }

    function addSkyGradiant() {
      const skyplaneGeo = new THREE.PlaneGeometry(512, 64, 2, 1)

      const color = new THREE.Color();
      const colors = [];
      const count = skyplaneGeo.attributes.position.count;

      for (let i = 0; i < count; i++) {
        let t = skyplaneGeo.attributes.position.array[i * 3 + 1]; //the y coordinate
        if (t <= 0) {
          color.setRGB(0.1, 0.0, 0.2); //purple
        } else {
          color.setRGB(0.0, 0.0, 0.0); //black
        }

        colors.push(color.r, color.g, color.b);
      }

      skyplaneGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const skyplaneMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
      })

      const skyplane = new THREE.Mesh(skyplaneGeo, skyplaneMat);
      scene.add(skyplane);
      skyplane.position.set(0, 4, -64);
    }

    function rotateBox(prop) {
      let clockDelta = prop.clockDelta;
      if (isDefaltRotation) {
        boxMesh.rotation.y += rotationDelta * clockDelta;
        boxMesh.rotation.x += rotationDelta * clockDelta;
      }
      else {
        let deltaX = (mousePos1.x - mousePos2.x) / 90;
        let deltaY = (mousePos1.y - mousePos2.y) / 90;

        let up = new THREE.Vector3(0, 1, 0);
        let right = new THREE.Vector3(1, 0, 0);

        boxMesh.rotateOnWorldAxis(up, -deltaX);
        boxMesh.rotateOnWorldAxis(right, -deltaY);

        //update mouse positions
        mousePos1.x = mousePos2.x;
        mousePos1.y = mousePos2.y;
      }
    }

    function setupEvents() {
      //when the user clicks on the canvas they can control the rotation of the box.

      canvas.onmousedown = (event) => {
        isDefaltRotation = false;

        mousePos1.x = event.screenX;
        mousePos1.y = event.screenY;
      };

      canvas.onmousemove = (event) => {
        mousePos2.x = event.screenX;
        mousePos2.y = event.screenY;
      };

      canvas.onmouseup = () => {
        isDefaltRotation = true;
      };

      canvas.onmouseleave = () => {
        isDefaltRotation = true;
      };

      window.onresize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
    }

  }, []);

  return (
    <div className="App">
      <canvas id="myThreeJSCanvas" />
      <UserInterface />
    </div>
  )
}

export default App
