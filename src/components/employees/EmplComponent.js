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
import textDataGrid from '../TextDataGrid'
import { GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import Dialog from './Dialog'
import employeesService from '../../services/employees-service';

const columns = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', maxWidth: 60, flex: 1 },
    { field: 'username', headerName: 'nazwa użytkownika*', editable: true, headerAlign: 'center', align: 'center', minWidth: 160, flex: 1 },
    {
        field: 'name', headerName: 'imię i nazwisko', headerAlign: 'center', align: 'center', minWidth: 150, flex: 1,
        valueGetter: (accountArray) => accountArray.row.name + " " + accountArray.row.surname
    },
    {
        field: 'roles', headerName: 'rola', headerAlign: 'center', align: 'center', minWidth: 150, flex: 1,
        valueGetter: (accountArray) => accountArray.row.roles[0].name
    },
    { field: 'phone_number', headerName: 'numer telefonu*', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'email', headerName: 'email*', editable: true, headerAlign: 'center', align: 'center', minWidth: 220, flex: 1 },
    {
        field: "actions",
        headerName: "",
        width: 120,
        sortable: false,
        flex: 1,
        disableColumnMenu: true,
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
                        if (params.row.id === "") {
                            toast.error('Błędne ID');
                            flag=true;
                        } else if (params.row.username.length < 3 || params.row.username > 20) {
                            toast.error('Błędna nazwa użytkownika');
                            flag=true;
                        } else if (params.row.name === "") {
                            toast.error('Błędne imię');
                            flag=true;
                        } else if (params.row.surname === "") {
                            toast.error('Błędne nazwisko');
                            flag=true;
                        }else if (params.row.phone_number.length !=9) {
                            toast.error('Błędny numer telefonu');
                            flag=true;
                        } else if (!ValidateEmail(params.row.email)) {
                            flag=true
                        } else if (flag === false) {
                            employeesService.updateEmployee(
                                {
                                    id: params.row.id,
                                    username: params.row.username,
                                    password: params.row.password,
                                    name: params.row.name,
                                    surname: params.row.surname,
                                    roles: params.row.roles,
                                    phone_number: params.row.phone_number,
                                    email: params.row.email,
                                }
                            ).then(responseStatus => {
                                toast.success('Edytowane dane pracownika');
                                window.location.reload(false);
                            }).catch(error => {
                                console.error(error.response.data);
                                toast.error('Bład systemu');
                            }
                            );
                        }
                    }}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => {
                        employeesService.deleteEmployeeAccount(params.id)
                            .then(res => {
                                toast.error('Usunięto konto pracownika');
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


function CustomToolbar() {
    return (
        <Card sx={{ height: '60%', boxShadow: 0, m: 3, color: 'primary.main', }}>
            <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
                <GridToolbarQuickFilter sx={{ m: 2, width: '40%' }} variant="outlined" />
                <Box sx={{ justifyContent: 'flex-end' }}>
                    <Dialog />
                    <GridToolbarExport
                        sx={{ p: 1, marginRight: 1 }}
                        variant="contained" color='warning'
                        excelOptions={{ allColumns: true }}
                        csvOptions={{
                            allColumns: false,
                            fileName: 'pracownicy_CSV',
                            delimiter: ';',
                            utf8WithBom: true,
                        }}
                        printOptions={{ disableToolbarButton: true }}
                    // printOptions={{
                    //     hideFooter: true,
                    //     hideToolbar: true,
                    // }}

                    />
                    <GridToolbarDensitySelector sx={{ p: 1, marginRight: 3 }} variant="contained" color='primary' />
                </Box>
            </GridToolbarContainer>
        </Card >
    );
}



function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    toast.error('Błędny email');
    return (false)
}

export default function EmplComponent() {

    const [pageSize, setPageSize] = React.useState(5);
    const [employeeArray, setEmployee] = useState([]);
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
        else if (authService.getCurrentUser().roles.at(0) === 'ROLE_ADMIN') {
            employeesService.getAllEmployees()
                .then((result) => {
                    setEmployee(result.data);
                    // console.log(result);
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
                rows={employeeArray}
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

