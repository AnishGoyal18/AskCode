import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const data = await getDocs(collection(db, 'users'));
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    return (
        <div>
            {users.map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default Users;