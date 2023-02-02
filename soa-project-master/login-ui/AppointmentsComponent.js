import React, {Component} from 'react';
import {Box, Button, TextInput, List} from 'grommet';
import emailjs from 'emailjs-com';
import { AppointmentsProvider } from './context/appointments.context';
import AppointmentForm from './Components/AppointmentForm';
import AppointmentList from './Components/AppointmentList';

class AppointmentsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            date: '',
            email: '',
            name: '',
            error: null,
            appointments: [],
        };
        const auxAppointments = this.getAppointments();
        const { appointments, deleteAppointment, toggleAppointment, editAppointment } = useAppointmentsState(auxAppointments);
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    getAppointments = () => {
        const {token, username} = this.props;
        const appointmentsUrl = 'http://localhost:8092/gate/v1/appointments?';
        console.log(`sending request: ${appointmentsUrl}`);
        fetch(appointmentsUrl + new URLSearchParams({
            username: username
        }),{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        // }).then(response => response.text())          // convert to plain text
        // .then(text => console.log(text))
        }).then(response => response.json())
            .then(data => {
                console.log(`${data.length} appointments obtained successfully for user: ${username}`);
                this.setState({ appointments: data });

            }).catch((err)=>{
                console.log(`we arw here now`);
            console.log(`Error API call: ${err}`);
            alert(err);
        });
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.getAppointments();
    }

    componentDidUpdate(prevState) {
        const {appointments} = this.state;
        if (appointments && prevState.appointments && appointments.length !== prevState.appointments.length) {
            this.setState({content: ''});
            this.setState({date: ''});
        }
    }

    onAdd = e => {
        e.preventDefault()
        const {content, date} = this.state;
        const {token, username} = this.props;

        if (content === '' && date === ''){
            this.setState({error: 'Invalid data.'});
        } else {
            const appointmentUrl = 'http://localhost:8092/gate/v1/appointment';
            console.log(`sending request: ${appointmentUrl}`);

            fetch(appointmentUrl,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "username": username,
                    "content": content,
                    "date": date
                })
            }).then(response => response.json())
                .then(data => {
                    const api_error = data.error;
                    if(typeof api_error == 'undefined'){
                        console.log("Appointment successfully added.");
                        this.setState({content: ''})
                        this.setState({date: ''})
                        this.getAppointments();
                    } else {
                        alert(api_error);
                    }
                }).catch((err) => {
                console.log(`Error API call: ${err}`);
                alert(err);
            });
        }
    }

    onSend = e => {
        const {email, name, appointments} = this.state;

        if (email === ''){
            alert('Invalid data.');
        } else {
            let appointmentsCopy = appointments.map((elem) => `${elem.content}\n`);

            emailjs.send('service_9579k0q', 'template_18nr5rm', {
                'subject': 'Your Appointments List',
                'name': name,
                'message': appointmentsCopy,
                'email': email
            }, 'user_Jv5SXGt5Uuncr8doPeEVw')
                .then(() => {
                    console.log('Email sent.');
                    alert('Email successfully sent!')
                }).catch((err) => {
                console.log(`Error sending mail: ${err}`);
                alert('Error encountered while sending email.')
            });
        }
    };

    render() {
        const {appointments} = this.state;
        console.log(appointments)
        return(
    <Paper
      style={{
        height: '100vh',
        backgroundImage: 'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
        padding: 0,
        margin: 0
      }}
      elevation={0}
    >
      <AppBar color='primary' position='static' style={{ height: '104px' }}>
        <Toolbar>
          <Typography color='inherit'><h1>Veterinary clinic</h1></Typography>
        </Toolbar>
        <Box className='logout'>
                        <Button className = 'button' onClick={logout}>Logout</Button>
        </Box>
      </AppBar>
      <Grid container justify='center' style={{ marginTop: '1rem' }}>
        <Grid item xs={11} md={9} lg={5}>
          <AppointmentsProvider>
            <AppointmentForm addAppointment={this.onAdd} />
            <AppointmentList appointments={appointments} toggleAppointment={toggleAppointment} deleteAppointment={deleteAppointment} editAppointment={editAppointment} />
          </AppointmentsProvider>
        </Grid>
      </Grid>
      <Box container='center' style={{paddingTop: '20px'}}>
                    <Box className='appointmentsForm' style={{alignSelf: "center", paddingTop: '2px'}}>
                        <h2 style={{alignSelf: "center"}}>Send appointments</h2>
                        <Box
                            style={{backgroundColor: "white"}}
                            className='neutral'
                            direction="row"
                            margin="small"
                            round="xsmall"
                            border
                        >
                            <TextInput
                                className='input'
                                name='email'
                                id='email'
                                plain
                                placeholder='Email'
                                type='text'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                        <Box
                            style={{backgroundColor: "white"}}
                            className='neutral'
                            direction="row"
                            margin="small"
                            round="xsmall"
                            border
                        >
                            <TextInput
                                className='input'
                                name='name'
                                id='name'
                                plain
                                placeholder='Name'
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>
                        <Box className='add' style={{padding: "20px"}}>
                            <Button style={{backgroundColor: "white", alignSelf: 'flex-end'}} onClick={onSend}>Send</Button>
                        </Box>
                </Box>
                </Box>
    </Paper>
    )
    }
}

export default AppointmentsComponent;
