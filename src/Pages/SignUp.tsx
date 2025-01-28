import axios from 'axios';
import { useState } from 'react'
import '../Styles/signup.css'

function SignUp() {

  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    axios.post('http://localhost:3003/signup', { email, password, username })
      .then(result => {
        console.log(result);
        setUsername('');
        setPassword('');
        setEmail('');
      })
      .catch(err => console.log(err));
    alert(`Sign up completed ${username}`)

  }

  return (
    <>
      <div className='main'>
        <div className="container">
          <div className="head">
            <h1>Create your account</h1>
            <p>It's quick and easy</p>
            <img src="https://cdn2.iconfinder.com/data/icons/media-controls-5/100/close-1024.png" alt="close button" />
          </div>
          <hr />
          <div className="form-container">
            <form>
              <label htmlFor='username'>Name :</label>
              <input
                className='label-login'
                id='username'
                type="text" placeholder='Enter your name'
                onChange={(e) => setUsername(e.target.value)}
              /><br />
              <label htmlFor="email">Email :</label>
              <input
                id='email'
                className='label-login'
                type="text"
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
              /><br />
              <label htmlFor="password">Password :</label>
              <input
                id='password'
                className='label-login'
                type="password"
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
              /><br />
              <div className='signin-link'>
                <p>Already an account? <a href="#">Sign in</a></p>
              </div>
              <button onClick={handleSubmit} className='mt-3'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp