import { Component } from 'react';

class AboutMe extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='content'>
                <h3 id="intro">Introduction</h3>

                <img src="./src/assets/me.jpg" alt="This is a picute of me" height="150" style={{ float: 'left' }} />

                <p>Hello, and welcome to my webpage. My name is Dustin Guest, an aspireing software developer.</p>

                <p>
                    I am a recent graduate from the University of Regina with a Bachelor's Degree in Philosophy and Computer Science.
                    I have strong programming skills and graduated with distinction. I am looking to be a valued member of a
                    software development team.
                </p>

                <p>
                    I am passionate about computer technology, taking any opportunity to learn more about programming languages,
                    new algorithms, and how to create better, more reliable and intuitive software. I am incredibly passionate
                    about developing 3D applications for the web, with WebGL applications, but I am also interested in developing
                    my knowledge of other 3D APIs such as Vulkan and Direct3D. I am also interested in web and mobile development,
                    as well as developing small interactive IoT devices.
                </p>

                <p>
                    I am skilled in developing interactive 2D and 3D graphics for web pages. I am also interested in developing
                    and implementing AI for solving problems, developing interactive gadgets, and programming software that provides
                    an intuitive user experience. I have experience developing webpages that interact with server-side databases
                    such as MySQL on an Apache server using PHP, Javascript, HTML, and CSS.
                </p>

                <p>
                    I look forward to working with a team of like-minded developers and striving to develop my knowledge of programing
                    language and technologies further to be an even more valuable member of the team.
                </p>

                <p>
                    I have worked in manual labour for a small landscape construction company.
                    During this time, I have become a leader of a small team of construction workers and have learned to work as a team member and manager.
                    I have also spent a lot of time working directly with customers to ensure they are satisfied with the work.
                    While this is a very different field, my experience working with and managing a small team would help me as part of a software development team.
                </p>

                <hr />

                <h3 id="education">Education</h3>

                <p>
                    I am an alumnus of the University of Regina, having two Bachelor's degrees.
                    My first bachelor's degree is a Bachelor of Arts in Philosophy, obtained in 2020.
                    My second degree is a Bachelor of Science in Computer Science, acquired in 2022.
                    Of note is that I graduated with distinction in 2022.
                </p>

                <p>
                    During my education, I have learned Object-oriented programing methodologies and
                    the importance of software engineering to any software project.
                    I have developed stronger mathematical problem-solving skills and acquired experience
                    using technologies such as databases, compilers, and debuggers.
                </p>

                <p>
                    I am constantly looking to expand my education. In the future,
                    I plan to improve my knowledge of computer technologies further.
                </p>

                <hr />

                <h3 id="hobbies">Hobbies</h3>

                <p> When I'm not coding and learning about new technologies, I am oftain working with my hands.
                    I have taken up amateur woodworking. Most recently, I have built a small tool shed; this is the largest
                    woodworking project I have undertaken. Most of my other woodworking projects are smaller, such
                    as tables or shelving units. </p>

                <p> I am also an avid movie watcher. I love the experience of going to the theatre,
                    though I have not been able to go as often in the past few years. </p>

                <p>
                    When I am stressed, I like to go for walks or runs in the park,
                    though I have been exercising less than I should in the last few years,
                    and I am trying to get back into shape.</p>

                <p>
                    I am also an avid gamer. I enjoy both video games and board games (though in recent years,
                    I have not been able to play as many board games as I would have liked.) I enjoy playing RPG and Puzzle games,
                    though I often play FPS and Action games.
                </p>
            </div>
        );
    }
}

class MyProjects extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='content'>
                <p>
                    This is a list of software projects that I have worked on, including school projects, personal projects,
                    and professional projects. This is both to record projects that I am proud of and to record my progress and skills
                    as a software developer. Each project should have a link to the project and a short description of the project.
                </p>

                <hr />

                <h3 id="school_pro"> School Projects</h3>

                <p>
                    This is a list of the coding projects that I woked on while in school.
                </p>

                <ul>
                    <li>
                        A personal webpage for an introduction to web development.
                        I continued to update it and add any of my projects that could run in a web browser:
                        <ul>
                            <li>Click <a href="http://www.webdev.cs.uregina.ca/~guest20d/" target="_blank" rel="noopener noreferrer">here</a> for a Link to the website hosted on the University of Reginas Web server(this may not work in the future).</li>
                            <li>Click <a href="#">here</a> for a link to the website hosted on my prvate domain.</li>
                            <li>Click <a href="#">here</a> for a link to the git containing the project.</li>
                        </ul>
                    </li>
                </ul>

                <hr />

                <h3 id="personal_pro">Personal Porjects</h3>

                <p>
                    This is a list of software (and software realted) projects that I have undertaken in my spare time:
                </p>

                <ul>
                    <li>A 3D web appplication that acts as an interactive resume. (this web app)</li>
                    <li>A <a href="">web blog</a> where I can express My opinions and chronicle my projects.</li>
                </ul>

                <hr />

                <h3 id="profesional_pro">Profesional Projects</h3>

                <p>
                    This will be a list of software projects that I have undertaken as a profesional:
                </p>

                <ul>
                    <li>to be filled</li>
                </ul>
            </div>
        );
        
    }
}


class ExperianceAndTech extends Component {
    constructor(preps) {
        super(preps);
    }

    render() {
        return(
            <div className='content'>
                <p>
                    This is a list of the different coding and related technologies I have expreiance with
                    as well as how long I have been using these technologies.
                </p>

                <ul>
                    <li>C++ : 3 - 4 years of experiance</li>
                    <li>C# : 2 years of experiance</li>
                    <li>C : less then year of experiance</li>
                    <li>javascript : 2 - 3 years of experiance </li>
                    <li>webGL</li>
                    <li>html</li>
                    <li>css</li>
                    <li>php</li>
                    <li>mySQL</li>
                    <li>java : novice</li>
                    <li>python</li>
                    <li>prolog</li>
                    <li>json and xml</li>
                    <li>lisp</li>
                    <li>...</li>

                </ul>
            </div>
        );
        
    }
}


export { AboutMe };
export { MyProjects };
export { ExperianceAndTech };