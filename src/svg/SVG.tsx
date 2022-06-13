import React from 'react';

const SVG = () => {

    const preparePath = (): string => {

        const x = 100;
        const y = 150;
        const multiplier = 5;
        let d = [`M ${x} ${y}`];
        let data = [
            [1, 3],
            [2, 5],
            [3, 2],
            [4, 16],
            [18, 5]
        ]

        let collector = data.map((chunk) => {
            let xNext = x + chunk[0] * multiplier;
            let yNext = y - chunk[1] * multiplier;
            return `L ${xNext} ${yNext}`;
        })

        return d.concat(collector).join(' ');
    }

    return (
        <path
            d={preparePath()}
            stroke="black"
            strokeWidth={1}
            fill="none"/>
    );
};

export default SVG;