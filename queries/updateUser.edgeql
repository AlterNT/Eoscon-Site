select (
  update User
  filter .id = <uuid>$id
  set {
    name := <str>$name,
    image := <str>$image,
    email := <str>$email,
    emailVerified := <datetime>$emailVerified,
    is_admin := <bool>$is_admin
  }
) {
  id,
  name,
  image,
  email,
  emailVerified,
  is_admin
}