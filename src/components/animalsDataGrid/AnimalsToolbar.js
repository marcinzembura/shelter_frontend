import * as React from 'react';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Card, CardContent, TablePagination } from '@mui/material';
import Dialog from '../animals/Dialog'
import DialogOwner from '../owners/Dialog'
import { Box } from '@mui/material';


export default function CustomToolbar() {
    


    return (
        <Card sx={{ height: '60%', boxShadow: 0, m: 3, color: 'primary.main', }}>
            <GridToolbarContainer sx={{
                justifyContent: 'space-between'
            }}>
                <GridToolbarQuickFilter sx={{ m: 2, width: '40%' }} variant="outlined" />
                <Box sx={{ justifyContent: 'flex-end' }}>
                    <DialogOwner/>
                    <Dialog/>
                    <GridToolbarExport
                        sx={{ p: 1,  marginRight: 1 }}
                        variant="contained" color='warning'
                        excelOptions={{ allColumns: true }}
                        csvOptions={{ 
                            allColumns: false ,
                            fileName: 'zwierzeta_CSV',
                            delimiter: ';',
                            utf8WithBom: true,
                        }}
                         printOptions={{ disableToolbarButton: true }}
                        // printOptions={{
                        //     hideFooter: true,
                        //     hideToolbar: true,
                        // }}
     
                    />
                    <GridToolbarDensitySelector sx={{ p: 1,  marginRight: 3 }} variant="contained" color='primary'  />
                </Box>
            </GridToolbarContainer>
        </Card >
    );
}
