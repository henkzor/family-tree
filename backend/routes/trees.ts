import express from 'express';

const router = express.Router();

import {getAllTrees, getTreeById, createNewTree, updateTree, deleteTree} from '../helpers/tree.js';

router.get('/', async (req: any, res: any) => {
  try {
    const trees = await getAllTrees();
      res.json({ trees: trees });

  } catch (error) {
    throw(error);
  }
});

router.get('/:treeId', async (req: any, res: any) => {
  try {
    const tree = await getTreeById(req.params.treeId);
    res.json({ tree: tree });

  } catch (error) {
throw Error;
    // res.error({status: 404, ok: false, message: "No tree with that Id found"})
    // // res.status= 404;
    // // res.ok =false
    // // res.message="No tree with that Id found"
    // console.log("ho")
    // console.log(res)
  }
});


router.post('/', async (req: any, res: any) => {
  try {
    const data = req.body;
    const id = await createNewTree(data);
      res.json({ id: id });

  } catch (error) {
    throw(error);
  }
});

router.patch('/:treeId', async (req: any, res: any) => {
  try {
    const data = req.body;
    const id = await updateTree(data, req.params.treeId); 
      res.json({ id: id });

  } catch (error) {
    throw(error);
  }
});

router.delete('/:treeId', async (req: any, res: any) => {
  try {
    console.log(req.params.treeId);
    const id = await deleteTree(req.params.treeId); 
      res.json({ id: id });
  } catch (error) {
    throw(error);
  }
});

export default router;