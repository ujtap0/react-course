import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const {isLoading, error, sendRequest:sendTaskRequest}=useHttp();

  const createdTask = (taskText, taskData) =>{
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url:'https://react-http-617c6-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST', 
      headers:{
      'Content-Type': 'application/json',
      },
      body:{ text: taskText }
  }, createdTask.bind(null, taskText)
  //bind: pre-configure function
  //함수의 초기 설정을 해주는데 createdTask가 바로 호출되지 않고
  //createdTask가 호출될 때 첫번째 인자로 taskText를 가지고 호출됨
  )};

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
