const Header = ({name}) =>{
    return (
        <h1>{name}</h1>
    )
}

const Content = ({parts}) => {
    return (
    <div>
        {parts.map((part) =>
            <Part key = {part.id} name ={part.name} exercises = {part.exercises} />   
        )}
    </div>    
    )
}

const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
}

const Total = ({parts}) => {
    const totalSum = parts.reduce((totalSum, part) => totalSum += part.exercises, 0)
    return (
    <p><strong>total of {totalSum} exercises</strong></p>
    )
}
const Course = ({course}) => {
    
    return (
        <div>
        <Header name={course.name} />
        <Content parts ={course.parts} />
        <Total parts={(course.parts)} />
        </div>
    )
}

export default Course