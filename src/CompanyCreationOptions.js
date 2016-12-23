import React from 'react';
import CompanyNames from './client/game/CompanyNames';
import Player from './client/game/Player';

export default function CompanyCreationOptions({addingCompany, chipId, gameBoard, createCompany}) {
    let clickHandler = createCompany.bind(this, {player: new Player({id: 1, name: 'Brian'}), chipId, companyName: CompanyNames.American});
    return (
        <div className={addingCompany ? '' : 'hidden'}>
            <h2>Let's create a company</h2>
            <button onClick={clickHandler}>Okay</button>
        </div>
    )
}