import 'whatwg-fetch';

function getCookie(c_name)
{
  var i,x,y,ARRcookies=document.cookie.split(";");

  for (i=0;i<ARRcookies.length;i++)
  {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
      {
          return unescape(y);
      }
   }
}

async function request({ url, data, params = {} }) {
  try {
    // if JWT token is set send in with requests on headers
    if (getCookie('token') ) {
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie('token')
      }
    } else {
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, {
      credentials: 'include',
      headers: headers,
      body: data ? ((data instanceof FormData) ? data : JSON.stringify(data)) : undefined,
      ...params
    })
    const contentType = response.headers.get('content-type');

    if (response.status < 200 || response.status >= 400) {
      const error = Error('API Error');
      error.response = response;
      throw error;
    }

    if (response.status === 200 && contentType.indexOf('application/json') !== -1) {
      return await response.json();
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    // window.alert(JSON.stringify(await err.response.json()));
    // throw  err;
    throw await err.response.json();
  }
}

export function get(url) {
  return request({ url });
}

export function post(url, data) {
  return request({ url, data, params: { method: 'post' } });
}

export function del(url) {
  return request({ url, params: { method: 'delete' } });
}
