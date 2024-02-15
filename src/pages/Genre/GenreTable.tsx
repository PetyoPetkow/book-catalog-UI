import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import GenreCreateModal from "./GenreCreateModal"
import { GenreReturnDto } from "../../models/Genre";
import GenreEditModal from "./GenreEditModal";

const GenreTable = ({rows, onDeleteButtonClick}: GenreTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [genreId, setGenreId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setGenreId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button variant='outlined' color='success' onClick={()=>{setCreateModalState(true)}}>Add Genre</Button></div>
    <DataGrid
    className='min-h-[400px] h-fit'
    pageSizeOptions={[5, 10, 25]}
    columns={[
      {
        field: 'name',
        headerName: "Genre",
        flex: 1,
      },
      {
        field: 'description',
        headerName: 'Description',
        flex: 3,
      },
      {
        field: "edit",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<GenreReturnDto>) => {return <Button color="success" onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<GenreReturnDto>) => {return <Button color="success" onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <GenreEditModal open={editModalState} genreId={genreId!} handleModalState={setEditModalState} setGenreId={setGenreId}></GenreEditModal>
  <GenreCreateModal open={createModalState} handleModalState={setCreateModalState}></GenreCreateModal> 
</>)
}

interface GenreTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default GenreTable