import {useState} from 'react'
import { useHistory,useParams } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'

import Mail from '../Images/Secure.png'
import FormControl from '../Formik/FormControl'

function ResetPasswordPage() {
    const [message,setMessage] = useState('');
    const [error,setError] = useState('');
    const history = useHistory();
    const URLToken = useParams();
    const initialValues = {
        password : '',
        confirmpassword : ''
    }
    const validationSchema = Yup.object({
        password : Yup.string()
            .required('Enter your password')
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const onSubmit = async (values,onSubmitProps) => {
        
        const {password} = values
        try{
            const result = await axios.put(`https://auth-mern-server.herokuapp.com/api/auth/resetpassword/${URLToken.resetToken}`,{password})
            setError(result.data.success)
            setMessage(result.data.data)
        }catch(error){
            console.log(error.response.data.success, error.response.data.data)
            setError(error.response.data.success);
            setMessage(error.response.data.data)
        }
        onSubmitProps.resetForm();
        
    }
    return (
        <div className="card mx-auto">
            <div className="card-body">
                <h5 className="card-title  text-center font-heading">Reset Password</h5>
                <img src={Mail}></img>
                <p className={`${error? 'text-success':'text-danger'} small text-center`}>{message}</p>
                <span>{error ? <Link to ='/login' class='small text-center mb-4'>Login to Continue</Link> : ''}</span>
                <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <FormControl control = 'input' type= 'password' label = 'Password' name='password' />
                                <FormControl control = 'input' type= 'password' label = 'Confirm Password' name='confirmpassword' />
                                <button type='submit' className='my-4 btn btn-block btn-success'>Reset</button>
                            </Form>
                        )
                    }
                </Formik>
                <span className='small'>
                    Remember Password?    
                    
                    <Link to='/login' style={{ textDecoration: 'none' }}>    Login</Link> 
                </span>
            </div>
        </div>
    )
}

export default ResetPasswordPage
