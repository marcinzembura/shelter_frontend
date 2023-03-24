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
import CustomToolbar from './OwnersToolbar';
import textDataGrid from '../TextDataGrid'
import ownerService from '../../services/owner-service';

const columns = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', maxWidth: 60, flex: 1 },
    {
        field: 'animal', headerName: 'ID_zwierzę', headerAlign: 'center', align: 'center', maxWidth: 90, flex: 1,
        valueGetter: (accountArray) => accountArray.row.animal.id
    },
    {
        field: 'name', headerName: 'Imię oraz nazwisko', headerAlign: 'center', align: 'center', minWidth: 150, flex: 1,
        valueGetter: (accountArray) => accountArray.row.name + " " + accountArray.row.surname
    },
    { field: 'pesel', headerName: 'PESEL', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'phoneNumber', headerName: 'Numer telefonu *', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'email', headerName: 'Adres email *', editable: true, headerAlign: 'center', align: 'center', minWidth: 220, flex: 1 },
    { field: 'address', headerName: 'Miejsce zamieszkania *', editable: true, headerAlign: 'center', minWidth: 220, align: 'center', flex: 1 },
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
                        if (params.row.id === ""|| params.row.id === undefined || params.row.id === null) {
                            toast.error('Błędne ID');
                            flag = true;
                        } if (params.row.animal.id === ""|| params.row.animal.id === undefined || params.row.animal.id === null) {
                            toast.error('Błędne ID podopiecznego');
                            flag = true;
                        }  else if (params.row.name === "" || params.row.name === undefined || params.row.name === null) {
                            toast.error('Błędne imię');
                            flag = true;
                        } else if (params.row.surname === "" || params.row.surname === undefined || params.row.surname === null) {
                            toast.error('Błędne nazwisko');
                            flag = true;
                        } else if (params.row.phoneNumber.length != 9) {
                            toast.error('Błędny numer telefonu');
                            flag = true;
                        }else if (params.row.pesel.length != 11) {
                            toast.error('Błędny numer PESEL');
                            flag = true;
                        }else if (params.row.address === "" || params.row.address === undefined || params.row.address === null) {
                            toast.error('Błędny adres');
                            flag = true;
                        }   else if (!ValidateEmail(params.row.email)) {
                            flag = true
                        } else if (flag === false) {
                            ownerService.updateOwner({

                                id: params.row.id,
                                name: params.row.name,
                                surname: params.row.surname,
                                phoneNumber: params.row.phoneNumber,
                                email: params.row.email,
                                pesel: params.row.pesel,
                                address: params.row.address,
                                animal: {
                                    id: params.row.animal.id
                                }
                            }
                            )
                                .then(responseStatus => {
                                    console.log(responseStatus);
                                    toast.success('Edytowane dane właściciela');
                                    window.location.reload(false);

                                }).catch(error => {
                                    console.error(error.response.data);
                                    toast.error('Nie edytowano danych własciciela');
                                }
                                );
                        }
                    }}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => {
                        ownerService.deleteOwner(params.id)
                            .then(res => {
                                toast.error('Usunięto właściciela');
                                window.location.reload(false);
                            })
                            .catch(err => {
                                console.log(err)
                                toast.error('Coś poszło nie tak');
                            })
                    }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box >
            );
        }
    }
]


function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    toast.error('Błędny email');
    return (false)
}


export default function OwnersComponent() {

    const [pageSize, setPageSize] = React.useState(5);
    const [ownerArray, setOwners] = useState([]);
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
            ownerService.getAllOwners()
                .then((result) => {
                    setOwners(result.data);
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
                rows={ownerArray}
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

