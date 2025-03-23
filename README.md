<a name="readme-top"></a>

<br />
<div align="center">
  <h3 align="center">Point Relais</h3>

  <p align="center">
    Utilisé pour une quête
    <br />
    <a href="https://www.almyria.fr"><strong>www.almyria.fr</strong></a>
    <br />
    <br />
    <a href="https://github.com/Almyria/pointrelais">Repo Git Frontend</a>
  </p>
</div>

## Stack
ExpressJS ─ Axios

## Installation
Conçu d'origine sous **Windows 11 Business** et testé/utilisé sous **Ubuntu 22.04**, les autres distributions et OS peuvent fonctionner.

Nécessite :
- **NodeJS 18.16.0 LTS**
- (Production) Un serveur web NGINX

```bash
npm install
```

### Configuration
`app.js` à la ligne 43 :
> password1 === "Millenium" && password2 === "ZelvacLeGoat" && password3 === "polygone" && password4 === "Les Ratz"

Configuration NGINX (application/vhost) :
```
location / {
        proxy_pass http://127.0.0.1:43123;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
}
````

### Démarrage
```bash
npm start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
