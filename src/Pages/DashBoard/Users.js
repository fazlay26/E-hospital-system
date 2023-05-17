import React from 'react';
import { useQuery } from 'react-query';
import UserRow from './UserRow';

const Users = () => {
    // const { data: users, isLoading, error, refetch } = useQuery('users', () =>
    //     fetch('http://localhost:5000/user',).then(res =>
    //         res.json()
    //     )
    // )
    //jeshb user signup and login korse  shashokol user ke load  korar way:
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) return 'Loading...'
    return (
        <div>
            <h1>All Users:{users.length}</h1>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* {
                            users.map((user, index) => <UserRow
                                key={user._id}
                                user={user}
                               
                                refetch={refetch}
                            ></UserRow>)
                        } */}
                        {
                            users.map((user, index) => <UserRow
                                key={user._id}
                                user={user}
                                index={index}
                                refetch={refetch}
                            ></UserRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;