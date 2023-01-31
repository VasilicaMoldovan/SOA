import React, {Component} from "react";
import {Box, Button, Form, grommet, Grommet, TextInput} from 'grommet';
import {CircleInformation, Hide, View} from 'grommet-icons';
import {deepMerge} from "grommet/utils";
import './index.css';

const customFormFieldTheme = {
    global: {
        font: {
            size: "16px"
        }
    },
    box: {
        alignItems: 'center'
    },
    formField: {
        label: {
            size: "xsmall",
            margin: {vertical: "0", bottom: "small", horizontal: "0"},
            weight: 600
        },
        border: false,
        margin: 0,
        width: 400
    }
};

class Login extends Component {
    state = {
        username: '',
        password: '',
        error: null,
        isPasswordShown: false,
    };

    loginSuccess = this.props.loginSuccess;
    setUser = this.props.setUser;
    setToken = this.props.setToken;

    login(user) {
        console.log('user');
        const  { username, password } = user;

        if (username === '' || password === ''){
            this.setState({error: 'Invalid data.'});
        } else {
            const url_api = 'http://localhost:8092/gate/v1/login';
            console.log(`Sending request: ${url_api}`);

            fetch(url_api,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }).then(response => response.json())
                .then(data => {
                    const api_error = data.error;
                    if(typeof api_error == 'undefined'){
                        console.log("Password is correct.");
                        this.setUser(username);
                        this.setToken(data.token)
                        this.loginSuccess();
                    } else {
                        console.log(api_error);
                    }
                }).catch((err) => {
                console.log(`Error API call: ${err}`);
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();
        const {username, password} = this.state;
        console.log(`Submit ${username} ${password}`);
        const user = {
            username,
            password
        };
        this.login(user);
    };

    showPassword = (value) => {
        this.setState({isPasswordShown: value});
    };

    render() {
        const {isPasswordShown} = this.state;
        return (
            <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
                    <Box><Box width='100%' height='100%' alignContent='end'>
                        <Box className='loginForm'>
                            <Form onSubmit={this.onSubmit}>
                                <Box align='center'>
                                    <h1>Connect lala</h1>
                                </Box>
                                <Box align='center' margin='medium'>
                                    <Box
                                        className='neutral'
                                        width="medium"
                                        direction="row"
                                        margin="small"
                                        align="center"
                                        round="xsmall"
                                        border
                                    >
                                        <TextInput
                                            name='username'
                                            id='email'
                                            plain
                                            placeholder='Username'
                                            type='text'
                                            onChange={this.onChange}
                                        />
                                    </Box>
                                    <Box
                                        className='neutral'
                                        style={{overflow: 'hidden'}}
                                        width="medium"
                                        direction="row"
                                        margin="small"
                                        align="center"
                                        round="xsmall"
                                        border
                                    >
                                        <TextInput
                                            name='password'
                                            id='password'
                                            plain
                                            type={isPasswordShown ? 'text' : 'password'}
                                            placeholder='Password'
                                            onChange={this.onChange}
                                        />
                                        <Button
                                            icon={isPasswordShown ? <View size="medium"/> : <Hide size="medium"/>}
                                            onClick={() => this.showPassword(!isPasswordShown)}
                                        />
                                    </Box>
                                    {this.state.error && (
                                        <Box style={{alignSelf: 'start', flexDirection: 'row', display: 'flex'}}>
                                            <CircleInformation className='infoIcon'/>
                                            <span
                                                style={{color: '#d50000', fontSize: '13px'}}>{this.state.error}</span>
                                        </Box>
                                    )}
                                    <Box align="center">
                                        <Button
                                            className='submitButton' type='submit'>Login</Button>
                                    </Box>
                                </Box>
                            </Form>
                        </Box>
            </Box></Box>
            </Grommet>
        )
    }
}

export default Login;
