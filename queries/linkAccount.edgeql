select (
  insert Account {
    account_type := <str>$account_type,
    provider := <str>$provider,
    providerAccountId := <str>$providerAccountId,
    refresh_token := <optional str>$refresh_token,
    access_token := <optional str>$access_token,
    expires_at := <optional int64>$expires_at,
    token_type := <optional str>$token_type,
    scope := <optional str>$scope,
    id_token := <optional str>$id_token,
    session_state := <optional str>$session_state,

    user := (
      select User
      filter .id = <uuid>$userId
    )
  }
) {
  id,
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