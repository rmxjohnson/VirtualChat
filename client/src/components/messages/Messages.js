import React, { Component } from 'react';
import './Messages.css';


export default class Messages extends Component {
	constructor(props) {
		super(props);

		this.scrollDown = this.scrollDown.bind(this)
	}

	scrollDown() {
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}

	componentDidMount() {
		this.scrollDown()
	}

	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}



	render() {
		const { messages, user, typingUsers } = this.props
		// console.log("Messages in messages.js", messages);
		// console.log(user);

		return (
			<div ref='container'
				className="thread-container">
				<div className="thread">
					{
						messages.map((mes) => {
							// console.log("message id ", mes.id);
							// console.log(mes.message);
							return (
								<div
									key={mes.id}
									className={`message-container ${mes.sender === user.name}`}

								>
									<div className="time">{mes.time}</div>
									<div className="data">
										<div className="message">{mes.message}</div>
										<div className="name">{mes.sender}</div>
									</div>
								</div>

							)
						})
					}
					{
						typingUsers.map((name) => {
							return (
								<div key={name} className="typing-user">
									{`${name} is typing . . .`}
								</div>
							)
						})
					}
				</div>


			</div>
		);
	}
}
