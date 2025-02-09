"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganizationInvitationCollection = getOrganizationInvitationCollection;
const organization_1 = require("./organization");
function getOrganizationInvitationCollection(organizationUid) {
    return `${(0, organization_1.getOrganizationCollection)()}/${organizationUid}/invitations`;
}
