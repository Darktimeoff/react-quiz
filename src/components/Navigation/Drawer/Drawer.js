import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from './../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';
import { store } from './../../../index';

const links = [
    {
        to: '/',
        label: 'Cписок',
        exact: true,
    },
    {
        to: '/auth',
        label: 'Авторизация',
        exact: false,
    }
]

function compareObj(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function comparesObj(array, obj1) {
    let isCompered  = false;

    array.forEach((obj) => {
        if(compareObj(obj, obj1)) {
            isCompered = true;
        }
    });

    return isCompered
}


class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                    to={link.to} 
                    exact={link.exact} 
                    activeClassName={classes.active}
                    onClick={this.onClickLinkHandler}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }

    onClickLinkHandler = () => {
        this.props.onBackdropClick();
    }


    render() {
        const link = {
            to: '/quiz-creator',
            label: 'Создать тест',
            exact: false,
        }

        if(store.getState().auth.signIn && !comparesObj(links, link)) {
            links.push(link);
        }

        const cls = [
            classes.Drawer,
            this.props.isOpen ? '' : classes.close
        ]

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onBackdropClick={this.props.onBackdropClick}/> : null}
            </>
        )
    }
}

export default Drawer;