import React from 'react';

export default function GameBoardTileView({gameBoard, row, col, placeChipOnBoard}) {
    let chipId = `${col}${row}`;
    let clickHandler = placeChipOnBoard.bind(this, chipId);

    return (
        <td key={`"cell-${row}${col}"`} onClick={clickHandler}>
            <div className={gameBoard.isChipOnBoard(chipId) ? 'tile': 'empty'}>
                <div>{chipId}</div>
            </div>
        </td>
    )
}