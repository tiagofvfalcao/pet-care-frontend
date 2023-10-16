import { useState, useEffect, useContext } from 'react';
import { PetsContext } from '../context/PetsContext';
import { Link, redirect, useParams } from 'react-router-dom';
import { createOrUpdatePet, getPetById } from '../services/main/pets';

function PetForm() {
  const { pet_id } = useParams();

  const { setRefresh } = useContext(PetsContext)

  // const { selectedPet, addPetToList } = useContext(PetsContext);
  const [pet, setPet] = useState({})

  // console.log(pet_id);

  useEffect(() => {
    //Permitir cancelar um pedido ao servidor
    const abortController = new AbortController();

    async function test() {
      const Pet = await getPetById(pet_id)
      setPet(Pet)
    }
    test()
    return () => {
      //Cancelar o pedido caso o componente seja desmontado
      abortController.abort();
    };
  }, []);

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setBreed(pet.breed);
      setDateOfBirth(pet.dateOfBirth);
    } else {
      setName('');
      setBreed('');
      setDateOfBirth('');
      setFormErrors({});
    }
  }, [pet]);


  async function handleSubmit(event) {
    event.preventDefault();

    const errors = {};
    if (!name) {
      errors.name = 'Please enter a name';
    }
    if (!breed) {
      errors.breed = 'Please enter an breed';
    }
    if (!dateOfBirth) {
      errors.DoB = 'Please select a Date Of Birth';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await createOrUpdatePet({
        id: pet_id ? pet_id : null,
        name: name,
        dateOfBirth: dateOfBirth,
        breed: breed
      })
    } catch (error) {
      alert(error);
    }

    setName('');
    setBreed('');
    setDateOfBirth('');
    setFormErrors({});

    setRefresh(true);

    return redirect(`/pets`);
  }

  return (

    <div>
      <form action="" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
          {formErrors.name && <div>{formErrors.name}</div>}
        </label>
        <br />
        <label>
          Breed:
          <input type="text" name="breed" value={breed} onChange={(event) => setBreed(event.target.value)} />
          {formErrors.breed && <div>{formErrors.breed}</div>}
        </label>
        <br />
        <label>
          Date Of Birth:
          <input type="date" name="DoB" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
          {formErrors.DoB && <div>{formErrors.DoB}</div>}
        </label>
        <br />
        <br />
          <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>

  );
}

export default PetForm;