import { ApiSuccessResponse, NotificationMessageSettings } from "@/interfaces";
import http from "@/lib/http/http";

export class APIStore {
    static DEFAULT_MESSAGE_SETTINGS = {
        hideSuccessMessage: false,
        hideErrorMessage: false
    };

    static loginUser = async (data: Record<any, any>, messageSettings?: NotificationMessageSettings) => {
        return await http.post({
            url: "/api/v1/authentication/login",
            data,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        });
    }

    static getUserMeDetails = async (messageSettings?: NotificationMessageSettings) => {
        const response = await http.get({
            url: "/api/v1/users/me",
            messageSettings: messageSettings ?? {
                hideSuccessMessage: true
            }
        });

        return response as ApiSuccessResponse;
    }

    static signUpUser = async (data: Record<any, any>, messageSettings?: NotificationMessageSettings) => {
        return await http.post({
            url: "/api/v1/authentication/register",
            data,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        });
    }

    static verifyUserEmail = async (token: string, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/authentication/verifyEmail/${token}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static forgotPasswordRequest = async (data: Record<any, any>, messageSettings?: NotificationMessageSettings) => {
        return await http.post({
            url: "/api/v1/authentication/forgotPassword/request",
            data,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        });
    }

    static forgotPasswordTokenValidation = async (data: Record<any, any>, messageSettings?: NotificationMessageSettings) => {
        return await http.post({
            url: "/api/v1/authentication/forgotPassword/validate",
            data,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        });
    }

    static resetForgottenPassword = async (data: Record<any, any>, messageSettings?: NotificationMessageSettings) => {
        return await http.put({
            url: "/api/v1/authentication/forgotPassword",
            data,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        });
    }

    static invitationTokenValidation = async (token: string, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/authentication/invitation?token=${token}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static fetchUserFlexibleFields = async (data: Record<any, any>, messageSettings?: NotificationMessageSettings) => {
        const defaultMessageSettings = {
            hideErrorMessage: true,
            hideSuccessMessage: true
        }
        return await http.post({
            url: "/api/v1/users/fields/byKeys",
            data,
            messageSettings: messageSettings ?? defaultMessageSettings
        });
    }
}