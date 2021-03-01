let appName;
let popupMask;
let popupDialog;
let clientId;
let realm;
let redirect_uri;
let clientSecret;
let scopeSeparator;
let additionalQueryStringParams;

function handleLogin() {
  const scopes = [];

  const auths = window.swaggerUi.api.authSchemes || window.swaggerUi.api.securityDefinitions;
  if (auths) {
    let key;
    const defs = auths;
    for (key in defs) {
      const auth = defs[key];
      if (auth.type === 'oauth2' && auth.scopes) {
        var scope;
        if (Array.isArray(auth.scopes)) {
          // 1.2 support
          var i;
          for (i = 0; i < auth.scopes.length; i++) {
            scopes.push(auth.scopes[i]);
          }
        } else {
          // 2.0 support
          for (scope in auth.scopes) {
            scopes.push({ scope, description: auth.scopes[scope], OAuthSchemeKey: key });
          }
        }
      }
    }
  }

  if (window.swaggerUi.api
    && window.swaggerUi.api.info) {
    appName = window.swaggerUi.api.info.title;
  }

  $('.api-popup-dialog').remove();
  popupDialog = $(
    [
      '<div class="api-popup-dialog">',
      '<div class="api-popup-title">Select OAuth2.0 Scopes</div>',
      '<div class="api-popup-content">',
      '<p>Scopes are used to grant an application different levels of access to data on behalf of the end user. Each API may declare one or more scopes.',
      '<a href="#">Learn how to use</a>',
      '</p>',
      `<p><strong>${appName}</strong> API requires the following scopes. Select which ones you want to grant to Swagger UI.</p>`,
      '<ul class="api-popup-scopes">',
      '</ul>',
      '<p class="error-msg"></p>',
      '<div class="api-popup-actions"><button class="api-popup-authbtn api-button green" type="button">Authorize</button><button class="api-popup-cancel api-button gray" type="button">Cancel</button></div>',
      '</div>',
      '</div>'
    ].join('')
  );
  $(document.body).append(popupDialog);

  popup = popupDialog.find('ul.api-popup-scopes').empty();
  for (i = 0; i < scopes.length; i++) {
    scope = scopes[i];
    str = `<li><input type="checkbox" id="scope_${i}" scope="${scope.scope}"` + `" oauthtype="${scope.OAuthSchemeKey}"/>` + `<label for="scope_${i}">${scope.scope}`;
    if (scope.description) {
      if ($.map(auths, (n, i) => i).length > 1) // if we have more than one scheme, display schemes
	    { str += `<br/><span class="api-scope-desc">${scope.description} (${scope.OAuthSchemeKey})` + '</span>'; } else str += `<br/><span class="api-scope-desc">${scope.description}</span>`;
    }
    str += '</label></li>';
    popup.append(str);
  }

  const $win = $(window);
  const dw = $win.width();
  const dh = $win.height();
  const st = $win.scrollTop();
  const dlgWd = popupDialog.outerWidth();
  const dlgHt = popupDialog.outerHeight();
  const top = (dh - dlgHt) / 2 + st;
  const left = (dw - dlgWd) / 2;

  popupDialog.css({
    top: `${top < 0 ? 0 : top}px`,
    left: `${left < 0 ? 0 : left}px`
  });

  popupDialog.find('button.api-popup-cancel').click(() => {
    popupMask.hide();
    popupDialog.hide();
    popupDialog.empty();
    popupDialog = [];
  });

  $('button.api-popup-authbtn').unbind();
  popupDialog.find('button.api-popup-authbtn').click(() => {
    let ep;
    let dets;
    popupMask.hide();
    popupDialog.hide();

    const { authSchemes } = window.swaggerUi.api;
    const host = window.location;
    const pathname = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
    const defaultRedirectUrl = `${host.protocol}//${host.host}${pathname}/o2c.html`;
    const redirectUrl = window.oAuthRedirectUrl || defaultRedirectUrl;
    let url = null;
    const scopes = [];
    let o = popup.find('input:checked');
    const OAuthSchemeKeys = [];
    let state;
    for (k = 0; k < o.length; k++) {
      const scope = $(o[k]).attr('scope');
      if (scopes.indexOf(scope) === -1) scopes.push(scope);
      const OAuthSchemeKey = $(o[k]).attr('oauthtype');
      if (OAuthSchemeKeys.indexOf(OAuthSchemeKey) === -1) OAuthSchemeKeys.push(OAuthSchemeKey);
    }


    window.enabledScopes = scopes;

    for (var key in authSchemes) {
      if (authSchemes.hasOwnProperty(key) && OAuthSchemeKeys.indexOf(key) != -1) { // only look at keys that match this scope.
        const { flow } = authSchemes[key];

        if (authSchemes[key].type === 'oauth2' && flow && (flow === 'implicit' || flow === 'accessCode')) {
          dets = authSchemes[key];
          url = `${dets.authorizationUrl}?response_type=${flow === 'implicit' ? 'token' : 'code'}`;
          window.swaggerUi.tokenName = dets.tokenName || 'access_token';
          window.swaggerUi.tokenUrl = (flow === 'accessCode' ? dets.tokenUrl : null);
          state = key;
        } else if (authSchemes[key].type === 'oauth2' && flow && (flow === 'application')) {
          dets = authSchemes[key];
          window.swaggerUi.tokenName = dets.tokenName || 'access_token';
          clientCredentialsFlow(scopes, dets.tokenUrl, key);
          return;
        } else if (authSchemes[key].grantTypes) {
          // 1.2 support
          o = authSchemes[key].grantTypes;
          for (const t in o) {
            if (o.hasOwnProperty(t) && t === 'implicit') {
              dets = o[t];
              ep = dets.loginEndpoint.url;
              url = `${dets.loginEndpoint.url}?response_type=token`;
              window.swaggerUi.tokenName = dets.tokenName;
            } else if (o.hasOwnProperty(t) && t === 'accessCode') {
              dets = o[t];
              ep = dets.tokenRequestEndpoint.url;
              url = `${dets.tokenRequestEndpoint.url}?response_type=code`;
              window.swaggerUi.tokenName = dets.tokenName;
            }
          }
        }
      }
    }

    redirect_uri = redirectUrl;

    url += `&redirect_uri=${encodeURIComponent(redirectUrl)}`;
    url += `&realm=${encodeURIComponent(realm)}`;
    url += `&client_id=${encodeURIComponent(clientId)}`;
    url += `&scope=${encodeURIComponent(scopes.join(scopeSeparator))}`;
    url += `&state=${encodeURIComponent(state)}`;
    for (var key in additionalQueryStringParams) {
      url += `&${key}=${encodeURIComponent(additionalQueryStringParams[key])}`;
    }

    window.open(url);
  });

  popupMask.show();
  popupDialog.show();
}

