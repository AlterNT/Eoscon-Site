select (
  update User
  filter .id = <uuid>$id
  set {
    name := <optional str>$name,
    image := <optional str>$image,
    email := <optional str>$email,
    emailVerified := <optional datetime>$emailVerified,
    is_admin := <optional bool>$is_admin
  }
) {
  id,
  name,
  image,
  email,
  emailVerified,
  is_admin
}