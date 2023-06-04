select (
  with session := (
    select Session
    filter .sessionToken = <str>$sessionToken
  )
  update session
  set {
    expires := <optional datetime>$expires ?? session.expires,
    user :=  (
      select User
      filter .id = <optional uuid>$userId ?? session.user.id
    )
  }
) {
  expires,
  sessionToken,
  user: {
    id
  }
}