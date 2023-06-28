const Header = ({course}) => <h1>{course}</h1>

const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <>
            <p><b>total of {total} exercises</b></p>
        </>
    )
}

const Part = ({name, exercises}) =>
    <p>
        {name} {exercises}
    </p>

const Content = ({parts}) =>
    <>
        {parts.map(parts =>
            <Part key={parts.id} name={parts.name} exercises={parts.exercises}/>)}
    </>

const Course = ({course}) => (
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)

export default Course;