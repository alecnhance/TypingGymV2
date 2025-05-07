import { useState } from 'react';

const ProfileSettings = () => {
    const [username, setUsername] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [goal, setGoal] = useState('');

    const saveChanges = () => {

    }

    return (
        <div className='flex flex-col w-full min-h-screen items-center justify-center gap-8 py-[5%]'>
            <style>
            {`
                input:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px #161616 inset;
                -webkit-text-fill-color: white;
                transition: background-color 5000s ease-in-out 0s;
                }
            `}
            </style>

            <h2 className='text-large'>Profile</h2>
            <div className='flex flex-col w-full items-center h-[50%] gap-4'>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 rounded bg-mainBackground text-white border border-headerGray w-[50%] focus:outline-navOrange"
                    placeholder="username"
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 rounded bg-mainBackground text-white border border-headerGray w-[50%] focus:outline-navOrange"
                    placeholder="email"
                />
                <input
                    type="text"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="p-2 rounded bg-mainBackground text-white border border-headerGray w-[50%] focus:outline-navOrange"
                    placeholder="first name"
                />
                <input
                    type="text"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className="p-2 rounded bg-mainBackground text-white border border-headerGray w-[50%] focus:outline-navOrange"
                    placeholder="last name"
                />
                <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="p-2 rounded bg-mainBackground text-white border border-headerGray w-[50%] focus:outline-navOrange"
                    placeholder="goal"
                />
            </div>
            <div className='flex w-full justify-center gap-4'>
                <button className='p-2 underline bg-mainBackground rounded-2xl text-white font-extralight decoration-[1px]'>
                    Change Password
                </button>
                <button
                    onClick={saveChanges}
                    className='py-2 px-4 bg-navOrange rounded-2xl text-white'
                >
                    Save
                </button>

            </div>
        </div>
    );
};

export default ProfileSettings;