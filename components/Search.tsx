'use client'
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios'
import Flowchart from './Flowchart';
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 3em;
  color: white;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1.2em;
  
  border: none;
  margin-bottom: 20px;
  width: 300px;
  max-width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  color: white;
  background-color: #2E67F5;
  border: none;

  cursor: pointer;
  

  &:hover {
    background-color: #A78BFA;
  }
`;

const Search = () => {
    interface Roadmap {
        title: string;
        sections: {
          title: string;
          items: string[];
        }[];
      }
      type FlowchartProps = {
        map: Roadmap[];
      };
    const [input,setinput]=useState('')
    const [output,setoutput]=useState<Roadmap[]>([])
    const [on, seton]=useState(false)
    const [isloading,setisloading]=useState(false)
    let data = JSON.stringify({
        "topic":` ${input}`
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://roadmap-be.vercel.app/v1',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    function generatemap(){
        if(input){
            setisloading(true)
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setoutput(response.data )
          seton(true)
          setisloading(false)
        })
        .catch((error) => {
          console.log(error);
          seton(false)
          setisloading(false)
        });
        }else{
            alert('Input can not be empty')
        }
    }
  return (
    <Container className='min-h-screen overflow-x-hidden'>
     <div className="flex flex-col items-center">
     <Title className='font-Aifont text-center'>Roadmap Generator</Title>
      <Input className='font-Aifont md:rounded-l-lg rounded-lg' type="text" onChange={(e)=>{
        setinput(e.target.value)
      }} placeholder="Enter topic to get a roadmap" />
      <Button className='font-Aifont md:rounded-r-lg rounded-lg w-fit' onClick={generatemap}>{isloading?'Generating....':'Generate Roadmap'}</Button>
     </div>
     {on? <Flowchart map={output} />:''}
    </Container>
  );
}

export default Search;
