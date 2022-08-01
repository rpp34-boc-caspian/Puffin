import React from 'react';
import { styled } from '@mui/material/styles';

import { colorMap } from '../theme';

interface ColorObj {
    color: string;
    index: number;
}

const colors = Object.values(colorMap);
const rowSize = 2;
/*
[
    ['#f44336', '#e91d63'],
    ...
]
 */
const colorsMatrix = colors.reduce((mtrx, color: string, index) => {
    const lastIndex = mtrx.length - 1;
    if (mtrx[lastIndex].length === rowSize) {
        mtrx.push([{ color, index }]);
    } else {
        mtrx[lastIndex].push({ color, index });
    }

    return mtrx;
}, [[]] as ColorObj[][]);

const Row = styled('div')`
    display: flex;
    flex-directions: row;
`;

const Color = styled('div')`
    width: 30px;
    height: 30px;
    margin: 2px;
`;

interface ColorPickerProps {
    selectColor: (index: number) => void;
    selected: number;
}

export const ColorPicker = ({ selectColor, selected }: ColorPickerProps) =>
    <div>
        {colorsMatrix.map((row) =>
            <Row>
                {row.map(({ color, index }) =>
                    <Color
                        style={{
                            backgroundColor: color,
                            border: index === selected ? `1px solid grey` : "",
                            boxShadow: index === selected ? `5px 5px 5px ${color}` : ""
                        }}
                        onClick={() => selectColor(index)}
                    />
                )}
            </Row>
        )}
    </div>