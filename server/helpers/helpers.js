export default {
  generateGetDocumentQuery: (userId, roleId, orderDirection, queryParams) => {
    return `SELECT "Documents".*, "Users".first_name as first_name,
            "Users".last_name as last_name, COUNT(*) OVER () FROM "Documents"
            LEFT OUTER JOIN "Users" ON ("Documents".user_id = "Users".id)
            WHERE access = 'public'
            OR (access = 'role' AND "Documents".role_id = ${roleId})
            OR (access = 'private' AND "Documents".user_id = ${userId})
            ORDER BY publish_date ${orderDirection}
            LIMIT ${queryParams.limit} OFFSET ${queryParams.offset};`;
  },

  generateSearchDocumentQuery: (title, userId, roleId, orderDirection, queryParams) => {
    return `SELECT "Documents".*, "Users".first_name as first_name,
            "Users".last_name as last_name, COUNT(*) OVER () FROM "Documents"
            LEFT OUTER JOIN "Users" ON ("Documents".user_id = "Users".id)
            WHERE "Documents".title ILIKE '%${title}%'
            AND (access = 'public'
            OR (access = 'role' AND "Documents".role_id = ${roleId})
            OR (access = 'private' AND "Documents".user_id = ${userId}))
            ORDER BY publish_date ${orderDirection}
            LIMIT ${queryParams.limit} OFFSET ${queryParams.offset};`;
  }
};
