export interface UserClaims {
    sub: string;
    email: string;
    selectedOrganizationUid?: string;
    exp: number;
}
