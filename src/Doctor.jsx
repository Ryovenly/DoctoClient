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

import { createEvent } from "ics";
import { saveAs } from 'file-saver';


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

const ToAppointmentSelectPage = () => {
  navigate("/appointmentSelect");
};

// or, in ESM: import * as ics from 'ics'

// const event = {
//   start: [2018, 5, 30, 6, 30],
//   duration: { hours: 6, minutes: 30 },
//   title: 'Bolder Boulder',
//   description: 'Annual 10-kilometer run in Boulder, Colorado',
//   location: 'Folsom Field, University of Colorado (finish line)',
//   url: 'http://www.bolderboulder.com/',
//   geo: { lat: 40.0095, lon: 105.2669 },
//   categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
//   status: 'CONFIRMED',
//   busyStatus: 'BUSY',
//   organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
//   attendees: [
//     { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
//     { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
//   ]
// }

// ics.createEvent(event, (error, value) => {
//   if (error) {
//     console.log(error)
//     return
//   }

//   console.log(value)

// })

const event = {
  start: [2018, 5, 30, 6, 30],
  duration: { hours: 6, minutes: 30 },
  title: "Bolder Boulder",
  description: "Annual 10-kilometer run in Boulder, Colorado",
  location: "Folsom Field, University of Colorado (finish line)",
  url: "http://www.bolderboulder.com/",
  geo: { lat: 40.0095, lon: 105.2669 },
  categories: ["10k races", "Memorial Day Weekend", "Boulder CO"],
  status: "CONFIRMED",
  busyStatus: "BUSY",
  organizer: { name: "Admin", email: "Race@BolderBOULDER.com" },
  attendees: [
    {
      name: "Adam Gibbons",
      email: "adam@example.com",
      rsvp: true,
      partstat: "ACCEPTED",
      role: "REQ-PARTICIPANT"
    },
    {
      name: "Brittany Seaton",
      email: "brittany@example2.org",
      dir: "https://linkedin.com/in/brittanyseaton",
      role: "OPT-PARTICIPANT"
    }
  ]
};

const handleSave = () => {
  createEvent(event, (error, value) => {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "event-schedule.ics");
  });
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
 <button onClick={ToAppointmentSelectPage}>Voir Rendez-Vous</button>
 <button onClick={handleSave}>Voir Rendez-Vous test</button>


 <button onClick={logout}>Se déconnecter</button>
    </>
  );
};

export default Doctor;