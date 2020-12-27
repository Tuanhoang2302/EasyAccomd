import React, { Component } from 'react'

import footer from '../css/components/footer.module.css'

class Footer extends Component {
    render() {
        return (
            <div className={footer.footer}>
                <h3>this is footer</h3>
            </div>
        )
    }
}

export default Footer;