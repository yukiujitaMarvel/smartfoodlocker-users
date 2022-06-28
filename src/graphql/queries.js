/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItemList = /* GraphQL */ `
  query GetItemList($item_id: String!) {
    getItemList(item_id: $item_id) {
      item_id
      item_img
      category_id
      item_name
      item_price
      remaiks
      release
      create_at
      update_at
      delete_at
      create_user
      update_user
      delete_user
      logical_deletion_flg
    }
  }
`;
export const listItemLists = /* GraphQL */ `
  query ListItemLists($limit: Int, $nextToken: String) {
    listItemLists(limit: $limit, nextToken: $nextToken) {
      items {
        item_id
        item_img
        category_id
        item_name
        item_price
        remaiks
        release
        create_at
        update_at
        delete_at
        create_user
        update_user
        delete_user
        logical_deletion_flg
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($user_id: String!) {
    getUser(user_id: $user_id) {
      user_id
      user_name
      user_email
      user_number
      create_at
      update_at
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers($limit: Int, $nextToken: String) {
    listUsers(limit: $limit, nextToken: $nextToken) {
      items {
        user_id
        user_name
        user_email
        user_number
        create_at
        update_at
      }
      nextToken
    }
  }
`;
