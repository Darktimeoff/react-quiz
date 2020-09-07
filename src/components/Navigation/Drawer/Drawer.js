import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from './../../UI/Backdrop/Backdrop';

const links = [
    1, 2, 3
]

class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a>Link {link}</a>
                </li>
            )
        })
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