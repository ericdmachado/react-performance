import { useContext } from 'react'
import InfoContext from '../context/InfoContext'

const SessionTime = () => {
  const { currentInfo } = useContext(InfoContext);

  const Countdown = ({ value }) => {
    const boxStyle = {
      width: '100%',
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
      margin: '0 0 20px 0'
    }
  
    return (
      <div style={boxStyle}>
        <p style={{margin: 0}}>Tempo restante de sessão: {value}</p>
      </div>
    );
  }  

  return (
    <div style={{border: '3px solid yellow', width: '100%', align: 'center'}}>
      <Countdown value={currentInfo?.countdown ?? 0} />
    </div>
  );
}

export default SessionTime;