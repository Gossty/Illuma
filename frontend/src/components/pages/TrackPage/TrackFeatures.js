import React from 'react'
import RoundProgress from '../../RoundProgress';

function TrackFeatures(props) {


  const trackFeatures = props.trackFeatures;
  if (trackFeatures != undefined) {
    let circLength = props.windowDimensions.width >= 450 ? 283 : 204;
    const acousticness = - parseFloat(trackFeatures.acousticness) / 1 * circLength;
    const acousticnessPercentage = parseInt(parseFloat(trackFeatures.acousticness) / 1 * 100);

    const energy = - parseFloat(trackFeatures.energy) / 1 * circLength;
    const energyPercentage = parseInt(parseFloat(trackFeatures.energy) / 1 * 100);

    const danceability = - parseFloat(trackFeatures.danceability) / 1 * circLength;
    const danceabilityPercentage = parseInt(parseFloat(trackFeatures.danceability) / 1 * 100);
    
    const instrumentalness = - parseFloat(trackFeatures.instrumentalness) / 1 * circLength;
    const instrumentalnessPercentage = parseInt(parseFloat(trackFeatures.instrumentalness) / 1 * 100)

    const liveness = - parseFloat(trackFeatures.liveness) / 1 * circLength;
    const livenessPercentage = parseInt(parseFloat(trackFeatures.liveness) / 1 * 100);

    const valence = - parseFloat(trackFeatures.valence) / 1 * circLength;
    const valencePercentage = parseInt(parseFloat(trackFeatures.valence) / 1 * 100);

    const speechiness = - parseFloat(trackFeatures.speechiness) / 1 * circLength;
    const speechinessPercentage = parseInt(parseFloat(trackFeatures.speechiness) / 1 * 100);

    const loudness = parseFloat(trackFeatures.loudness) / 60 * circLength;
    const loudnessPercentage = parseInt(parseFloat(trackFeatures.loudness) / 60 * 100);
    
    if (props.windowDimensions.width >= 450) {

      const widget = {
        width: '200px',
        height: '200px',
        borderRadius: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'rgb(139 92 246)',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
      }

      return (
      <div className='m-5 bg-blakish-600 rounded-2xl'>
        
        <p className='text-3xl font-bold p-5'>Track Features</p>
          <div className='flex overflow-x-auto overflow-y-hidden'>

            <div style={widget} className=" lg:min-w-[200px] min-w-[150px] hover:scale-[1.05]">
              <p className=' lg:text-2xl text-lg font-bold lg:w-[200px] w-[150px] '>Acousticness</p>
                  <div className='flex items-center justify-center'>
                <RoundProgress offset={acousticness}
                  percentage={acousticnessPercentage}
                  size={100}
                />
                </div>
            </div>

            <div style={widget} className=" lg:min-w-[200px] min-w-[150px] hover:scale-[1.05]">
              <p className=' lg:text-2xl text-lg font-bold lg:w-[200px] w-[150px] '>Energy</p>
                  <div className='flex items-center justify-center'>
                <RoundProgress offset={energy}
                  percentage={energyPercentage}
                  size={100}
                  
                />
                </div>
            </div>

            <div style={widget} className=" lg:min-w-[200px] min-w-[150px] hover:scale-[1.05]">
              <p className=' lg:text-2xl text-lg font-bold lg:w-[200px] w-[150px] '>Danceability</p>
                  <div className='flex items-center justify-center'>
                <RoundProgress offset={danceability}
                  percentage={danceabilityPercentage}
                  size={100}
                />
                </div>
            </div>


            <div style={widget} className=" lg:min-w-[200px] min-w-[150px] hover:scale-[1.05]">
              <p className=' lg:text-2xl text-lg font-bold lg:w-[200px] w-[150px] '>Instrumentalness</p>
                  <div className='flex items-center justify-center'>
                <RoundProgress offset={instrumentalness}
                  percentage={instrumentalnessPercentage}
                  size={100}
                />
                </div>
            </div>

            <div style={widget} className=" lg:min-w-[200px] min-w-[150px] hover:scale-[1.05]">
              <p className=' lg:text-2xl text-lg font-bold lg:w-[200px] w-[150px] '>Liveness</p>
                  <div className='flex items-center justify-center'>
                <RoundProgress offset={liveness}
                  percentage={livenessPercentage}
                  size={100}
                />
                </div>
            </div>

            <div style={widget} className=" lg:min-w-[200px] min-w-[150px] hover:scale-[1.05]">
              <p className=' lg:text-2xl text-lg font-bold lg:w-[200px] w-[150px] '>Valence</p>
                  <div className='flex items-center justify-center'>
                <RoundProgress offset={valence}
                  percentage={valencePercentage}
                  size={100}
                />
                  </div>
            </div>

            <div style={widget} className=" lg:min-w-[200px] min-w-[150px] hover:scale-[1.05]">
              <p className=' lg:text-2xl text-lg font-bold lg:w-[200px] w-[150px] '>Speechiness</p>
                  <div className='flex items-center justify-center'>
                <RoundProgress offset={speechiness}
                  percentage={speechinessPercentage}
                  size={100}
                />
                </div>
            </div>

            <div style={widget} className=" lg:min-w-[200px] min-w-[150px] hover:scale-[1.05]">
              <p className=' lg:text-2xl text-lg font-bold lg:w-[200px] w-[150px] '>Loudness</p>
                  <div className='flex items-center justify-center'>
                <RoundProgress offset={loudness}
                  percentage={loudnessPercentage}
                  size={100}
                />
                </div>
            </div>

          </div>
        </div>)
    }
    
    else {
      
      const widget = {
        width: '150px',
        height: '150px',
        borderRadius: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'rgb(139 92 246)',
      }
      return (
        <div className='m-5 bg-blakish-600 rounded-2xl'>
          
          <p className='text-3xl font-bold p-5'>Track Features</p>

            <div className='flex overflow-x-auto overflow-y-hidden'>
    
              <div style={widget} className="min-w-[150px] hover:scale-[1.05]">
                <p className='text-lg font-bold w-[150px] '>Acousticness</p>
                    <div className='flex items-center justify-center'>
                  <RoundProgress offset={acousticness}
                  percentage={acousticnessPercentage}
                  size={75}
                
                />
                  </div>
              </div>
    
              <div style={widget} className=" min-w-[150px] hover:scale-[1.05]">
                <p className='text-lg font-bold w-[150px] '>Energy</p>
                    <div className='flex items-center justify-center'>
                  <RoundProgress offset={energy}
                  percentage={energyPercentage}
                  size={75}
                  
                  />
                  </div>
              </div>
            </div>

          <div className='flex overflow-x-auto overflow-y-hidden'>
              <div style={widget} className=" min-w-[150px] hover:scale-[1.05]">
                <p className='text-lg font-bold w-[150px] '>Danceability</p>
                    <div className='flex items-center justify-center'>
                  <RoundProgress offset={danceability}
                  percentage={danceabilityPercentage}
                  size={75}
                  
                  />
                  </div>
              </div>
    
              <div style={widget} className=" min-w-[150px] hover:scale-[1.05]">
                <p className='text-lg font-bold w-[150px] '>Instrumentalness</p>
                    <div className='flex items-center justify-center'>
                  <RoundProgress offset={instrumentalness}
                                percentage={instrumentalnessPercentage}
                                size={75}
                  />
                  </div>
              </div>
          </div>

          <div className='flex overflow-x-auto overflow-y-hidden'>
              <div style={widget} className=" min-w-[150px] hover:scale-[1.05]">
                <p className='text-lg font-bold w-[150px] '>Liveness</p>
                    <div className='flex items-center justify-center'>
                  <RoundProgress offset={liveness}
                  percentage={livenessPercentage}
                  size={75}
                  
                  />
                  </div>
              </div>
    
              <div style={widget} className=" min-w-[150px] hover:scale-[1.05]">
                <p className='text-lg font-bold w-[150px] '>Valence</p>
                    <div className='flex items-center justify-center'>
                  <RoundProgress offset={valence}
                                percentage={valencePercentage}
                                size={75}
                  />
                  </div>
              </div>
          </div>

          <div className='flex overflow-x-auto overflow-y-hidden'>
              <div style={widget} className=" min-w-[150px] hover:scale-[1.05]">
                <p className='text-lg font-bold w-[150px] '>Speechiness</p>
                    <div className='flex items-center justify-center'>
                  <RoundProgress offset={speechiness}
                  percentage={speechinessPercentage}
                  size={75}
                  
                  />
                  </div>
              </div>
    
              <div style={widget} className=" min-w-[150px] hover:scale-[1.05]">
                <p className='text-lg font-bold w-[150px] '>Loudness</p>
                    <div className='flex items-center justify-center'>
                  <RoundProgress offset={loudness}
                                percentage={loudnessPercentage}
                                size={75}
                  />
                  </div>
              </div>
          </div>
            
          
          </div>)
    }
  }
    
  return (
    ""
  )
}

export default TrackFeatures


// "loudness": -3.74,
// "speechiness": 0.0808,
// "time_signature": 4
