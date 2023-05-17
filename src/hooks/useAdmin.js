//je admin na take amra all user button ta dekhaboi na shetar jonne ekta hook baniyechi:
import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false); //backend theke boolean value ashbe taile amra useState er initial value false diyechi
    const [adminLoading, setAdminLoading] = useState(true);//admin er data ta load hoye ashar jonne ekta loader lagbe tai adminLoading ke useAdmin hook theke pathai disi
    useEffect(() => {
        const email = user?.email;
        if (email) { //backend  e call pathachci:
            fetch(`http://localhost:5000/admin/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.admin); //admin ta backend theke ashce
                    setAdminLoading(false);
                })
        }
    }, [user]) //user change hoile etake cl korte hobe tai dependency hishebe user diyechi

    return [admin, adminLoading]
}

export default useAdmin;