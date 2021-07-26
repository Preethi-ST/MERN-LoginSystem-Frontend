import {useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'

import FormControl from '../Formik/FormControl'

function RegisterPage() {
    const [message,setMessage] = useState('');
    const history = useHistory();
    const initialValues = {
        username : '',
        email : '',
        password : '',
        confirmpassword : ''
    }
    const validationSchema = Yup.object({
        username : Yup.string().required('Name is mandatory').min(5, 'Name must atleast contain 3 characters'),
        email : Yup.string().email('Enter valid email').required('Email is required'),
        password : Yup.string()
            .required('Please Enter your password')
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const onSubmit = async (values) => {
        const {username,email,password} = values
        try{
            const result = await axios.post(`https://mern-auth-nodemailer.herokuapp.com/api/auth/register`,{username,email,password})
            history.push('/login')
        }catch(error){
            setMessage(error.response.result.message || error.response.result.error)
        }
        
        
    }
    return (
        <div className="card mx-auto">
            <div className="card-body">
                <h5 className="card-title  text-center font-heading">Register</h5>
                <p className='text-danger'>{message}</p>
                <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <FormControl control = 'input' type= 'text' label = 'UserName' name='username' />
                                <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                <FormControl control = 'input' type= 'password' label = 'Password' name='password' />
                                <FormControl control = 'input' type= 'password' label = 'Confirm Password' name='confirmpassword' />
                                <button type='submit' className='my-4 btn btn-block btn-success'>Register</button>
                            </Form>
                        )
                    }
                </Formik>
                <span className='small'>
                    Already have an account?    
                    
                    <Link to='/login' style={{ textDecoration: 'none' }}>    Login</Link> 
                </span>
            </div>
        </div>
    )
}

export default RegisterPage
