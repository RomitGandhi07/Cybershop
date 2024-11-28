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

    static getOrganizationDetails = async (messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/users/organizations`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        });
    }

    static getOrganizationMembers = async (messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/users/organizations/members`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        });
    }

    static inviteOrganizationMember = async (email: string,messageSettings?: NotificationMessageSettings) => {
        return await http.put({
            url: `/api/v1/users/organizations/members/invite`,
            data: {
                email
            },
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        });
    }

    // Marketplace
    static getSevices = async (queryParams: string, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/marketplace/services${queryParams ? `?${queryParams}` : ""}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static createJobPost = async (data: Record<string, string>, messageSettings?: NotificationMessageSettings) => {
        return await http.post({
            url: `/api/v1/marketplace/jobs`,
            data,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static updateJobPost = async (jobId: string, data: Record<string, any>, messageSettings?: NotificationMessageSettings) => {
        const defaultMessageSettings = {
            hideSuccessMessage: true
        }

        return await http.put({
            url: `/api/v1/marketplace/jobs/${jobId}`,
            data,
            messageSettings: messageSettings ?? defaultMessageSettings
        })
    }

    static getMostRecentJobsForServiceProvider = async (search: string | null, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/marketplace/jobs/serviceProvider${search ? `?search=${search}` : ""}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static getWishlistedJobsForServiceProvider = async (search: string | null, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/marketplace/jobs/serviceProvider/wishlist${search ? `?search=${search}` : ""}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static getActiveJobsForClient = async (search: string | null, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/marketplace/jobs/client${search ? `?search=${search}` : ""}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static getDraftJobsForClient = async (search: string | null, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/marketplace/jobs/client/draft${search ? `?search=${search}` : ""}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static getCompletedJobsForClient = async (search: string | null, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/marketplace/jobs/client/completed${search ? `?search=${search}` : ""}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static getJobPostDetailsForServiceProvider = async (jobId: string, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/marketplace/jobs/${jobId}/serviceProvider`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static getJobPostDetailsForClient = async (jobId: string, messageSettings?: NotificationMessageSettings) => {
        return await http.get({
            url: `/api/v1/marketplace/jobs/${jobId}/client`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static deleteJobPost = async (jobId: string, messageSettings?: NotificationMessageSettings) => {
        return await http.delete({
            url: `/api/v1/marketplace/jobs/${jobId}`,
            messageSettings: messageSettings ?? APIStore.DEFAULT_MESSAGE_SETTINGS
        })
    }

    static wishlistJobPost = async (jobId: string, data: Record<string, any>, messageSettings?: NotificationMessageSettings) => {
        const defaultMessageSettings = {
            hideSuccessMessage: true
        }

        return await http.put({
            url: `/api/v1/marketplace/jobs/${jobId}/wishlist`,
            data,
            messageSettings: messageSettings ?? defaultMessageSettings
        })
    }
}