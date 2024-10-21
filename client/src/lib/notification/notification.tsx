import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { NotificationTypesEnum } from '@/enums/notification-types.enum';
import { DEFAULT_NOTIFICATION_DISPLAY_TIME } from '@/utils';
import SuccessIcon from '@/shared/icons/success-icon';
import WarningIcon from '@/shared/icons/warning-icon';
import ErrorIcon from '@/shared/icons/error-icon';
import InfoIcon from '@/shared/icons/info-icon';
import NotificationCloseIcon from '@/shared/icons/notification-close-icon';
import { IToastCodeProps } from '@/interfaces';


export function Notification({
  type,
  message,
  timeout = DEFAULT_NOTIFICATION_DISPLAY_TIME,
}: {
    type: NotificationTypesEnum,
    message: string,
    timeout?: number
}) {
  const toastOptions: IToastCodeProps = {
    position: 'top-center',
    autoClose: timeout,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
  };

  switch (type) {
    case NotificationTypesEnum.SUCCESS:
      // @ts-ignore
      toast.success(message, { ...toastOptions, icon: <SuccessIcon/> });
      break;
    case NotificationTypesEnum.ERROR:
      // @ts-ignore
      toast.error(message, { ...toastOptions, icon: <ErrorIcon/> });
      break;
    case NotificationTypesEnum.INFO:
      // @ts-ignore
      toast.info(message, { ...toastOptions, icon: <InfoIcon/> });
      break;
    case NotificationTypesEnum.WARN:
      // @ts-ignore
      toast.warn(message, { ...toastOptions, icon: <WarningIcon/> });
      break;
    default:
      break;
  }
  return null;
}
function NotificationWrapper() {
  return (
        <ToastContainer
            role="alert"
            transition={Slide}
            closeButton={<button className={'Toastify__close-button'}><NotificationCloseIcon/></button>}
        />
  );
}
export default NotificationWrapper;

