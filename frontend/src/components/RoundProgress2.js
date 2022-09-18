import React from 'react'

function RoundProgress2({text, size,liked }) {

    const indicator = {
        width: `${size}px`,
        height: `${size}px`,
    }

    const indicatorTrack = {
        cx: `${size / 2}px`,
        cy: `${size / 2}px`,
        r: `${size / 2 - 5}px`,
        fill: 'transparent',
        strokeWidth: `${size / 100 }px`,
        stroke: 'rgb(139 92 246)'
    }
        
    return (
    <div className='lg:my-[15px] my-[5px]'>
            <svg style={indicator}>
                <circle style={indicatorTrack} />
                {liked ?
                    <svg height='3rem' width='3rem' x="25%" y="25%">
                        {text}
                    </svg> 

                    :
                    
                    <text x="50%" y="50%" textAnchor="middle" stroke="rgb(139 92 246)"
                        strokeWidth="1.8px" dy=".3em">#{text}</text>
                }
                
        </svg>
    </div>
    
    )
}


export default RoundProgress2