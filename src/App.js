import React, {useState, useEffect} from 'react';
import Formulario from './component/Formulario';
import Cita from './component/Cita';

function App() {
  
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, setCitas] = useState(citasIniciales);

  const crearCitas = cita => {
    const nuevasCitas = [...citas, cita];
    setCitas(nuevasCitas);
  }

  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    setCitas(nuevasCitas);
  }

  useEffect(
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'));
      if (citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas));
      } else {
        localStorage.setItem('citas', JSON.stringify([]));
      }
    }, [citas]
  );

  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administrar citas' ;
  
  return (
    <>
      <h1>Adminstrator of pacients</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCitas={crearCitas} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
