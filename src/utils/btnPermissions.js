import $session from './session'
export function hasPermission (perm) {
  let permissionBtns = $session.get('btnPermissions')
  let btnName = permissionBtns.map(res => {
    return res.name
  })
  return btnName.indexOf(perm) > -1
}
