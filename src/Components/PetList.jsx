import { useContext, useState } from "react";
import { PetsContext } from "../context/PetsContext";
import PetRow from "./petRow";
import SearchBar from "./SearchBar";
import { getAllPets } from "../services/main/pets";

function PetList() {

  const { pets, setPets, setRefresh } = useContext(PetsContext)

  async function onSearch(search) {
    if (search) {
      const filteredPets = pets.filter(pet => pet.name === search);

      setPets(filteredPets)
    } else {
      const allpets = await getAllPets()
      setPets(allpets);
    }
    setRefresh(true);
  }

  return (
    <>
      <SearchBar onSearch={onSearch}></SearchBar>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Breed</th>
            <th scope="col">DOB</th>
          </tr>
        </thead>
        <tbody>
          {
            pets.map((pet, index) => <PetRow key={index} pet={pet}></PetRow>)
          }
        </tbody>
      </table>
    </>
  );
}

export default PetList