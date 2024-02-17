import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import {createTheme, ThemeProvider} from '@mui/material/styles'

const getMuiTheme = () =>
    createTheme({
    })


const DataTableSimple = ({tableData}) => {

    const columns = tableData?.columns
    const rows = tableData?.data

    return (
        <Box sx={{ width: '90%', marginTop:'10px' }}>
            <ThemeProvider theme={getMuiTheme()}>

            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                style={{fontWeight:400}}
            />
                
            </ThemeProvider>
        </Box>
    );
}

export default DataTableSimple