import { useContext } from 'react';

import noTreeImage from '../../assets/no-trees.png'
import Button from '../utilities/Button';
import { TreeContext } from "../../store/tree-context"

export default function NoTreeSelected() {
    const {startAddTreeHandler} = useContext(TreeContext)

    return (
        <div className="mt-24 text-center w-2/3">
            <img src={noTreeImage} alt="A big green tree" className='w-48 object-contain mx-auto' />
            <h2 className='text-xl font-bold text-stone-500 my-4'>No Tree Selected</h2>
            <p className='text-stone-400 mb-4'>Select a tree or get started with a new one</p>
            <p className='mt-8'>
                <Button onClick={startAddTreeHandler} buttonText="Create new tree" />
            </p>
        </div>
    )

}