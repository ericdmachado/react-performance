import { useState, useEffect } from 'react'

const Search = () => {
  const [textSearch, setTextSearch] = useState(null);
  const [datamock, setDatamock] = useState(JSON.parse(sessionStorage.getItem('datamock')) ?? []);

  const handleChange = async ( e ) => {
    setTextSearch(e.target.value);
  }

  const mediaGeral = datamock.length ? Number(datamock.reduce((a,b)=>a+b.nota, 0) / datamock.length).toFixed(1) : '0.0';

  const totalFilterResults = datamock.filter(item=>item.email.match(new RegExp(textSearch ?? '', 'gi'))).length;

  const searchStyle = {
    backgroundColor: 'rgba(200,200,200,0.4)',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px'
  }

  useEffect(()=>{
    if(!datamock.length) {
      //fetch('https://urchin-app-6ghoh.ondigitalocean.app/?q=5000').then((response)=>{
      fetch('https://urchin-app-6ghoh.ondigitalocean.app/').then((response)=>{
        if(!response.ok) throw new Error('erro ao buscar os dados');
        return response.json();
      })
      .then((json)=>{
        sessionStorage.setItem('datamock', JSON.stringify(json)); 
        setDatamock(json);
      });
    }
  }, []);

  return (
    <div style={searchStyle}>
      <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', width: '100%'}}>
        <h1 style={{width: '100%'}}>Alunos - Média Geral: {mediaGeral}</h1>
        <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', width: '100%'}}>
          <input
            style={{margin: '0 0 0 10px', height: '32px', width: '200px'}}
            type="text"
            placeholder='Procurar e-mail'
            defaultValue={textSearch}
            onChange={ handleChange }
          />
          <p style={{paddingLeft: '6px'}}>Items in list: {totalFilterResults}</p>
        </div>
      </div>
      <ul 
        style={{
          height: 'auto',
          width: '100%',
          overflow: 'auto',
          background: '#ccc',
          display: 'flex',
          flexWrap:'wrap',
          alignContent: 'start',
          margin: '0 0 5px 0',
          paddingTop: '6px',
          paddingBottom: '6px'
        }}>
        <li style={{display: 'flex', width: '100%', height: '20px', maxHeight: '20px'}}>
          <div style={{width: '38px'}}>ID</div>
          <div style={{width: '160px'}}>Nome</div>
          <div style={{flex: '1 1 auto'}}>E-mal</div>
          <div style={{width: '60px', overflow: 'hidden'}}>Nota</div>
        </li>
      </ul>
      <ul 
        className={ textSearch===null && !datamock.length ? 'loading':'' }
        style={{
          height: '300px',
          width: '100%',
          overflow: 'auto',
          display: 'flex',
          flexWrap:'wrap',
          alignContent: 'start'
        }}>
        {
          datamock.filter(item=>item.email.match(new RegExp(textSearch ?? '', 'gi'))).map(item=>(
            <li style={{display: 'flex', width: '100%', maxHeight: '20px'}}>
              <div style={{width: '38px'}}>{ item.id }</div>
              <div style={{width: '160px'}}>{ item.nome } { item.sobrenome }</div>
              <div style={{flex: '1 1 auto'}}>{ item.email }</div>
              <div style={{width: '40px', overflow: 'hidden'}}>{ item.nota.toFixed(1) }</div>
            </li>
          ))
        }
      </ul>
      
    </div>
  )
}

export default Search;

/*
{
  "id": 1,
  "nome": "Noelle",
  "sobrenome": "Huber",
  "email": "noellehuber@atomica.com",
  "sexo": "female",
  "guid": "bd11cd79-0e21-4f6a-a5e1-54257d66c31e",
  "nota": 6.4,
  "isActive": false
}
*/