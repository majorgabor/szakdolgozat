

import PageURL from './pageUrl.js';

export const articles = [
    {
        src: 'http://pipsum.com/140x140.jpg',
        alt: '',
        title: 'Play For Free',
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa praesentium repudiandae sapiente enim perferendis maxime eligendi. Architecto laudantium repellat vel, sequi, ipsa vitae corporis ea aspernatur cumque non impedit exercitationem.',
        to: PageURL.account,
        link: 'Paly Now'
    },
    {
        src: 'http://pipsum.com/140x140.jpg',
        alt: '',
        title: 'Score Board',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam corporis fugiat voluptate similique iure consequatur perferendis, doloremque eligendi sint consectetur quia suscipit dolorem expedita magni deleniti! Suscipit quos corrupti nemo.',
        to: PageURL.scoreboard,
        link: 'Score Board'
    },
    {
        src: 'http://pipsum.com/140x140.jpg',
        alt: '',
        title: 'Sing Up Today',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dolorem quod quasi! Deserunt pariatur exercitationem consectetur et nostrum provident recusandae nemo? Recusandae quisquam nesciunt cum dolor, inventore repellendus expedita suscipit.',
        to: PageURL.signup,
        link: 'SignUp'
    }
];

export const carouselItems = [
    {
        active: true,
        src: 'http://pipsum.com/1920x720.jpg',
        alt: '',
        title: 'The War is Now',
        subtitle: 'Fight against the enemy!',
        links: [
            {to: PageURL.account, title: 'Play Now'}
        ]
    },
    {
        active: false,
        src: 'http://pipsum.com/1920x720.jpg',
        alt: '',
        title: 'We Need You',
        subtitle: 'Join to the battle and win the war!',
        links: [
            {to: PageURL.signup, title: 'SingUp'}
        ]
    },
    {
        active: false,
        src: 'http://pipsum.com/1920x720.jpg',
        alt: '',
        title: 'Destroy Them',
        subtitle: 'The louck isn\'t enought. Prove that you have the best strategy!',
        links: [
            {to: PageURL.login, title: 'LogIn'},
            {to: PageURL.signup, title: 'SingUp'}
        ]
    },
];