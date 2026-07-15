import "./Home.css"
import {Header, Footer} from './components/Margins.jsx'
import { useInView } from 'react-intersection-observer'
import {useEffect, useState} from 'react'
import {supabase} from './supabaseClient.js'
import {Link} from 'react-router-dom'

const About = () => {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 1
    })

    return (
        <div ref ={ref} className = {`about ${inView ? 'active' : ''}`}>
            <h1 style = {{color: "#F2D9A4"}}> a little about me!</h1>
            <div className="passions">
                <img src = {"/images/thumbsup.png"}></img>
                <div>
                    <h2 className = "passionWords">i'm interested in: 
                        <ul >
                            <li>bioinformatics</li>
                            <li>high-performance computing</li>
                            <li>machine learning</li>
                            <li>full-stack development</li>
                            <li>data analysis</li>
                            <li>collaboration</li>
                            <li>adaptability</li>
                        </ul>

                    </h2>
                </div>
            </div>
        </div>
    )
    

}

const TechnicalCard = ({single}) => {
    return(
        <div className = "card">
            <img src = {single.image}></img>
            <h2 style = {{padding: '30px'}}>{single.name}</h2>

        </div>
    )
}

const Technical = ({tech}) =>{
    return(
        <div>
            <h1 style = {{color: "#710414"}}>languages/technologies</h1>
            <div style = {{height: "3vh"}}></div>
                <div className="technicals">
                    {tech.map(card => 
                        <TechnicalCard single={card} key = {card.id}/>
                    )}
                </div>
        </div>
    )
}

const ImgGif = ({image, video}) => {
    const [hovering, isHovering] = useState(false);

    return(
        <div 
            onMouseEnter = {() => isHovering(true)}
            onMouseLeave={() => isHovering(false)}
            className="media"
        >
            {hovering
                ? (
                    <video src={video} autoPlay loop muted playsInline />
                )
                : (
                    <img alt = {"person"} src= {image}></img>
                )
            }
        </div>
    )
}

const GetRecipe = () => {
    return(
        <div style = {{padding: "100px"}}>
            <div className="dishes">
                <div>
                    <img alt = {"hirono!!!"} src = {"/images/tippler.png"}></img>
                    <h2> i'm an avid hirono collector!!</h2>
                </div>
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <h2>check out some of my recent creations :P</h2>
                    <Link to="/recipes" className = "getDishes" >dishes</Link>
                </div>
            </div>
        </div>
    )
}



const Home = () => {
    const [tech, setTech] = useState([])
    const [loading, isLoading] = useState(true)

    useEffect(() => {
        const getTech = async() => {
            try{
                const {data, error} = await supabase.from('technical').select('*')

                if (error)
                    throw error
                setTech(data)
            } catch (error) {
                console.log("error!!!!", error.message)
            } finally {
                isLoading(false)
            }
        } 
        getTech()
    },[])


    if (loading)
        return(
            <div className = "page">
                <h1 style = {{color: '#A43032'}}> just a second...</h1>
            </div>
        )

    const intro = { 
        color: '#A43032', 
        marginTop: '50px', 
        fontSize: '80px', 
        lineHeight: 1.1
    }

    
    
    return(
        <div className = "page">
            <Header/>
            <h1 style={intro}>hi! my name is joy wang</h1>
            <ImgGif image = "/images/joywang.png" video = "/images/joywang.mp4"/>
            <h2 style ={{marginTop: "50px", color: '#A43032', fontSize: "40px"}}> i'm a sophomore at rice university studying computer science and computational and applied mathematics</h2>
            <div style={{height: '20vh'}}>
            </div>
            <About/>
            <div style={{height: '20vh'}}>
            </div>
            <Technical tech={tech}/>
            <GetRecipe/>
            <Footer/>
        </div>
    )

}

export default Home