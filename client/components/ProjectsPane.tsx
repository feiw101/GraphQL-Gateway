import React from 'react';
import Loading from './Loading';
import ProjectItem from './ProjectItem';

export default function ProjectsPane({
    projectLoading,
    projects,
    setSelectedProject,
}: ProjectPaneProps) {
    return (
        <>
            <h3>Projects:</h3>
            {projectLoading ? (
                <Loading />
            ) : (
                <>
                    {projects?.map((project) => (
                        <ProjectItem
                            key={project.id}
                            project={project}
                            setSelectedProject={setSelectedProject}
                        />
                    ))}
                    <button className="selectProjectButton newProject" type="button">
                        New Project
                    </button>
                    <div>Menu toSee/update profile info</div>
                </>
            )}
        </>
    );
}
