import {useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'

import FormControl from '../Formik/FormControl'

function LoginPage() {
    const [message,setMessage] = useState('');
    const history = useHistory();
    const initialValues = {
        email : '',
        password : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required'),
        password : Yup.string().required('Please Enter your password')       
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {email,password} = values
        try{
            var result = await axios.post(`https://mern-authentication-server.herokuapp.com/api/auth/login`,{email,password})
            console.log(result);
            localStorage.setItem('auth-token',result.data.token)
            history.push('/Authorized')
        }catch(error){
            setMessage(error.response.data.error)
        }  
        onSubmitProps.resetForm();
        
    }
    return (
        <div className="card mx-auto">
            <div className="card-body">
                <h5 className="card-title  text-center font-heading">Login</h5>
                <p className='text-danger text-center small'>{message}</p>
                <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                <FormControl control = 'input' type= 'password' label = 'Password' name='password' additional = 'forgotpassword' />
                                <button type='submit' className='my-4 btn btn-block btn-success'>Login</button>
                            </Form>
                        )
                    }
                </Formik>
                <span className='small'>
                    Don't have an account?  
                    
                    <Link to='/register' style={{ textDecoration: 'none' }}>    Register</Link> 
                </span>
            </div>
        </div>
    )
}

export default LoginPage
