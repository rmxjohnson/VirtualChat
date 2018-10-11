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
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { receiver } = this.state
		const { onSendPrivateMessage } = this.props
		onSendPrivateMessage(receiver);

	}
	addChatForuser = (username) => {

		this.setActiveSideBar(SideBar.type.CHATS)
		this.props.onSendPrivateMessage(username)
	}

	setActiveSideBar = (newSideBar) => {
		this.setState({ activeSideBar: newSideBar })
	}


	render() {
		const { chats, activeChat, user, setActiveChat, logout, users } = this.props
		const { receiver, activeSideBar } = this.state
		return (
			<div className="SidebarChat">
				<div id="side-bar">

				</div>
				<form onSubmit={this.handleSubmit} className="search">

					<input placeholder="Search"
						type="text"
						value={receiver}
						onChange={(e) => { this.setState({ receiver: e.target.value }) }} />
					<div className="plus"></div>
				</form>

				<div
					onClick={() => { this.setActiveSideBar(SideBar.type.CHATS) }}
					className={`side-bar-select_option ${(activeSideBar === SideBar.type.CHATS) ? 'active' : ''}`}>
					<span>CHATS</span>
				</div>

				<div
					className="users"
					ref='users'
					onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null) }}>

					{
						activeSideBar === SideBar.type.CHATS ?
							chats.map((chat) => {
								if (chat.name) {
									const lastMessage = chat.messages[chat.messages.length - 1];
									const chatSideName = chat.users.find((name) => {
										return name !== user.name
									}) || "COMMUNITY"
									const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''

									return (
										<div
											key={chat.id}
											className={`user ${classNames}`}
											onClick={() => { setActiveChat(chat) }}
										>
											<div className="user-photo">{chatSideName[0].toUpperCase()}</div>
											<div className="user-info">
												<div className="name">{chatSideName}</div>
											</div>

										</div>
									)
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
								return (
									<SideBarOption
										key={otherUser.id}
										name={otherUser.name}
										onClick={() => { this.addChatForUser(otherUser.name) }}
									/>
								)
							})
					}
					<div className="side-bar-select">

					</div>
					<div
						onClick={() => { this.setActiveSideBar(SideBar.type.USERS) }}
						className={`side-bar-select_option ${(activeSideBar === SideBar.type.USERS) ? 'active' : ''}`} >
						<span>USERS</span>
					</div>
				</div>
				<div className="current-user">

					<span>
						<ul>
							{users.map(p => <li key={p.id}>{p.name}</li>)}
						</ul>
					</span>
					<div onClick={() => { logout() }} title="Logout" className="logout">

					</div>
				</div>
			</div>
		);
	}
}

