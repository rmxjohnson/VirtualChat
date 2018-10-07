import React from 'react';
import './ChatContainer.css';
// import FAVideo from 'react-icons/lib/fa/video-camera'


export default function ({ name, numberOfUsers }) {
	console.log("Number of users = ", numberOfUsers);

	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
			<div className="options">
				{/* <FAVideo /> */}

			</div>
		</div>
	);

}