function handleLogout() {
  for (key in window.swaggerUi.api.clientAuthorizations.authz) {
    window.swaggerUi.api.clientAuthorizations.remove(key);
  }
  window.enabledScopes = null;
  $('.api-ic.ic-on').addClass('ic-off');
  $('.api-ic.ic-on').removeClass('ic-on');

  // set the info box
  $('.api-ic.ic-warning').addClass('ic-error');
  $('.api-ic.ic-warning').removeClass('ic-warning');
}

function initOAuth(opts) {
  const o = (opts || {});
  const errors = [];

  appName = (o.appName || errors.push('missing appName'));
  popupMask = (o.popupMask || $('#api-common-mask'));
  popupDialog = (o.popupDialog || $('.api-popup-dialog'));
  clientId = (o.clientId || errors.push('missing client id'));
  clientSecret = (o.clientSecret || null);
  realm = (o.realm || errors.push('missing realm'));
  scopeSeparator = (o.scopeSeparator || ' ');
  additionalQueryStringParams = (o.additionalQueryStringParams || {});

  if (errors.length > 0) {
    log(`auth unable initialize oauth: ${errors}`);
    return;
  }

  $('pre code').each((i, e) => { hljs.highlightBlock(e); });
  $('.api-ic').unbind();
  $('.api-ic').click((s) => {
    if ($(s.target).hasClass('ic-off')) handleLogin();
    else {
      handleLogout();
    }
    false;
  });
}

