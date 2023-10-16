import { useContext } from 'react';
import { PetsContext } from "../context/PetsContext";
import { createOrUpdatePet, deletePet, getAllPets, getPetById } from "../services/main/pets"
import { Link } from 'react-router-dom';

function PetRow({ pet }) {

  const {setRefresh} = useContext(PetsContext)

  async function handleClick() {
    // console.log(pet.id);
    await deletePet(pet.id)
    setRefresh(true);
  }

  return (
    <tr >
      <td className=""><Link to={`/pets/details/${pet.id}`}>{pet.name}</Link></td>
      <td className="">{pet.breed}</td>
      <td className="">{pet.dateOfBirth}</td>
      <button onClick={handleClick} className="btn btn-primary">Delete</button>
    </tr>
  );
}

export default PetRow;