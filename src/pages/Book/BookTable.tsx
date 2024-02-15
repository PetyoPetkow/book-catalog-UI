import { DataGrid, DataGridProps, GridRenderCellParams } from "@mui/x-data-grid"
import React, { useState } from "react"
import { Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookEditModal from "./BookEditModal";
import BookCreateModal from "./BookCreateModal";
import { BookReturnDto } from "../../models/Book";

const BookTable = ({rows, onDeleteButtonClick}: BookTableProps) =>{
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [createModalState, setCreateModalState] = useState<boolean>(false)
  const [bookId, setBookId] = useState<number|null> (null)
  
  const onEditButtonClicked = async (id: number) =>{
    setEditModalState(!editModalState)
    setBookId(id)
  }

  return (
  <>      
    <div className='w-full flex justify-end p-2'><Button variant='outlined' color="success" onClick={()=>{setCreateModalState(true)}}>Add book</Button></div>
    <DataGrid
    className='min-h-[400px] h-fit'
    initialState={{
      pagination: { paginationModel: { pageSize: 5 } },
    }}
    pageSizeOptions={[5, 10, 25]}
    columns={[
      {
        field: 'title',
        headerName: 'Title',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.55,
      },
      {
        field: 'isbn',
        headerName: 'ISBN',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 50,
        flex: 0.55,
      },
      {
        field: 'publishedDate',
        headerName: 'Publishing date',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: 'available',
        headerName: 'Available',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: 'authorName',
        headerName: 'Author',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: 'genresNames',
        headerName: 'Genres',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: "edit",
        minWidth: 50,
        flex: 0.25,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<BookReturnDto>) => {return <Button color="success" onClick={() => onEditButtonClicked(params.row.id)}><EditIcon/></Button>}
      },
      {
        field: "delete",
        minWidth: 50,
        flex: 0.25,
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        hideSortIcons: true,
        renderHeader: () => {return <></>},
        renderCell: (params: GridRenderCellParams<BookReturnDto>) => {return <Button color="success" onClick={() => onDeleteButtonClick(params.row.id)}><DeleteOutlineIcon/></Button>}
      },
    ]}
    rows={rows}
  />
  <BookEditModal open={editModalState} bookId={bookId!} handleModalState={setEditModalState} setBookId={setBookId}/>
  <BookCreateModal open={createModalState} handleModalState={setCreateModalState}/>
</>)
}

interface BookTableProps extends Omit<DataGridProps, 'columns'> {
  onDeleteButtonClick: (id: number) => void;
}

export default BookTable