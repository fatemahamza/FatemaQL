export const ID_QUERY =`
query {
    user {
        id
    }
}`;

// normal query
export const USER_QUERY = `
{
            user {
                id
                firstName
            	lastName
                login
                auditRatio
            }
        }
`

export const LEVEL_QUERY = `
{
  "data": {
    "event_user": [
      {
        "level": 25
      }
    ]
  }
}
`;
// {"userID": 425}

// nested query
export const AUDIT_QUERY = `
{
            user {
                audits {
                    private {
                        audit {
                            grade
                            group {
                                members {
                                    userLogin
                                }
                            }
                        }
                    }
                }
            }
        }
`;


// query with an argument
export const XP_VIEW_QUERY = `
{ 
            xp_view(order_by: { amount: desc }) {
                amount
                path
                pathByPath {
                    results {
                        createdAt
                    }
                }
            }
        }
`;


