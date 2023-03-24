import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import authService from '../../services/auth-service';
import authHeader from '../../services/auth-header';
import { useNavigate } from "react-router-dom";
import { useDemoData } from '@mui/x-data-grid-generator';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CustomToolbar from './AnimalsToolbar';
import textDataGrid from '../TextDataGrid'
import animalService from '../../services/animal-service';


const columns = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', maxWidth: 60, flex: 1 },
    {
        field: 'name', headerName: 'Imię zwierzaka',editable: true, headerAlign: 'center', align: 'center', minWidth: 150, flex: 1,
    },
    { field: 'gender', headerName: 'Płeć', editable: true,headerAlign: 'center', align: 'center', flex: 1, },
    { field: 'typeOfAnimal', headerName: 'Rodzaj *', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
    {
        field: 'age', headerName: 'Wiek w latach', type: 'number', editable: true, headerAlign: 'center', align: 'center', flex: 1,
    },
    {
        field: 'weight', headerName: 'Waga w kg', type: 'number', editable: true, headerAlign: 'center', align: 'center', flex: 1,
    },
    { field: 'status', headerName: 'Status',  headerAlign: 'center', align: 'center', flex: 1, },
    { field: 'picture', headerName: 'Zdjęcie/URL', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'sector', headerName: 'Sektor/Boks', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'date', headerName: 'Data przybycia',  editable: true, headerAlign: 'center', align: 'center', flex: 1 },
    {
        field: "actions",
        headerName: "",
        width: 120,
        sortable: false,
        flex: 1,
        disableColumnMenu: true,
        disableExport: true,
        renderCell: (params) => {
            return (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <IconButton onClick={() => {
                         let flag=false;
                         console.log(params.row.gender);
                        //  else if (params.row.gender!='Samica'||params.row.gender!='Samiec') {
                        //     toast.error('Błędna płeć zwierzaka');
                        //     flag = true;
                        // }
                        // else if (params.row.typeOfAnimal!="Pies"||params.row.typeOfAnimal!="Kot"||params.row.typeOfAnimal!="Inny") {
                        //     toast.error('Błędny rodzaj zwierzaka (Pies/Kot/Inny)');
                        //     flag = true;
                        // }
                        // else if (params.row.status != 'W schronisku'||params.row.status != 'Adoptowany') {
                        //     toast.error('Błędny status');
                        //     flag = true;
                        // } 
                        if (params.row.id === "") {
                            toast.error('Błędne ID');
                            flag = true;
                        } else if (params.row.name==="") {
                            toast.error('Błędna imię zwierzaka');
                            flag = true;
                        } else if (params.row.gender==="") {
                            toast.error('Błędna płeć zwierzaka (Samiec/Samica)');
                            flag = true;
                        } else if (params.row.typeOfAnimal==="") {
                            toast.error('Błędny rodzaj zwierzaka (Pies/Kot/Inny)');
                            flag = true;
                        }else if (params.row.age<=0) {
                            toast.error('Błędny wiek');
                            flag = true;
                        }else if (params.row.weight<=0) {
                            console.log(params.row.weight);
                            toast.error('Błędna waga');
                            flag = true;
                        }else if (params.row.picture=== "") {
                            toast.error('Błęde zdjecię');
                            flag = true;
                        }else if (params.row.sector=== "") {
                            toast.error('Błędny sektor/boks');
                            flag = true;
                        } else if (params.row.date=== "") {
                            toast.error('Błędna data');
                            flag = true;
                        } 
                        else if (flag === false) {
                            if (params.row.status == 'W schronisku') {
                                animalService.updateAnimal(
                                    {
                                        id: params.row.id,
                                        name: params.row.name,
                                        gender: params.row.gender,
                                        typeOfAnimal: params.row.typeOfAnimal,
                                        age: params.row.age,
                                        weight: params.row.weight,
                                        status: true,
                                        picture: params.row.picture,
                                        sector: params.row.sector,
                                        date: params.row.date,
                                    }
                                ).then(responseStatus => {
                                    toast.success('Edytowane dane podopiecznego');
                                    window.location.reload(false);
                                }).catch(error => {
                                    console.log(error);
                                    toast.error('Nie edytowano danych');
                                }
                            );
                        }else if (params.row.status == 'Adoptowany') {
                            animalService.updateAnimal(
                                {
                                    id: params.row.id,
                                    name: params.row.name,
                                    gender: params.row.gender,
                                    typeOfAnimal: params.row.typeOfAnimal,
                                    age: params.row.age,
                                    weight: params.row.weight,
                                    status: false,
                                    picture: params.row.picture,
                                    sector: params.row.sector,
                                    date: params.row.date,
                                }
                            ).then(responseStatus => {
                                toast.success('Edytowane dane podopiecznego');
                                window.location.reload(false);
                            }).catch(error => {
                                console.log(error);
                                toast.error('Nie edytowano danych');
                            }

                            );
                        }
                    }}}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => {
                        animalService.deleteAnimal(params.id)
                            .then(res => {
                                toast.error('Usunięto zwierzaka z systemu');
                                window.location.reload(false);
                            })
                            .catch(err => {
                                console.log(err)
                                toast.error('Błąd systemu');
                            })


                    }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box >
            );
        }
    }
]

const displayStatus = (status) => {
    return status === true ? "W schronisku" : "Adoptowany";
}

const changeStatus = (animalsArray) => {
    animalsArray.forEach((animal) => {
        animal.status = displayStatus(animal.status);
    });
}

export default function AnimalsDataGrid() {

    const [pageSize, setPageSize] = React.useState(5);
    const [animalsArray, setAnimals] = useState([]);
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };


    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };


    useEffect(() => {
        if (authService.getCurrentUser() == undefined) {
            console.log('if1');//TODO dodac strone powiedzenia ze nie masz permisji
            navigate('/');
        }
        else if (authService.getCurrentUser().roles.at(0) === 'ROLE_ADMIN' ||
            authService.getCurrentUser().roles.at(0) === 'ROLE_EMPLOYEE') {
            animalService.getAnimals()
                .then((result) => {
                    changeStatus(result.data);
                    setAnimals(result.data);
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/system");
        }
    }, []);

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6,
    });



    return (
        <>

            <DataGrid
                sx={{
                    boxShadow: 3,
                    height: 700,
                    width: '70%',
                    justifyContent: 'center',
                    marginLeft: 30,
                    marginBottom: 10,
                }}
                loading={loading}
                components={{
                    Toolbar: CustomToolbar,
                }}
                rows={animalsArray}
                columns={columns}
                checkboxSelection
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 15, 25, 50]}
                pagination
                HorizontalAlignment="Stretch"
                HorizontalContentAlignment="Stretch"
                ColumnWidth="*"
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                localeText={textDataGrid}

            >
            </DataGrid>
        </>
    );
}

