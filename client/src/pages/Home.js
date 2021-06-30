import React from 'react'
import businessLogos from '../components/Carousel/businesslogos'
import Funavatar from '../components/Funavatar';
import funLogos from '../components/Carousel/funlogos';

const avatars = businessLogos;
const avatars2 = funLogos;
const Home = () => {
    return (
        <div>
            This is Home page
            <Funavatar avatars={avatars}/>
            <Funavatar avatars={funLogos}/>
        </div>
    )
}

export default Home
