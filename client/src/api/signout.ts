 export async function signout(navigate: any) {
  fetch(import.meta.env.VITE_BACKEND_URL + "signout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ msg, status }) => {
        // navigate to login page
        if (status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
}