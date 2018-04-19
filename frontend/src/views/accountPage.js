import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAjax } from '../actions/fetchAjax';

import NavBar from '../components/navBar.js';
import VerticalPills from '../components/verticalPills.js';
import DataPanel from '../components/dataPanel.js';
import Form from '../components/form.js';
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
            'http://localhost:80/back-end/API/account/',
            {
                method: 'GET',
                credentials: 'include',
            },
            this.onAjaxsuccess()
        );
    }

    setModifyFormFieldsPlaceholder() {
        let setted = modifyFormFields;
        setted[0].placeholder = this.state.userInfo.firstname;
        setted[1].placeholder = this.state.userInfo.lastname;
        setted[2].placeholder = this.state.userInfo.username;        
        return setted;
    }

    render() {
        const { isLoaded, error, responseCode, userInfo } = this.state;
        if(responseCode && (responseCode === 401 || responseCode === 405)) {
            return (
                <Redirect to='/login' />
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
        if(!isLoaded) {
            return (
                <Loading />
            );
        } else {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    <div className="card offset-xl-2 col-xl-8 offset-gl-1 col-gl-10">
                        <div className="card-body">
                            <button className="btn btn-primary btn-lg">Start game</button>
                            <p>Play now for free!</p>
                        </div>
                    </div>
                    <VerticalPills tabs={varticalPillsProps} />
                </div>
            );
        }
    }
}

export default AccountPage;