export interface IPermissions {
	can_view_letter: boolean;
	can_update_letter: boolean;
	can_submit_letter: boolean;
	can_comment_letter: boolean;
	can_share_letter: boolean;
	can_trash_letter: boolean;
	can_restore_letter: boolean;
	can_remove_from_trash_letter: boolean;
	can_retract_letter: boolean;
	can_archive_letter: boolean;
	can_close_letter: boolean;
	can_publish_letter: boolean;
	can_reject_letter: boolean;
	can_reopen_letter: boolean;
}

export interface IPermissionsInputSerializer {
	user_id: string;
	permissions: string[];
	is_current_user: boolean;
}
