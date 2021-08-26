
import nodeFs from "fs";
import bluebird from "bluebird";

const fs = bluebird.promisifyAll(nodeFs);

export const mkdirP = async (directory) => {
    try {
        return await fs.mkdirAsync(directory);
    } catch (error) {
        if (error.code != "EEXIST") {
            throw error;
        }
    }
};
export const USER_EXCLUDES = [
    "id",
    "email",
    "phone_number",
    "password",
    "first_name",
    "last_name",
    "email_verification_code",
    "reset_password_code",
    "refresh_token",
    "auth_key",
    "deleted_at",
];

export const PROFILE_EXCLUDES = [
    "relationship_status",
    "occupation",
    "highest_education",
    "current_education",
    "created_at",
    "updated_at",
    "deleted_at",
    "userId",
];

export const PRODUCT_EXCLUDES = [
    "product_category_id",
    "product_quantity",
    "is_visible",
    "deleted_at",
    "userId",
];
export const STORE_EXCLUDES = [
    "store_phone_number",
    "store_email",
    "is_visible",
    "updated_at",
    "deleted_at",
];
export const PRODUCT_CATEGORY_EXCLUDES = [
    "updated_at",
    "deleted_at",
    "userId",
];
