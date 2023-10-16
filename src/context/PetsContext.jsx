import { createContext, useState } from "react";

const PetsContext = createContext();

function PetsProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [Refresh, setRefresh] = useState(false);

  function addPetToList(pet) {
    console.log(pet)
    if (pet.id) {
      const index = pets.findIndex(p => p.id === pet.id)
      const newPets = [...pets]
      newPets[index] = pet
      setPets(newPets)
      return
    }

    const newUser = { ...pet, id: pets.length + 1 }
    setPets([...pets, newUser])
    return
  }

  return (
    <PetsContext.Provider value={{ pets, setPets, addPetToList, selectedPet, setSelectedPet, Refresh, setRefresh }}>
      {children}
    </PetsContext.Provider>
  );


}

export { PetsContext, PetsProvider };