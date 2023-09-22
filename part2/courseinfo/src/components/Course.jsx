
const Header = ({header}) => {
return <h2>{header}</h2>
}

const Part = ({part}) => {
    const {name, exercises} = part
    return <p>{name} {exercises}</p>
}

const Content = ({parts}) => {
    return(
        <>
            {parts.map(part => <Part key={part.id} part={part}></Part>)}
            <h3>total of {parts.reduce((acc,curr) => { return acc +  curr.exercises},0)} exercises</h3>
        </>
    )
}

const Course = ({course}) => {
    const {id,name,parts} = course
    return(
        <>
        <Header header={name}></Header>
        <Content parts={parts}></Content>
        </>
    )
}

export default Course