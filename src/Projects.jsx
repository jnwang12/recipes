import "./Projects.css"
import {Header, Footer} from './components/Margins'
import {supabase} from './supabaseClient'
import {useEffect, useState} from 'react'

const ProjectCard = ({name, description, image, institution, notes}) => {
    return(
        <div className = "project_card">
            <div>
                <h1>{name}</h1>
                <p className = "notes">{institution}</p>
            </div>
            <img src = {image} alt = {name}></img>
            <div>
                <h2>{description}</h2>
                <p className = "notes">{notes}</p>    
            </div>
            

        </div>
    )
}


const Projects = () => {
    const [projects, setProjects] = useState([])
    const [loading, ifLoading] = useState(true)

    useEffect(() => {
        const getProjects = async () => {
            try {
                const {data, error} = await supabase.from('projects').select('*')

                if (error)
                    throw error
                setProjects(data)
            } catch (error) {
                console.log("error!!!", error)
            } finally {
                ifLoading(false)
            }
        } 
        getProjects()
    }, [])

    if (loading) 
        return (
            <div className="page">
                <h1 style={{color: "#A43032"}}> gathering projects...</h1>
            </div>
        )

    return (
        <div className="page">
             <Header/>
             <h1 className = "myHeader">some of my projects!!!</h1>
             <div className = "projects">
                {projects.map(project => 
                <ProjectCard
                    key = {project.id}
                    name = {project.name}
                    description = {project.description}
                    image = {project.image}
                    institution = {project.institution}
                    notes = {project.notes}
                />
             )}
             </div>
             <div style= {{height: "10vh"}}>

             </div>
             <Footer/>

        </div>
    )

}

export default Projects