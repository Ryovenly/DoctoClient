import { useContext,useState,useEffect } from "react";
//import AuthContext from "./AuthContext";
import * as React from 'react';

import { useNavigate, Navigate } from "react-router-dom";
//import signOut from './handles/handlesubmit';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs  } from "firebase/firestore";
//import Signout from "./handles/Signout";
import {firestore} from './firebase';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
    { id: 'firstname', label: 'Prénom' },
    { id: 'lastname', label: 'Nom' },
    { id: 'city', label: 'Ville' },
  ];
  
const logout = () => {
    const auth = getAuth();

    signOut(auth);
    return <Navigate replace to="/" />;
  };
  

const Doctor = () => {
  //const { user } = useContext(AuthContext);
  const navigate = useNavigate();


const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const ToProfilPage = () => {
  navigate("/profile");
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const [doctors, setDoctors] = useState([]);

const fetchDoctor = async () => {
       
    await getDocs(collection(firestore, "Doctors"))
        .then((querySnapshot)=>{              
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                setDoctors(newData);                
            console.log(doctors, newData);
        })
   
}

  useEffect(() => {

    fetchDoctor();

  }, [])

//   if (!user) {
//     return <Navigate replace to="/login" />;
//   }
  return (
    <>
      <h1>Docteurs</h1>

<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doctor) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={doctor.id}>
                    {columns.map((column) => {
                      const value = doctor[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={doctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

 <button onClick={ToProfilPage}>Voir son profil</button>
 <button onClick={logout}>Se déconnecter</button>
    </>
  );
};

export default Doctor;