
import { useEffect, useState } from 'react'

const MyComponent = () => {
  const [randomValue, setRandomValue] = useState(0);
  const alunos = [
    {nome: 'João', nota: 8.2},
    {nome: 'Paulo', nota: 6.5},
    {nome: 'Tereza', nota: 8.0},
    {nome: 'Fernando', nota: 7.5},
    {nome: 'Ana', nota: 7.8},
    {nome: 'Lais', nota: 9.5},
    {nome: 'Carlos', nota: 10}
  ];

  useEffect(()=>{
    const timeout = setInterval(()=>{
      setRandomValue(Math.random());
    }, 100);

    return ()=>{
      clearInterval(timeout);
    }
  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'left', width: '80%', flexDirection: 'column'}}>
      <div>Random: {randomValue}</div>
      <ul 
        className="list list-wrapper">
        {
          alunos.map(aluno=>(
            <li className="list-item">Aluno: {aluno.nome} - {aluno.nota}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default MyComponent;



