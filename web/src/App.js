import React, { useEffect, useState } from 'react';
import api from './service/api';

import './Global.css';
import './App.css'
import './Sidebar.css'
import './Main.css';

function App() {
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
  })

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

        <li className="dev-item">
          <header>
            <img src="https://avatars2.githubusercontent.com/u/39386199?s=460&v=4"/>
            <div className="user-info">
              <strong>Evandro Ignácio</strong>
              <span>html, javaScript, Java</span>
            </div>
          </header>
          <p>O Fabuloso Gerador de Lero-lero v2.0 é capaz de gerar qualquer</p>
          <a href="https://github.com/evignacio">Acessa perfil no GitHub</a>
        </li>
        
        <li className="dev-item">
          <header>
            <img src="https://avatars2.githubusercontent.com/u/39386199?s=460&v=4"/>
            <div className="user-info">
              <strong>Evandro Ignácio</strong>
              <span>html, javaScript, Java</span>
            </div>
          </header>
          <p>O Fabuloso Gerador de Lero-lero v2.0 é capaz de gerar qualquer</p>
          <a href="https://github.com/evignacio">Acessa perfil no GitHub</a>
        </li>

        <li className="dev-item">
          <header>
            <img src="https://avatars2.githubusercontent.com/u/39386199?s=460&v=4"/>
            <div className="user-info">
              <strong>Evandro Ignácio</strong>
              <span>html, javaScript, Java</span>
            </div>
          </header>
          <p>O Fabuloso Gerador de Lero-lero v2.0 é capaz de gerar qualquer</p>
          <a href="https://github.com/evignacio">Acessa perfil no GitHub</a>
        </li>

        <li className="dev-item">
          <header>
            <img src="https://avatars2.githubusercontent.com/u/39386199?s=460&v=4"/>
            <div className="user-info">
              <strong>Evandro Ignácio</strong>
              <span>html, javaScript, Java</span>
            </div>
          </header>
          <p>O Fabuloso Gerador de Lero-lero v2.0 é capaz de gerar qualquer</p>
          <a href="https://github.com/evignacio">Acessa perfil no GitHub</a>
        </li>

      </ul>
    </main>
  </div>
}

export default App;
