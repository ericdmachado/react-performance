import Reach from 'react'

const Countdown = ({ value }) => {
  const boxStyle = {
    width: '80%',
    height: '100px',
    background: 'rgb(0 8 26 / 80%)',
    border: '3px solid rgba(0, 8, 26, 1)',
    color: '#FFF',
    fontFamily: 'arial',
    display: 'flex',
    align: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    margin: '2px auto 2px auto'
  }

  return (
    <div style={boxStyle}>
      <p style={{margin: 0}}>Tempo restante de sessão: {value}</p>
    </div>
  );
}

export default Countdown;