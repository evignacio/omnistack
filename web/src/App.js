import React, { useEffect, useState } from 'react';
import api from './service/api';

import './Global.css';
import './App.css'
import './Sidebar.css'
import './Main.css';

function App() {

  const [devs, setDevs] = useState([]);

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubUserName] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
       const { latitude, longitude} = position.coords;

       setLongitude(longitude);
       setLatitude(latitude);
      },
      (error) => {
        console.log(error.message);
      }
    )
  }, [])

  useEffect(() => {
    async function loasDevs() {
      const response = await api.get('/dev');
      setDevs(response.data);
      console.log(response.data);
    }
    loasDevs();
  }, []);

  async function handleAddDev(event) {
    event.preventDefault();
    
    try {
      await api.post('/dev', {
        github_username,
        techs,
        latitude,
        longitude
      });
      alert('usuário salvo com sucesso');  
    } catch(error) {
      alert(error);
    }
    setGithubUserName('');
    setTechs('');
    setLatitude('');
    setLongitude('');
  }


  return <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <form>
        <div className="input-block">
          <label htmlFor="">Usuário do Github</label>
          <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithubUserName(e.target.value)}/>
        </div>

        <div className="input-block">
          <label htmlFor="">Tecnologias</label>
          <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}/>
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="">Latitude</label>
            <input name="latitude" id="latitude" required type="number" value={latitude} onChange={e => setLatitude(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="">Longitude</label>
            <input name="longitude" id="longitude" required type="number" value={longitude} onChange={e => setLongitude(e.target.value)} />
          </div>
        </div>

        <button type="submit" onClick={e => handleAddDev(e)} >Salvar</button>
      </form>
    </aside>
    <main>
      <ul>
        {devs.map( dev => ( 
          <li className="dev-item">
          <header>
            <img src={dev.avatar_url}/>
            <div className="user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
          </header>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`}>Acessa perfil no GitHub</a>
        </li>
        ))}
      </ul>
    </main>
  </div>
}

export default App;
