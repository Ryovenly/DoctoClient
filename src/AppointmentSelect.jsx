import { useContext,useState,useEffect } from "react";
//import AuthContext from "./AuthContext";
import * as React from 'react';

import { useNavigate, Navigate } from "react-router-dom";
//import signOut from './handles/handlesubmit';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs  } from "firebase/firestore";
//import Signout from "./handles/Signout";
import {firestore} from './firebase';
import { Appointment } from "./Appointment";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
    { id: 'year', label: 'Année' },
    { id: 'month', label: 'Mois' },
    { id: 'day', label: 'Jour' },
    { id: 'hour', label: 'Heure' },
    { id: 'minute', label: 'Minute' },
  ];
  
const logout = () => {
    const auth = getAuth();

    signOut(auth);
    return <Navigate replace to="/" />;
  };
  

const AppointmentSelect = () => {
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

const [appointments, setAppointments] = useState([]);



const fetchAppointments = () => {

    setAppointments(new Appointment("2023","03","27","10","05",false,null,null));
    setAppointments(new Appointment("2023","03","27","11","05",false,null,null))
    setAppointments(new Appointment("2023","03","27","12","05",false,null,null))
    setAppointments(new Appointment("2023","03","27","13","05",false,null,null))
    setAppointments(new Appointment("2023","03","27","14","05",false,null,null))
    setAppointments(new Appointment("2023","03","27","15","05",false,null,null))
    setAppointments(new Appointment("2023","03","27","16","05",false,null,null))

}

  useEffect(() => {

    fetchAppointments();

  }, [])

//   if (!user) {
//     return <Navigate replace to="/login" />;
//   }
  return (
    <>
      <h1>Rendez-Vous</h1>

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
            {appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((appointment) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={appointment.id}>
                    {columns.map((column) => {
                      const value = appointment[column.id];
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
        count={appointments.length}
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

export default AppointmentSelect;