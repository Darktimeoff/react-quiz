import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from './../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

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
    },
    {
        to: '/quiz-creator',
        label: 'Создать тест',
        exact: false,
    }
]

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