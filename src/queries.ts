//used
export const ID_QUERY =` 
query {
    user {
        id
    }
}`;

// normal query - used
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
`;

// used
export const LEVEL_QUERY = `
query GetTitleData($userId: Int!) {
    event_user(where: { userId: { _eq: $userId }, eventId: { _eq: 20 } }) {
        level
    }
}

`;
// {"userID": 425}

// used
export const TOTAL_XP_AMOUNT = `
query rootEventDetails($userId: Int!) {
    xp: transaction_aggregate(
      where: {
        userId: { _eq: $userId }
        type: { _eq: "xp" }
      }
    ) { aggregate { sum { amount } } }
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


// query with an argument - used
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

// used
export const RADAR_QUERY = `query {
    user(where: {}) {
      transactions(
        order_by: [{type: desc}, {amount: desc}]
        distinct_on: [type]
        where: {
          type: {_in: ["skill_js", "skill_go", "skill_html", "skill_prog", "skill_front-end", "skill_back-end"]}
        }
      ) {
        type
        amount
      }
    }
  }`;

