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
    <h1>
      {header}
    </h1>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}







export default Course