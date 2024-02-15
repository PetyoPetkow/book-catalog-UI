import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LibraryEditModal from "./LibraryEditModal";
import LibraryCreateModal from "./LibraryCreateModal"
import { LibraryReturnDto } from "../../models/Library";

const LibraryTable = ({rows, onDeleteButtonClick}: LibraryTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [libraryId, setLibraryId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setLibraryId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button variant='outlined' color="success" onClick={()=>{setCreateModalState(true)}}>Add library</Button></div>
    <DataGrid
    className='min-h-[400px] h-fit'
    initialState={{
      pagination: { paginationModel: { pageSize: 5 } },
    }}
    pageSizeOptions={[5, 10, 25]}
    columns={[
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
      },
      {
        field: 'location',
        headerName: 'Location',
        flex: 1,
      },
      {
        field: 'booksNames',
        headerName: 'Books',
        flex: 1,
      },
      {
        field: "edit",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<LibraryReturnDto>) => {return <Button color="success" onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<LibraryReturnDto>) => {return <Button color="success" onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <LibraryEditModal open={editModalState} libraryId={libraryId!} handleModalState={setEditModalState} setLibraryId={setLibraryId}></LibraryEditModal>
  <LibraryCreateModal open={createModalState} handleModalState={setCreateModalState}></LibraryCreateModal> 
</>)
}

interface LibraryTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default LibraryTable