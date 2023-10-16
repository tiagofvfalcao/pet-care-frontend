import { useContext, useEffect } from "react"
import { createOrUpdatePet, deletePet, getAllPets, getPetById } from "./services/main/pets"
import { Outlet, Link } from 'react-router-dom'

import { PetsContext } from "./context/PetsContext";
import './App.css'

function App() {

  const { setPets, Refresh } = useContext(PetsContext)

  useEffect(() => {
    //Permitir cancelar um pedido ao servidor
    const abortController = new AbortController();

    async function test() {
      const allPets = await getAllPets()

      console.log(allPets)
      setPets(allPets)
    }

    test()

    return () => {
      //Cancelar o pedido caso o componente seja desmontado
      abortController.abort();
    };
  }, [Refresh])


  return (
    <>
      <nav>
        <Link className="nav-item" to={"/pets"}>Pets Page</Link>
        <Link className="nav-item" to={"/pets/form"}>Pets Form</Link>
      </nav>
      <h1>React Exam: Pets </h1>

      <div className="mounted-page">
        <Outlet />
      </div>
    </>
  )
}

export default App
