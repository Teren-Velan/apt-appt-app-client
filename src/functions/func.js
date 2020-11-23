import Axios from 'axios'


async function tokenCheck(setIsAuth, setUserInfo) {
  try {
    let token = localStorage.getItem("token")
    if (token) {
      setIsAuth(true)
      let user = await Axios.get("http://localhost:80/auth/tokencheck", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setUserInfo(user.data.user)
    }
  } catch (error) {
    console.log(error)
  }
}

export {tokenCheck}