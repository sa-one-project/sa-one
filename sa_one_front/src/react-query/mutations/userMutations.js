import { deleteUserAccount } from "../../apis/users/usersApi"

export const useDeleteUserMutation = () => {
    return useMutation({
        mutationFn: deleteUserAccount,
        onSuccess: () => {
            // 성공 시 알림, 이동...
        }
    });
};