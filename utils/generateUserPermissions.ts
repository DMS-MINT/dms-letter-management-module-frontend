import {
	PermissionsResponseType,
	PermissionsType,
} from "@/types/letter_module";

export default function generateUserPermissions(
	permissions: PermissionsResponseType[]
): PermissionsType {
	const currentUserPerms =
		permissions.find((perms) => perms.is_current_user)?.permissions || [];

	const newPerms: PermissionsType = {
		can_view_letter: false,
		can_update_letter: false,
		can_submit_letter: false,
		can_comment_letter: false,
		can_share_letter: false,
		can_trash_letter: false,
		can_restore_letter: false,
		can_permanently_delete_letter: false,
		can_retract_letter: false,
		can_archive_letter: false,
		can_close_letter: false,
		can_publish_letter: false,
		can_reject_letter: false,
		can_reopen_letter: false,
	};

	currentUserPerms.forEach((permission) => {
		newPerms[permission as keyof PermissionsType] = true;
	});

	return newPerms;
}
