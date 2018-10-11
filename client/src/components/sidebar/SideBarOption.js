import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class SideBarOption extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func
    }
    static defaultProps = {
        active: false,
        onCLick: () => { }

    }
    render() {
        const { active, name, onClick } = this.props
        // console.log("Sidebar options active = ", active);
        // console.log("Sidebar options name = ", name);
        return (
            <div
                className={`user ${active}`}
                onClick={onClick}
            >

                <div className="user-info">
                    <div className="name">{name}</div>
                </div>

            </div>
        )
    }
}