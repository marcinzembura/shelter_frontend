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
import CustomToolbar from './MedicalCardToolbar';
import textDataGrid from '../TextDataGrid'
import medicalCardService from '../../services/medicalCard-service';



const columns = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', maxWidth: 60, flex: 1 },
    {
        field: 'animal', headerName: 'Zwierzę', headerAlign: 'center', align: 'center', minWidth: 100, flex: 1,
        valueGetter: (accountArray) => accountArray.row.animal.id + " - " + accountArray.row.animal.name
    },
    {
        field: 'doctor', headerName: 'Lekarz', headerAlign: 'center', editable: true, align: 'center', minWidth: 90, flex: 1,

    },
    { field: 'date', headerName: 'Data',  headerAlign: 'center', align: 'center', editable: true, flex: 1 },
    { field: 'nameOfDisease', headerName: 'Choroba', headerAlign: 'center', align: 'center', editable: true, flex: 1 },
    { field: 'description', headerName: 'Opis', headerAlign: 'center', align: 'center', editable: true, minWidth: 290, flex: 1, minWidth: 300, },
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
                        let flag = false;
                        if (params.row.id === "" || params.row.id === undefined) {
                            toast.error('Błędne ID');
                            flag = true;
                        } else if (params.row.animal.id === "" || params.row.animal.id === undefined) {
                            toast.error('Błędne ID podopiecznego');
                            flag = true;
                        } else if (params.row.doctor === "" || params.row.doctor === undefined || params.row.doctor === null) {
                            toast.error('Brak danych doktora');
                            flag = true;
                        } else if (params.row.nameOfDisease === "" || params.row.nameOfDisease === undefined) {
                            toast.error('Wypełnij nazwe choroby');
                            flag = true;
                        } else if (params.row.description === "" || params.row.description === undefined) {
                            toast.error('Błędna opisu choroby');
                            flag = true;
                        } else if (params.row.date === "" || params.row.date === undefined) {
                            toast.error('Błędna data');
                            flag = true;
                        } else if (flag === false) {
                            medicalCardService.updateMedicalCard({
                                id: params.row.id,
                                doctor: params.row.doctor,
                                date: params.row.date,
                                nameOfDisease: params.row.nameOfDisease,
                                description: params.row.description,
                                animal: {
                                    id: params.row.animal.id
                                }
                            })
                                .then(responseStatus => {
                                    console.log(responseStatus);
                                    toast.success('Edytowano historię medyczną');
                                    window.location.reload(false);

                                }).catch(error => {
                                    console.error(error.response.data);
                                    toast.error('Nie edytowano historii medycznej');
                                }
                                );
                        }
                    }}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => {
                        medicalCardService.deleteMedicalCard(params.id)
                            .then(res => {
                                toast.error('Usunięto historię medyczną');
                                window.location.reload(false);
                            })
                            .catch(err => {
                                console.log(err);
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


export default function OwnersComponent() {

    const [pageSize, setPageSize] = React.useState(5);
    const [medicalCardArray, setMedicalCard] = useState([]);
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
            navigate('/');
        }
        else if (authService.getCurrentUser().roles.at(0) === 'ROLE_ADMIN' ||
            authService.getCurrentUser().roles.at(0) === 'ROLE_EMPLOYEE') {
            medicalCardService.getMedicalCards()
                .then((result) => {
                    setMedicalCard(result.data);
                    console.log('sialala');
                    console.log(medicalCardArray)
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/");
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
                loading={loading} components={{
                    Toolbar: CustomToolbar,
                }}
                rows={medicalCardArray}
                columns={columns}
                checkboxSelection
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
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

