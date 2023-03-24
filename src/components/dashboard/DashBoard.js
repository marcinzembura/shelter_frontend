
import React from 'react';
import NowInSchelter from './NowInSchelter';
import Adopted from './Adopted';
import TypeOfAnimal from './TypeOfAnimal';
import { Box} from '@mui/material';
import Males from './Males';
import Females from './Females';
import Older from './Older';
import Dogs from './Dogs';
import Cats from './Cats';
import Others from './Others';

export default function DashBoard() {

    const containerRef = React.useRef(null);

    return (
        <>

            <Box
                component="polygon"
                sx={{
                    marginLeft: 30,
                    marginTop: 10,
                    marginBottom: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-around',
                }}>
                <NowInSchelter />
                <Adopted />
                <TypeOfAnimal />
            </Box>
            <Box
                component="polygon"
                sx={{
                    marginLeft: 30,
                    marginBottom: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-around',
                }}>
                <Males/>
                <Females/>
                <Older/>
            </Box>
            <Box
                component="polygon"
                sx={{
                    marginLeft: 30,
                    marginBottom: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-around',
                }}>
                <Dogs/>
                <Cats/>
                <Others/>
            </Box>
            
        </>
    )
}
