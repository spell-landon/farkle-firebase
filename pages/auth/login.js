import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import React, { useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase } from 'firebase/auth';

const Login = () => {
  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      route.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  // Sign in with Facebook
  const fbProvider = new FacebookAuthProvider();
  const FacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      console.log('Result: ', result);
      const credential = await FacebookAuthProvider.credentialFromResult(
        result
      );
      const token = credential.accessToken;
      let photoURL = result.user.photoURL + '?height=500&access_token=' + token;
      await updateProfile(auth.currentUser, { photoURL: photoURL });
      console.log(result);
      route.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push('/dashboard');
    }
  }, [user]);

  return (
    <div className='py-8 px-6 w-full max-w-lg mx-auto shadow-xl rounded-lg flex flex-col gap-4'>
      <h2 className='text-3xl font-medium'>Join today!</h2>
      <div>
        <h3>Sign in with one of the providers!</h3>
      </div>
      <div className='flex flex-col gap-2'>
        <button
          className='flex items-center py-3 px-2 border gap-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white'
          onClick={GoogleLogin}>
          <FcGoogle className='text-2xl' />
          Sign in with Google
        </button>
        <button
          className='flex items-center py-3 px-2 border gap-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white'
          onClick={FacebookLogin}>
          <AiFillFacebook className='text-2xl text-blue-400' />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
