import React, { useEffect, useState } from 'react';
import api from '../../service/api';

import Loader from'../loader/Loader';

import './App.css'
import '../../common/css/Global.css';
import '../../common/css/Sidebar.css'
import '../../common/css/Main.css';

function App() {
  const [load, setLoad] = useState(true);

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
      setTimeout(() => {
        setDevs(response.data);
        setLoad(false);
      }, 3000);  
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

  function removeDev(event) {
    let li = event.target.parentNode;
    li.remove();
  }


  return <div id="app">
    { load && <Loader /> }
    { !load && 
      <>
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
                <a href="#" class="button-exit" onClick={e => removeDev(e)}>x</a>
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
      </>
    }
  </div>
}

export default App;
