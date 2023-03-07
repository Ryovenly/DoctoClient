import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase"

const handleSubmit = (testdata) => {
    const ref = collection(firestore, "test_data") // Firebase creates this automatically

    let data = {
        testData: testdata
    }

    try {
        addDoc(ref, data)
        console.log("ça marche")
    } catch (err) {
        console.log(err)
    }
}



const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        return true
    } catch (error) {
        return { error: error.message }
    }
};

const signOut = async () => {
    try {
        await signOut(auth)
        return true
    } catch (error) {
        return false
    }
};

const SignOut = () => {
    const [signOut, loading, error] = useSignOut(auth);
  
    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
        </div>
      );
    }
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="App">
        <button
          onClick={async () => {
            const success = await signOut();
            if (success) {
              alert('You are sign out');
            }
          }}
        >
          Sign out
        </button>
      </div>
    );
  };

export default handleSubmit