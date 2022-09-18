import React from 'react'
import styled, { keyframes } from 'styled-components';


function RoundProgress({ offset, percentage, size }) {
    const Animation = keyframes`
    100% {
        stroke-dashoffset: ${offset}px;
    }`;

    const indicator = {
        width: `${size}px`,
        height: `${size}px`,
    }

    const indicatorTrack = {
        cx: `${size / 2}px`,
        cy: `${size / 2}px`,
        r: `${size / 2 - 5}px`,
        fill: 'transparent',
        strokeWidth: `${size / 10 }px`,
        stroke: 'rgb(139 92 246)'
    }

        
    return (
    <div className='lg:my-[35px] my-[10px]'>
            <svg style={indicator}>
                <circle style={indicatorTrack} />
                <BallAnimation size={size}
                Animation={Animation}
                >
                </BallAnimation>
                <text x="50%" y="50%" textAnchor="middle" stroke="rgb(139 92 246)" strokeWidth="1.8px" dy=".3em">{percentage} %</text>
        </svg>
    </div>
    
    )
}

const BallAnimation = styled.circle`
    cx: ${props => props.size / 2}px;
    cy: ${props => props.size / 2}px;
    r: ${props => props.size / 2 - 5}px;
    fill: transparent;
    stroke-width: 11px;
    stroke: #1b1a20;
    stroke-dasharray: ${props => (props.size / 2-5) * 6.28}px;
    animation: ${props => props.Animation} 0.25s linear forwards;
`;

export default RoundProgress