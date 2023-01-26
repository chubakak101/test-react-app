import { useState, useEffect } from 'react';
    import VehiculeItem from './Vehicule';
    import './App.css';
    
    function App() {
      const [vehicules, setVehicules] = useState([]);
      const [newVehicule, setNewVehicule] = useState("");
    
      useEffect(() => {
        // update update the list of vehicules
        // when the component is rendered for the first time
        update();
      }, []);
    
      // This function updates the component with the
      // current vehicule data stored in the server
      function update() {
        fetch(`${process.env.REACT_APP_BACKEND}api/vehicules`)
          .then(res => res.json())
          .then(vehicule => {
            setVehicules(vehicule.data);
          })
      }
    
      // This function sends a new vehicule to the server
      // and then call the update method to update the
      // component
      function addVehicule(e) {
        e.preventDefault();
        let name = newVehicule;
        let body = {
          data: {
            name
          }
        };
     
        fetch(`${process.env.REACT_APP_BACKEND}api/vehicules`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(() => {
            setNewVehicule("");
            update();
          })
      }
    
      return (
        <div className="app">
          <main>
            {/* we centered the "main" tag in our style sheet*/}
    
            {/* This form collects the name we want to add to our vehicule, and sends it to the server */}
            <form className="form" onSubmit={addVehicule}>
              <input type="text" className="vehicule_input" placeholder="Enter new vehicule" value={newVehicule} onChange={e => setNewVehicule(e.currentTarget.value) }/>
              <button type="submit" className="vehicule_button">Add Vehicule</button>
            </form>
    
            {/* This is a list view of all the vehicules in the "vehicule" state variable */}
            <div>
              {
                vehicules.map((vehicule, i) => {
                  return <VehiculeItem vehicule={vehicule} key={i} update={update} />
                })
              }
            </div>
    
          </main>
        </div>
      )
    }
    export default App;