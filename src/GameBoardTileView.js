import React from 'react';

export default function GameBoardTileView({gameBoard, row, col, placeChipOnBoard}) {
    let chipId = `${col}${row}`;
    let className = (gameBoard.isChipOnBoard(chipId) ? 'tile' : 'empty') + ' ' + gameBoard.getCompanyName(chipId);

    return (
        <td key={`"cell-${row}${col}"`} onClick={() => placeChipOnBoard(chipId)}>
            <div className={className}>
                <div>{chipId}</div>
            </div>
        </td>
    )
}