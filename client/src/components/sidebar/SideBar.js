import React, { Component } from 'react';
import './SideBar.css';
import { SideBarOption } from './SideBarOption'
import { differenceBy } from 'lodash'
import { createChatNamesFromUsers } from '../../Factories'
export default class SideBar extends Component {

	static type = {
		CHATS: 'chats',
		USERS: 'users'
	}

	constructor(props) {
		super(props)
		this.state = {
			receiver: "",
			activeSideBar: SideBar.type.CHATS

		}
		// this.addChatForuser = this.addChatForuser.bind(this);
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { receiver } = this.state
		const { onSendPrivateMessage } = this.props
		onSendPrivateMessage(receiver);
		//console.log(receiver)
	}
	addChatForuser = (username) => {
		console.log("I am inside")
		this.setActiveSideBar(SideBar.type.CHATS)
		this.props.onSendPrivateMessage(username)
	}

	setActiveSideBar = (newSideBar) => {
		this.setState({ activeSideBar: newSideBar })
	}


	render() {
		const { chats, activeChat, user, setActiveChat, logout, users } = this.props
		const { receiver, activeSideBar } = this.state
		console.log("In the sidebar USER = ", user);
		console.log("In the sidebar Users array", users);
		return (
			<div>
				{/* <div id="side-bar">
					<div className="heading">
						<div className="app-name">Chat Rooms </div>
						<div className="menu">

						</div>
					</div>
				</div> */}
				<form onSubmit={this.handleSubmit} className="search">
					<input placeholder="Search"
						type="text"
						value={receiver}
						onChange={(e) => { this.setState({ receiver: e.target.value }) }} />
					<div className="plus"></div>
				</form>


				<div
					onClick={() => { this.setActiveSideBar(SideBar.type.USERS) }}
					className={`side-bar-select_option ${(activeSideBar === SideBar.type.USERS) ? 'active' : ''}`} >
					<span>USERS</span>
				</div>




				<div
					className="users"
					ref='users'
					onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null) }}>

					{/* {
						activeSideBar === SideBar.type.CHATS ?
							chats.map((chat) => {
								if (chat.name) {
									return (
										<SideBarOption
											key={chat.id}
											name={chat.isCommunity ? chat.name : createChatNamesFromUsers(chat.users, user.name)}
											active={activeChat.id === chat.id}
											onClick={() => { this.props.setActiveChat(chat) }}
										/>
									)
								}

								return null
							})


							:
							differenceBy(users, [user], 'name').users.map((otherUser) => {
								console.log(users)
								return (
									<SideBarOption
										key={otherUser.id}
										name={otherUser.name}
										onClick={() => { this.addChatForUser(otherUser.name) }}
									/>
								)
							})
					} */}

				</div>
				<div className="current-user">
					<span>{user}</span>
					<div onClick={() => { logout() }} title="Logout" className="logout">

					</div>
				</div>

				<div className="side-bar-select">
					<div
						onClick={() => { this.setActiveSideBar(SideBar.type.CHATS) }}
						className={`side-bar-select_option ${(activeSideBar === SideBar.type.CHATS) ? 'active' : ''}`}>
						<span>CHATS</span>
					</div>
				</div>
			</div>
		);
	}
}