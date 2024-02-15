import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AuthorEditModal from "./AuthorEditModal";
import AuthorCreateModal from "./AuthorCreateModal"
import { AuthorReturnDto } from "../../models/Author";

const AuthorTable = ({rows, onDeleteButtonClick}: AuthorTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [authorId, setAuthorId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setAuthorId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button variant='outlined' color="success" onClick={()=>{setCreateModalState(true)}}>Add author</Button></div>
    <DataGrid
    className='min-h-[400px] h-fit'
    initialState={{
      pagination: { paginationModel: { pageSize: 5 } },
    }}
    pageSizeOptions={[5, 10, 25]}
    columns={[
      {
        field: 'firstName',
        headerName: 'First name',
        flex: 1,
      },
      {
        field: 'lastName',
        headerName: 'Last name',
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
        renderCell: (params: GridRenderCellParams<AuthorReturnDto>) => {return <Button color="success" onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        width: 50,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<AuthorReturnDto>) => {return <Button color="success" onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <AuthorEditModal open={editModalState} authorId={authorId!} handleModalState={setEditModalState} setAuthorId={setAuthorId}></AuthorEditModal>
  <AuthorCreateModal open={createModalState} handleModalState={setCreateModalState}></AuthorCreateModal> 
</>)
}

interface AuthorTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default AuthorTable