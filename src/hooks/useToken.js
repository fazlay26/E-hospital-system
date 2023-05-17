//ei code  ta signup and login 2 jaigai use korte hobe tai erokom ekta custom hooks baniyechi:
import { useEffect, useState } from "react"

const useToken = (user) => {//ei user ke console korle dekhte parbo  user er vitore arekta user ase
    const [token, setToken] = useState('') //token  kono string hote pare tai etar default value empty string
    useEffect(() => {
        const email = user?.user?.email
        const currentUser = { email: email }//amra email take database e rakhtesi
        //jodi email ta thake tahole amra  take backend e pathabo:
        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser) //body diye amra data pathai
            })
                .then(res => res.json())
                .then(data => {
                    console.log('data inside useToken', data);
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken)
                    setToken(accessToken)
                })
        }


    }, [user])
    return [token]
}
export default useToken;