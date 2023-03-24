import React from 'react';
import '../../App.css'
import HeroSection from '../../components/homePage/HeroSection';
import Navbar from '../../components/homePage/Navbar';
import Footer from '../../components/homePage/Footer';

export default function Home (){
    return(
        <>
        <Navbar/>
        <HeroSection/>
        <Footer/>
        </>
    )
}