function clientCredentialsFlow(scopes, tokenUrl, OAuthSchemeKey) {
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    scope: scopes.join(' '),
    grant_type: 'client_credentials'
  };
  $.ajax(
    {
      url: tokenUrl,
      type: 'POST',
      data: params,
      success(data, textStatus, jqXHR) {
        onOAuthComplete(data, OAuthSchemeKey);
      },
      error(jqXHR, textStatus, errorThrown) {
        onOAuthComplete('');
      }
    }
  );
}

window.processOAuthCode = function processOAuthCode(data) {
  const OAuthSchemeKey = data.state;

  // redirect_uri is required in auth code flow
  // see https://tools.ietf.org/html/draft-ietf-oauth-v2-31#section-4.1.3
  const host = window.location;
  const pathname = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
  const defaultRedirectUrl = `${host.protocol}//${host.host}${pathname}/o2c.html`;
  const redirectUrl = window.oAuthRedirectUrl || defaultRedirectUrl;

  const params = {
    client_id: clientId,
    code: data.code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUrl
  };

  if (clientSecret) {
    params.client_secret = clientSecret;
  }

  $.ajax(
    {
      url: window.swaggerUi.tokenUrl,
      type: 'POST',
      data: params,
      success(data, textStatus, jqXHR) {
        onOAuthComplete(data, OAuthSchemeKey);
      },
      error(jqXHR, textStatus, errorThrown) {
        onOAuthComplete('');
      }
    }
  );
};

window.onOAuthComplete = function onOAuthComplete(token, OAuthSchemeKey) {
  if (token) {
    if (token.error) {
      const checkbox = $('input[type=checkbox],.secured');
      checkbox.each((pos) => {
        checkbox[pos].checked = false;
      });
      alert(token.error);
    } else {
      const b = token[window.swaggerUi.tokenName];
      if (!OAuthSchemeKey) {
        OAuthSchemeKey = token.state;
      }
      if (b) {
        // if all roles are satisfied
        let o = null;
        $.each($('.auth .api-ic .api_information_panel'), (k, v) => {
          const children = v;
          if (children && children.childNodes) {
            const requiredScopes = [];
            $.each((children.childNodes), (k1, v1) => {
              const inner = v1.innerHTML;
              if (inner) requiredScopes.push(inner);
            });
            const diff = [];
            for (let i = 0; i < requiredScopes.length; i++) {
              const s = requiredScopes[i];
              if (window.enabledScopes && window.enabledScopes.indexOf(s) == -1) {
                diff.push(s);
              }
            }
            if (diff.length > 0) {
              o = v.parentNode.parentNode;
              $(o.parentNode).find('.api-ic.ic-on').addClass('ic-off');
              $(o.parentNode).find('.api-ic.ic-on').removeClass('ic-on');

              // sorry, not all scopes are satisfied
              $(o).find('.api-ic').addClass('ic-warning');
              $(o).find('.api-ic').removeClass('ic-error');
            } else {
              o = v.parentNode.parentNode;
              $(o.parentNode).find('.api-ic.ic-off').addClass('ic-on');
              $(o.parentNode).find('.api-ic.ic-off').removeClass('ic-off');

              // all scopes are satisfied
              $(o).find('.api-ic').addClass('ic-info');
              $(o).find('.api-ic').removeClass('ic-warning');
              $(o).find('.api-ic').removeClass('ic-error');
            }
          }
        });
        window.swaggerUi.api.clientAuthorizations.add(window.OAuthSchemeKey, new SwaggerClient.ApiKeyAuthorization('Authorization', `Bearer ${b}`, 'header'));
        window.swaggerUi.load();
      }
    }
  }
};
