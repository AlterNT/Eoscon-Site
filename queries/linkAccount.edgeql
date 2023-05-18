select (
  insert Account {
    account_type := <str>$account_type,
    provider := <str>$provider,
    providerAccountId := <str>$providerAccountId,
    refresh_token := <str>$refresh_token,
    access_token := <str>$access_token,
    expires_at := <int32>$expires_at,
    token_type := <str>$token_type,
    scope := <str>$scope,
    id_token := <str>$id_token,
    session_state := <str>$session_state,

    user := (
      select User
      filter .id = <uuid>$userId
    )
  }
) {
  account_type,
  provider,
  providerAccountId,
  refresh_token,
  access_token,
  expires_at,
  token_type,
  scope,
  id_token,
  session_state,
  user: {
    id
  }
}