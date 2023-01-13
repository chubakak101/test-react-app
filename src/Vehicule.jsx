import { useState } from "react";
import './App.css';

function VehiculeItem({ vehicule, update }) {
 
  // Our component uses the "edit" state
  // variable to switch between editing
  // and viewing the vehicule name
  const [edit, setEdit] = useState(false);
  const [newVehicule, setNewVehicule] = useState("");

  // This function changes the to-do that
  // is rendered in this component.
  // This function is called when the
  // form to change a vehicule is submitted
  function changeVehicule(e) {
    e.preventDefault();
    let name = newVehicule;
    let pos = vehicule.id;
    let body = {
      data: {
        name
      }
    };

    fetch(`${process.env.REACT_APP_BACKEND}api/vehicules/${pos}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        setEdit(false);
        update();
      })
  }

  // This function deletes the to-do that
  // is rendered in this component.
  // This function is called when the
  // form to delete a vehicule is submitted
  function deleteVehicule(e) {
    e.preventDefault();
    let pos = vehicule.id;
 
    fetch(`${process.env.REACT_APP_BACKEND}api/vehicules/${pos}`, {
      method: "DELETE"
    })
      .then(() => {
        update();
      })
  }

  return <div className="vehicule">
    {/*
      The below toggles between two components
      depending on the current value of the "edit"
      state variable
    */}
    { !edit
        ? <div className="name">{vehicule.attributes.name}</div>
        : <form onSubmit={changeVehicule}>
            <input className="vehicule_input" type="text" placeholder="Enter new vehicule" value={newVehicule} onChange={e => setNewVehicule(e.currentTarget.value)} />
            <button className="vehicule_button" type="submit">Change Vehicule</button>
          </form>
    }
    <div>
      <button className="delete" onClick={deleteVehicule}>delete</button>
      <button className="edit" onClick={() => {
        // this button toggles the "edit" state variable
        setEdit(!edit)

        // we add this snippet below to make sure that our "input"
        // for editing is the same as the one for the component when
        // it is toggled. This allows anyone using it to see the current
        // value in the element, so they don't have to write it again
        setNewVehicule(vehicule.attributes.name)
      }}>edit</button>
    </div>
  </div>
}

export default VehiculeItem;