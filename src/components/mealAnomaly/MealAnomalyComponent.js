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
import CustomToolbar from './MealAnomalyToolbar';
import textDataGrid from '../TextDataGrid'
import mealAnomalyService from '../../services/mealAnomaly-service';


const columns = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', maxWidth: 60, flex: 1 },
    {
        field: 'animal', headerName: 'Zwierzę', headerAlign: 'center', align: 'center', minWidth: 90, flex: 1,
        valueGetter: (accountArray) => accountArray.row.animal.id + " - " + accountArray.row.animal.name
    },
    { field: 'date', headerName: 'Data', headerAlign: 'center', align: 'center', editable: true, flex: 1 },
    {
        field: 'name', headerName: 'Nazwa', headerAlign: 'center', editable: true, align: 'center', minWidth: 90, flex: 1,

    },
    { field: 'description', headerName: 'Opis', headerAlign: 'center', align: 'center', editable: true, flex: 1, minWidth: 340, },
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
                        if (params.row.id === ""||params.row.id===undefined) {
                            toast.error('Błędne ID');
                            flag = true;
                        } else if (params.row.animal.id === ""||params.row.animal.id===undefined) {
                            toast.error('Błędne ID podopiecznego');
                            flag = true;
                        } else if (params.row.name === ""||params.row.name===undefined||params.row.name===null) {
                            toast.error('Błędne nazwa anomalii');
                            flag = true;
                        } else if (params.row.date === ""||params.row.date === undefined) {
                            toast.error('Błędna data');
                            flag = true;
                        } else if (flag === false) {
                            mealAnomalyService.updateMealAnomaly({
                                id: params.row.id,
                                name: params.row.name,
                                description: params.row.description,
                                date: params.row.date,
                                animal: {
                                    id: params.row.animal.id
                                }
                            })
                                .then(responseStatus => {
                                    toast.success('Edytowano anomalię podopiecznego');
                                    window.location.reload(false);

                                }).catch(error => {
                                    console.error(error.response.data);
                                    toast.error('Mie edytowano anomalii');
                                }
                                );
                        }else{
                            toast.error('Błąd systemu');
                        }
                    }}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => {
                        mealAnomalyService.deleteMealAnomaly(params.id)
                            .then(res => {
                                toast.error('Usunięto anomalię');
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
    const [mealAnomalyArray, setMealAnomaly] = useState([]);
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
            authService.getCurrentUser().roles.at(0) === 'ROLE_EMPLOYEE') {//jezeli nie ma roli nei czyta
            mealAnomalyService.getMealAnomaly()
                .then((result) => {
                    setMealAnomaly(result.data);
                    console.log(mealAnomalyArray)
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
                rows={mealAnomalyArray}
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

