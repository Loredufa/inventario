import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';




export default function LandingPage() {    
    return (
    <>
        <div >
           <h1>Control de stock</h1>
            <Link to='/home'>
                <button>Lets Go In!</button>
            </Link>
        </div>
    </>
    )
}
