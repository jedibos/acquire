import React from 'react';
import CompanyNames from './client/game/CompanyNames';
import Player from './client/game/Player';

export default function CompanyCreationOptions({
    addingCompany, chipId, gameBoard,
    createCompany, selectedCompany, selectCompanyToCreate}) {

    let createCompanyData = {
        player: new Player({id: 1, name: 'Brian'}),
        chipId,
        companyName: selectedCompany};

    let companyClassName = (companyName) => {
        return 'company-cards ' + companyName + (selectedCompany === companyName ? ' selected' : '')
    }

    return (
        <div className={addingCompany ? '' : 'hidden'}>
            <h2>Let's create a company</h2>
            <table>
                <tbody>
                <tr>
                    <td className={companyClassName(CompanyNames.Luxor)} onClick={() => selectCompanyToCreate(CompanyNames.Luxor)}>
                        <div>{CompanyNames.Luxor}</div>
                    </td>
                    <td className={companyClassName(CompanyNames.Towers)} onClick={() => selectCompanyToCreate(CompanyNames.Towers)}>
                        <div>{CompanyNames.Towers}</div>
                    </td>
                </tr>
                <tr>
                    <td className={companyClassName(CompanyNames.Festival)} onClick={() => selectCompanyToCreate(CompanyNames.Festival)}>
                        <div>{CompanyNames.Festival}</div>
                    </td>
                    <td className={companyClassName(CompanyNames.Worldwide)} onClick={() => selectCompanyToCreate(CompanyNames.Worldwide)}>
                        <div>{CompanyNames.Worldwide}</div>
                    </td>
                    <td className={companyClassName(CompanyNames.American)} onClick={() => selectCompanyToCreate(CompanyNames.American)}>
                        <div>{CompanyNames.American}</div>
                    </td>
                </tr>
                <tr>
                    <td className={companyClassName(CompanyNames.Contential)} onClick={() => selectCompanyToCreate(CompanyNames.Contential)}>
                        <div>{CompanyNames.Contential}</div>
                    </td>
                    <td className={companyClassName(CompanyNames.Imperial)} onClick={() => selectCompanyToCreate(CompanyNames.Imperial)}>
                        <div>{CompanyNames.Imperial}</div>
                    </td>
                </tr>
                </tbody>
            </table>
            <button onClick={() => createCompany(createCompanyData)}>Okay</button>
        </div>
    )
}