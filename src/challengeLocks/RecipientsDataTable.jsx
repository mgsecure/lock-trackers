import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { createTheme, ThemeProvider } from '@mui/material/styles'


import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid'
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator'

import {useContext} from 'react'
import SPDataContext2 from '../speedPicks/SPDataContext.jsx'


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props

    const handleClick = () => {
        const id = randomId()
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }])
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }))
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    )
}

const getMuiTheme = () =>
    createTheme({
        components: {
            MuiTableCell: {
                styleOverrides:{ root: {
                        padding: '8px',
                        backgroundColor: '#CDCAC6',
                    }}
            },
            MuiToolbar: {
                styleOverrides:{regular: {
                        minHeight: '8px',
                    }}
            }
        }
    })

export default function FullFeaturedCrudGrid() {

    const {people, locks, recipients, lockBelts = []} = useContext(SPDataContext2)

    const [rows, setRows] = React.useState(recipients.data)
    const [rowModesModel, setRowModesModel] = React.useState({})

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true
        }
    }

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    }

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    }

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id))
    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })

        const editedRow = rows.find((row) => row.id === id)
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id))
        }
    }

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false }
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
        return updatedRow
    }

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel)
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
            style: {fontWeight:'bold'}
        },
        {
            field: 'makerId',
            headerName: 'Maker',
            width: 120,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'lockType',
            headerName: 'Lock type',
            width: 140,
            editable: true,
        },
        {
            field: 'pinCount',
            headerName: 'Pin count',
            width: 180,
            editable: true,
            type: 'number',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ]
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ]
            },
        },
    ]

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <ThemeProvider theme={getMuiTheme()}>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                style={{fontSize:'1.1rem'}}
            />
            </ThemeProvider>
        </Box>
    )
}
