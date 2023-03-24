import SideBar from "../../components/sidebar/SideBar"
import AnimalsComponent from "../../components/animals/AnimalsComponent"
import { ThemeProvider, Typography } from '@mui/material';
import theme from '../../components/style/theme';
import {CssBaseline} from '@mui/material';
import AnimalsToolbar from "../../components/animals/AnimalsToolbar";

export default function Animals() {
    return (
        <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <SideBar/>
        <AnimalsToolbar/>
        <AnimalsComponent/>
        </ThemeProvider>
        </>)
}
