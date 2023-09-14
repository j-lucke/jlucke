const videos = document.querySelectorAll('video')

videos.forEach(vid => {
    vid.addEventListener('mouseover', () => {
        vid.setAttribute('controls', 'controls')
    }) 
    vid.addEventListener('mouseleave', () => {
        vid.removeAttribute('controls')
    })
})

let selectedProject = null
const projects = document.querySelectorAll('.project')


document.addEventListener('click', (event) => {
    projects.forEach( p => {
    })
})

function f(node) {
    const midScreen = window.innerHeight / 2
    const rect = node.getBoundingClientRect()
    const midNode = rect.y + rect.height/2
    return Math.abs(midScreen - midNode)
}

function selectProject() {
    let min = f(projects[0])
    let project = projects[0]

    for (let i = 0; i < projects.length; i++) {
        const d = f(projects[i])
        if (d < min) {
            project = projects[i]
            min = d
        }
    }

    if (min > 400)
        return null

    return project
}



document.addEventListener('scroll', (event) => {
    old = selectedProject
    selectedProject = selectProject()
    if (selectedProject != null) {
        selectedProject.classList.add('onstage')
    }
    if (old != selectedProject) {
        if (old != null) {
            old.classList.remove('onstage')
        }
    }
})

document.addEventListener('keypress', () => {
    points.forEach( p => {
        console.log(`points.push(new Point(${p.x}, ${p.y}))`)
    })
})