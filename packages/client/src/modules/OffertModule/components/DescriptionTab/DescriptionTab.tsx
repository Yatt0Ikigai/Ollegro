import React from 'react'

export function DescriptionTab() {
  return (
    <div className='white-box'>
        <h4 className='header header-xl'>
          Description
        </h4>
        <span className='util-whitespace-preline'>
          {description}
        </span>
    </div>
  )
}

const description = `Interesting toy features

The switch that activates the toy is located on the back of the duck. After switching it to the left, we start the music mode , in which we can turn on various cheerful melodies, sounds and interesting noises.

In turn, by switching the switch to the right, we go to the melodies module, during which the duck additionally starts to move forward charmingly rocking from side to side, just like a real animal!

A charming, multi-colored toy will certainly interest every toddler.

If we do not turn on any button for a long time, the duck will start launching cheerful melodies and snoring sounds every few seconds , reminding you of yourself and inviting you to play!`