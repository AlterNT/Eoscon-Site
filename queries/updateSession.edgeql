select (
  update Session
  filter .sessionToken = <str>$sessionToken
  set {
    expires := <datetime>$expires,
    user :=  (
      select User
      filter .id = <uuid>$userId
    )
  }
) {
  expires,
  sessionToken,
  user: {
    id
  }
}