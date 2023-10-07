import { useState } from 'react';

export default function App() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [gender, setGender] = useState('Male');
	const [friendsList, setFriendsList] = useState([]);

	function submitFriend(e) {
		e.preventDefault();

		if (!firstName || !lastName || !phoneNumber) return;

		setFriendsList((friend) => {
			return [
				...friend,
				{ id: Date.now(), firstName, lastName, phoneNumber, gender },
			];
		});

		setFirstName('');
		setLastName('');
		setPhoneNumber('');
		setGender('Male');
	}

	function deleteFriend(id) {
		setFriendsList((friends) => friends.filter((friend) => friend.id !== id));
	}

	return (
		<>
			<Header />
			<Form
				firstName={firstName}
				setFirstName={setFirstName}
				lastName={lastName}
				setLastName={setLastName}
				phoneNumber={phoneNumber}
				setPhoneNumber={setPhoneNumber}
				gender={gender}
				setGender={setGender}
				onSubmit={submitFriend}
			/>
			<FriendsList friendsList={friendsList} deleteFriend={deleteFriend} />
		</>
	);
}

function Header() {
	return <h1>Friends List</h1>;
}

function Form({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	phoneNumber,
	setPhoneNumber,
	gender,
	setGender,
	onSubmit,
}) {
	return (
		<form className='form-add-friend' onSubmit={onSubmit}>
			<label>
				<input
					type='text'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				First Name
			</label>
			<label>
				<input
					type='text'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				Last Name
			</label>
			<label>
				<input
					type='text'
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				Phone number
			</label>
			<select value={gender} onChange={(e) => setGender(e.target.value)}>
				<option value='Male'>Male</option>
				<option value='Female'>Female</option>
			</select>
			<button>Add friend</button>
		</form>
	);
}

function FriendsList({ friendsList, deleteFriend }) {
	return (
		<ul className='friends-list'>
			{friendsList.map((friend) => (
				<FriendItem friend={friend} deleteFriend={deleteFriend} />
			))}
		</ul>
	);
}

function FriendItem({ friend, deleteFriend }) {
	return (
		<li key={friend.id}>
			<div className='picture'></div>
			<div className='friend-info'>
				<h3>
					{friend.firstName} {friend.lastName}
				</h3>
				<p className={friend.gender === 'Male' ? 'male' : 'female'}>
					{friend.gender}
				</p>
				<p>{friend.phoneNumber}</p>
			</div>
			<button className='btn' onClick={() => deleteFriend(friend.id)}>
				Delete
			</button>
		</li>
	);
}
