
import { baseURL } from '@/constants'
import { auth } from '@/auth'
import UserEdirForm from './_component/UserEdirForm'

const fetchUserData = async () => {
    try {
        const session: any = await auth()
        const res = await fetch(`${baseURL}/user/details/${session?.user.username}`);
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
        throw Error("Error while fetching the data")
    }
}


const EditProfilePage = async () => {
    const data = await fetchUserData()
    return (
        <UserEdirForm data={data} />

    )
}

export default EditProfilePage