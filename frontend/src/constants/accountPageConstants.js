import React from 'react';
import Form from '../components/form.js';

export const navBarProps = {
    page: 'account',
    user: null,
};

export const modifyFormFields = [
    {
        fieldName: 'firstname',
        title: 'Firstname',
        type: 'text',
        placeholder: 'Enter Firstname'
    },
    {
        fieldName: 'lastname',
        title: 'Lastname',
        type: 'text',
        placeholder: 'Enter Lastname'
    },
    {
        fieldName: 'email',
        title: 'Email',
        type: 'email',
        placeholder: 'Enter Email'
    },
    {
        fieldName: 'password',
        title: 'Password',
        type: 'password',
        placeholder: 'Enter Password'
    },
];

export const modifyFormProps = {
    fetchURL: 'account/modify.php',
    redirectURL: null,
    title: 'Modify Data',
    submitText: 'Modify',
    fields: null,
    checkBoxs: null,
}

const changePasswordFormFields = [
    {
        fieldName: 'oldpassword',
        title: 'Old Password',
        type: 'password',
        placeholder: 'Enter Old Password'
    },
    {
        fieldName: 'newpassword',
        title: 'New Password',
        type: 'password',
        placeholder: 'Enter New Password'
    },
    {
        fieldName: 'newpassword2',
        title: 'New Password Again',
        type: 'password',
        placeholder: 'Enter New Password Again'
    },
];

const passwordChangeFormProps = {
    fetchURL: 'account/changepw.php',
    redirectURL: null,
    title: 'Change Password',
    submitText: 'Change',
    fields: changePasswordFormFields,
    checkBoxs: null,
};

export const varticalPillsProps = [
    {
        name: 'profile',
        body: null,
    },
    {
        name: 'statistic',
        body: null,
    },
    {
        name: 'modify',
        body: null
    },
    {
        name: 'passwordchange',
        body: (<Form {...passwordChangeFormProps}/>),
    }
];