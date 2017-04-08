export default {
  generateGetDocumentQuery: (userId, roleId, orderDirection, queryParams) => {
    return `SELECT *, COUNT(*) OVER () FROM "Documents"
            WHERE access = 'public'
            OR (access = 'role' AND role_id = ${roleId})
            OR (access = 'private' AND user_id = ${userId})
            ORDER BY publish_date ${orderDirection}
            LIMIT ${queryParams.limit} OFFSET ${queryParams.offset};`;
  },

  generateSearchDocumentQuery: (title, userId, roleId, orderDirection, queryParams) => {
    return `SELECT *, COUNT(*) OVER () FROM "Documents"
            WHERE title ILIKE '%${title}%'
            AND (access = 'public'
            OR (access = 'role' AND role_id = ${roleId})
            OR (access = 'private' AND user_id = ${userId}))
            ORDER BY publish_date ${orderDirection}
            LIMIT ${queryParams.limit} OFFSET ${queryParams.offset};`;
  }
};
