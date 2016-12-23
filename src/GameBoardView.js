import React from 'react';
import { rows, columns } from './client/game/Grid';
import GameBoardTileView from './GameBoardTileView';

export default function GameBoardView({gameBoard, placeChipOnBoard}) {
    return (
        <div className="board">
            <table>
                <tbody>
                    {rows.map(row => {
                        return (<tr key={`"row-${row}"`}>
                            {columns.map(col => {
                                return <GameBoardTileView key={`${row}-${col}`} gameBoard={gameBoard} row={row} col={col} placeChipOnBoard={placeChipOnBoard} />
                            })}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}