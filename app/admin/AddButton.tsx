'use client'
import React from 'react'

type Props = {}

const AddButton = (props: Props) => {
  const onClickHandler = (e:React.MouseEvent) => {
    e.preventDefault();
  }
  return (
    <button onClick={onClickHandler}>Add new</button>
  )
}

export default AddButton