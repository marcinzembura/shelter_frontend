import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import CalendarViewMonthOutlinedIcon from '@mui/icons-material/CalendarViewMonthOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';


export const SidebarAdminData = [

  {
    title: 'Zwierzęta',
    path: '/system/zwierzeta',
    icon: <PetsOutlinedIcon />,
    cName: 'sidebar-text'
  },
  {
    title: 'Pracownicy',
    path: '/system/pracownicy',
    icon: <EngineeringOutlinedIcon />,
    cName: 'sidebar-text'
  },
  {
    title: 'Spis zwierząt',
    path: '/system/zwierzeta/tabela',
    icon: <CalendarViewMonthOutlinedIcon/>,
    cName: 'sidebar-text'
  },
  {
    title: 'Własciciele',
    path: '/system/wlasciciel',
    icon: <BadgeOutlinedIcon/>,
    cName: 'sidebar-text'
  },
  {
    title: 'Historia medyczna',
    path: '/system/medyczna',
    icon: <MedicalServicesOutlinedIcon/>,
    cName: 'sidebar-text'
  },
  {
    title: 'Anomalia zwierząt',
    path: '/system/anomalia',
    icon: <LunchDiningOutlinedIcon/>,
    cName: 'sidebar-text'
  },
];