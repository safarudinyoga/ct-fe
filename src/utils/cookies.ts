import Cookies from 'universal-cookie'

export const COOKIES = new Cookies()

export const SITE_COOKIES = {
  ACCESSTOKEN: '_cariTempatToken',
  NAME: '__cariTempatName',
  FULLNAME: '__cariTempatFullname',
  EMAIL: '__cariTempatEmail',
  PHONE: '__cariTempatPhone',
  DATA: '_cariTempat'
}

export const setCookie = (cname: any, cvalue: any, exdays: any) => {
  var d = new Date()
  var tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + exdays, 3, 0, 0); // clear at 3 am
  d.setTime(tomorrow.getTime())
  var expires = "expires=" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

export const getCookie = (cname: any) => {
  var name = cname + "="
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]

    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }

  return ""
}
