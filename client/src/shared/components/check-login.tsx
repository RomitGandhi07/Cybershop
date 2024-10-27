"use client";
import { useEffect } from 'react';

// import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUserInfo } from '@/store/slices/user';
import { loadingReducer } from '@/store/slices/loading';
import { APIStore } from '@/utils/api-store';
import { UserState } from '@/interfaces';

function CheckLogin() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);
//   const router = useRouter();

//   const redirectToLogin = () => {
//     if (!router.asPath.startsWith('/login')) {
//       const loginURL = `/login?state=${router.asPath}`;
//       router.push(loginURL);
//     }
//   };

//   // This function is responsible for if route is /login then redirects it to / path.
//   const restrictLoginRouteIfLoggedIn = () => {
//     if (router.asPath.startsWith('/login')) {
//       router.push('/');
//     }
//   };

  const showScreenContent = () => {
    const mainContent = document.querySelector('.__main');
    mainContent?.classList.remove('none');
  };

  const checkLoginState = async () => {
    try {
      dispatch(loadingReducer({ isAppLoading: true }));

      // Fetch the user details and update the user info in the redux store
      const userDetails = await APIStore.getUserMeDetails();
      dispatch(updateUserInfo(userDetails.data as UserState));
        
    //   restrictLoginRouteIfLoggedIn();
      
    } catch (e) {
      // eslint-disable-next-line no-console
    //   redirectToLogin();
    } finally {
      dispatch(loadingReducer({ isAppLoading: false }));
      showScreenContent();
    }
  };

  useEffect(() => {
    if (!userId) {
      checkLoginState();
    }
  });

  return null;
}

export default CheckLogin;
