"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeadCollection = getLeadCollection;
const organization_1 = require("./organization");
function getLeadCollection(organizationUid) {
    return `${(0, organization_1.getOrganizationCollection)()}/leads`;
}
