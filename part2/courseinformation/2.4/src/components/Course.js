import React from 'react'

const Part = ({name,exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
  )
}

const Header = ({header}) => {
  return (
    <h2>
      {header}
    </h2>
  )
}

const Accumulate = ({sum}) => {
  return (
    <p>
      <b>
        total of {sum} exercises
      </b>
    </p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Accumulate sum={course.parts.reduce((acc,part) => acc+part.exercises,0)}/>
    </div>
  )
}



export default Course