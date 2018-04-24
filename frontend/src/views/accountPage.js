import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';
import { fetchAjax } from '../actions/fetchAjax.js';
import { socket, joinToMatchMaking, abortMatchMaking,  battleRequestAnswer } from '../actions/wsclient.js';

import NavBar from '../components/navBar.js';
import VerticalPills from '../components/verticalPills.js';
import DataPanel from '../components/dataPanel.js';
import Form from '../components/form.js';
import Modal from '../components/modal.js';
import Loading from '../components/loading.js';

import { modifyFormFields, changePasswordFormFields } from '../constants/accountFormInputs.js';

class AccountPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            responseCode: null,
            userInfo: {},
            redirect: false,
        };
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.componentDidMount();
    }

    onAjaxsuccess() {
        return (response) => {
            if(Number.isInteger(response)) {
                this.setState({
                    responseCode: response,
                });
            } else {
                this.setState({
                    isLoaded: true,
                    userInfo: response,
                });
            }
        };
    }

    componentDidMount() {
        fetchAjax(
            'http://localhost:80/szakdolgozat/back-end/API/account/',
            {
                method: 'GET',
                credentials: 'include',
            },
            this.onAjaxsuccess()
        );
        socket.on('startGame', (data) => {
            $('#close-matchmakingModal').click();
            this.setState({
                redirect: true,
            });
        });
    }

    setModifyFormFieldsPlaceholder() {
        let setted = modifyFormFields;
        setted[0].placeholder = this.state.userInfo.firstname;
        setted[1].placeholder = this.state.userInfo.lastname;
        setted[2].placeholder = this.state.userInfo.username;        
        return setted;
    }

    render() {
        const { isLoaded, error, responseCode, userInfo, redirect, exitModal } = this.state;
        if(responseCode && (responseCode === 401 || responseCode === 405)) {
            return (
                <Redirect to='/login' />
            );
        }
        if(redirect) {
            return (
                <Redirect data-dismiss="modal" to='/game' />
            );
        }
        const navBarProps = {
            page: 'account',
            user: userInfo.username,
        };
        const profileData = {
            name: userInfo.firstname+' '+userInfo.lastname,
            username: userInfo.username,
            email:userInfo.email,
        };
        const statisticData = {
            battles: userInfo.battles,
            wins: userInfo.wins,
            points: userInfo.points,
        }
        const modifyFormProps = {
            fetchURL: 'account/modify.php',
            redirectURL: null,
            title: 'Modify Data',
            submitText: 'Modify',
            fields: this.setModifyFormFieldsPlaceholder(),
            checkBoxs: null,
        }
        const passwordChangeFormProps = {
            fetchURL: 'account/changepw.php',
            redirectURL: null,
            title: 'Change Password',
            submitText: 'Change',
            fields: changePasswordFormFields,
            checkBoxs: null,
        };
        const varticalPillsProps = [
            {
                name: 'profile',
                body: (<DataPanel data={profileData} />),
            },
            {
                name: 'statistic',
                body: (<DataPanel data={statisticData} />),
            },
            {
                name: 'modify',
                body: (
                    <Form 
                        triggerRefresh={this.refresh}
                        {...modifyFormProps}/>
                    ),
            },
            {
                name: 'passwordchange',
                body: (<Form {...passwordChangeFormProps}/>),
            }
        ];
        const modalProps = {
            name: 'matchmakingModal',
            title: 'Match Making',
            body: (
                <div>
                    <div id="abortMatchMaking">
                        <p id="numberOfWaitingUser"></p>
                        <button onClick={abortMatchMaking} type="button" className="btn btn-danger" data-dismiss="modal">Abourt Match Make</button>
                    </div>
                    <div>
                        <div id="battleRequest">
                            <p id="enemy"></p>
                            <button onClick={battleRequestAnswer(true)} id="accept" type="button" className="btn btn-success">Accept</button>
                            <button onClick={battleRequestAnswer(false, userInfo.username)} id="discard" type="button" className="btn btn-danger">Discard</button>
                        </div>
                    </div>
                </div>
            ),
            footer: (<div id="matchmakingModal-footer"></div>)
        };
        if(!isLoaded) {
            return (
                <Loading />
            );
        } else {
            return (
                <div id="account">
                    <NavBar {...navBarProps} />
                    <div className="card offset-xl-2 col-xl-8 offset-gl-1 col-gl-10">
                        <div className="card-body">
                            <button
                                onClick={joinToMatchMaking(userInfo.username)}
                                className="btn btn-primary btn-lg"
                                data-toggle="modal"
                                data-target={"#"+modalProps.name}
                                data-backdrop="static"
                                data-keyboard="false">
                                    Start game
                            </button>
                            <p>Play now for free!</p>
                        </div>
                    </div>
                    <VerticalPills tabs={varticalPillsProps} />
                    <Modal {...modalProps} />
                </div>
            );
        }
    }
}

export default AccountPage;