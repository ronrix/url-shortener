 export async function signout(navigate: any) {
 fetch("http://localhost:8000/signout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ msg, status }) => {
        // navigate to login page
        console.log(msg);
        if (status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
}