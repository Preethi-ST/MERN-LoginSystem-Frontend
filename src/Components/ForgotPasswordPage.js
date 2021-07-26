import {useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import Mail from '../Images/Secure.png'
import FormControl from '../Formik/FormControl'

function ForgotPasswordPage() {
    const [message,setMessage] = useState('');
    const [error,setError] = useState('');
    const history = useHistory();
    const initialValues = {
        email : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required')
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {email} = values
        try{
            var result = await axios.post(`https://auth-mern-server.herokuapp.com/api/auth/forgotpassword`,{email})
            setError(result.data.success)
            setMessage(result.data.data)
        }catch(error){
            setError(error.response.data.success)
            setMessage(error.response.data.error)
        }  
        onSubmitProps.resetForm();
    }
    return (
        <div className="card mx-auto">
            <div className="card-body">
                <h5 className="card-title  text-center font-heading">Forgot Password</h5>
                <img src={Mail}></img>
                <p className={`${error? 'text-success':'text-danger'} small text-center`}>{message}</p>
                <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                <button type='submit' className='my-4 btn btn-block btn-success'>Send Mail</button>
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

export default ForgotPasswordPage
