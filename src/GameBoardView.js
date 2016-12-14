import React from 'react';
//import GameBoard from './client/game/GameBoard';
import { rows, columns } from './client/game/Grid';

export default class GameBoardView extends React.Component {
    render() {
        return (
            <div className="board">
                <table>
                    <tbody>
                        {rows.map(row => {
                            return (<tr key={`"row-${row}"`}>
                                {columns.map(col => {
                                    return (
                                        <td key={`"cell-${row}${col}"`}>
                                            <div className="empty">
                                                <div>{`${col}${row}`}</div>
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}