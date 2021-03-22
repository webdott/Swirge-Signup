import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { encodePassword } from '../functions/encode';

const testValue = (param, value) => {
    let re;

    switch(param) {
        case 'fullname':
            re = /^[^0-9\s]*[^0-9]+$/
            break;
        case 'email':
            re = /^[^.\s].*@([a-zA-Z])+(\.(com|net|info|de|org))$/
            break;
        case 'password':
            re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            break;
        default:
            re = null
            break;
    }

    return re.test(value);

}

const Form = () => {
    const spinner = useRef(null);
    const status = useRef(null);
    const submit = useRef(null);
    const agree = useRef(null);
    const signup = useRef(null);
    const errorMessage1 = useRef(null);
    const errorMessage2 = useRef(null);
    const errorMessage3 = useRef(null);
    const errorMessage4 = useRef(null);
    const errorMessage = [errorMessage1, errorMessage2, errorMessage3, errorMessage4];
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const setInputValue = (e) => {
        if(e.target.id === 'fullname'){
            setFullName(e.target.value);
        } else if(e.target.id === 'email'){
            setEmail(e.target.value);
        } else if(e.target.id === 'password'){
            setPassword(e.target.value);
        } else if(e.target.id === 'confirm-password'){
            setConfirmPassword(e.target.value);
        }
    }

    const testName = (value, number) => {
        if (!testValue('fullname', value)) {
            errorMessage[number].current.innerHTML = 'sorry, enter a valid name'
        } else {
            errorMessage[number].current.innerHTML = '<i class="fas fa-check"></i>'
        }
        isDisabled();
    }
    
    const testEmail = (value, number) => {
        if (!testValue('email', value)) {
            errorMessage[number].current.innerHTML = 'sorry, enter a valid email adress e.g: example@example.com'
        } else {
            errorMessage[number].current.innerHTML = '<i class="fas fa-check"></i>'
        }
        isDisabled();
    }
    
    const testPassword = (value, number) => {
        if ((testValue('password', value)) && value.length >= 8) {
            errorMessage[number].current.innerHTML = '<i class="fas fa-check"></i>'
        } else {
            errorMessage[number].current.innerHTML = 'password must be 8 characters with at least a special character, lowercase and uppercase letter'
        }
        isDisabled();
    }

    const confirmPasswordValue = (e) => {
        e.preventDefault();
        if ((password === confirmPassword && confirmPassword.length >= 8)) {
            errorMessage[2].current.innerHTML = '<i class="fas fa-check"></i>'
            errorMessage[3].current.innerHTML = '<i class="fas fa-check"></i>'
        } else {
            errorMessage[2].current.innerHTML = 'passwords must match'
            errorMessage[3].current.innerHTML = 'passwords must match'
        }
        isDisabled();
    }

    const isDisabled = () => {
        if(
            errorMessage.filter(err => err.current.innerHTML !== '<i class="fas fa-check"></i>').length === 0 &&
            agree.current.checked
        ){
            submit.current.disabled = false;
        } else {
            submit.current.disabled = true;
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        spinner.current.classList.remove('none');
        console.log('encoded password:', encodePassword(password));
        status.current.innerHTML = 'form submitted successfully';
        setTimeout(() => {
            spinner.current.classList.add('none');
            errorMessage.forEach(err => err.current.innerHTML = '')
            signup.current.reset();
            setFullName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            status.current.innerHTML = ''
        }, 2000)
    }

    return (
        <>
            <p className="form__submission__status" ref={status}></p>
            <div className="form__card">
                <form action="" method="post" className="signup" ref={signup} onSubmit={submitForm}>
                    <div className="top">
                        <h2>Sign Up</h2>
                        <p>Please fill in this from to create an account!</p>
                    </div>

                    <div className="inputs">
                        <label htmlFor="fullname">
                            <input 
                            type="text" 
                            placeholder="Fullname" 
                            id='fullname' 
                            value={fullName}
                            onKeyUp={() => testName(fullName, 0)}
                            onChange={(e) => setInputValue(e)}
                            />
                            <p className="error__message" ref={errorMessage1}></p>
                        </label>
                        <label htmlFor="email">
                            <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Email" 
                            value={email}
                            onKeyUp={() => testEmail(email, 1)}
                            onChange={(e) => setInputValue(e)}
                            />
                            <p className="error__message" ref={errorMessage2}></p>  
                        </label>
                        <label htmlFor="password">
                            <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password" 
                            value={password}
                            onKeyUp={() => testPassword(password, 2)}
                            onChange={(e) => setInputValue(e)}
                            />
                            <p className="error__message" ref={errorMessage3}></p>
                        </label>
                        <label htmlFor="confirm-password">
                            <input 
                            type="password" 
                            name="confirm-password" 
                            id="confirm-password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onKeyUp={(e) => confirmPasswordValue(e)}
                            onChange={(e) => setInputValue(e)}
                            />
                            <p className="error__message" ref={errorMessage4}></p>
                        </label>
                    </div>
                    
                    <div className="agree">
                        <label htmlFor="agree">
                            <input type="checkbox" name="agree" id="agree" ref={agree} onClick={() => isDisabled()}/>
                            I accept the <Link to="#">Terms of Use</Link> & <Link to="#">Privacy Policy</Link>
                        </label>
                    </div>
                    <button type="submit" id="submit" disabled={true} ref={submit}>
                        SignUp
                    </button>
                </form>
            </div>

            <div className="login__cta">
                <p>Already have an account?</p>
                <Link to="#">Login</Link>
            </div>

            <section className="spinner none" ref={spinner}><div className="lds-facebook"><div></div><div></div><div></div></div></section>
        </>
    );
}

export default Form;

