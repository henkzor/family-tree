import express from 'express';

const router = express.Router();

import { getAllPersons, getPersonsByTreeId, getPersonById, createNewPerson, updatePerson, deletePerson } from '../helpers/person.js';

router.get('/', async (req: any, res: any) => {
  try {
    const persons = await getAllPersons();
      res.json({ persons: persons });

  } catch (error) {
    throw(error);
  }
});

router.get('/personsByTreeId/:treeId', async (req: any, res: any) => {
  try {
    const persons = await getPersonsByTreeId(req.params.treeId);
      res.json({ persons: persons });

  } catch (error) {
    throw(error);
  }
});

router.get('/:personId', async (req: any, res: any) => {
  try {
    const person = await getPersonById(req.params.personId);
      res.json({ person: person });

  } catch (error) {
    throw(error);
  }
});

router.post('/', async (req: any, res: any) => {
  try {
    
    const data = req.body;
    console.log(data);
    const id = await createNewPerson(data);
      res.json({ id: id });

  } catch (error) {
    throw(error);
  }
});

router.patch('/:personId', async (req: any, res: any) => {
  try {
    const data = req.body;
    console.log(data);
    const id = await updatePerson(data, req.params.personId); 
      res.json({ id: id });

  } catch (error) {
    throw(error);
  }
});

router.delete('/:personId', async (req: any, res: any) => {
  try {
    console.log(req.params.personId);
    const id = await deletePerson(req.params.personId); 
      res.json({ id: id });
  } catch (error) {
    throw(error);
  }
});

export default router;