
export const sigupFormFields = [
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
        fieldName: 'username',
        title: 'Username',
        type: 'text',
        placeholder: 'Enter Username'
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
    {
        fieldName: 'password2',
        title: 'Password again',
        type: 'password',
        placeholder: 'Enter Password Again'
    }
];

export const signupFormCheckBoxs = [
    {
        boxName: 'agree',
        boxValue: true,
        boxText: 'I accept',
        link: {
            href: '#',
            modal: {
                toggle: 'modal',
                target: '#userTermsModal'
            },
            text: 'terms & conditions'
        }
    }
];