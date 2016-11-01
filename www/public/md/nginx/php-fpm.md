# PHP-FPM with nginx
* PHP FastCGI Process Manager
* on AWS

## install
```
sudo yum install nginx -y
sudo yum install php-fpm -y
```

```
sudo vi /etc/nginx/nginx.conf
```

```
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        location ~ \.php$ {
            try_files $uri =404;
        #    root           html;
        #    fastcgi_pass   unix:/var/run/php-fpm.sock;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
```

```
sudo vi /etc/php-fpm.d/www.conf
```

```
;listen = 127.0.0.1:9000
listen = /var/run/php-fpm.sock

listen.owner = nginx
listen.group = nginx
listen.mode = 0666

user = nginx

group = nginx
```

```
sudo service php-fpm restart
sudo service nginx restart
```



## 참고
* NGINX-PHP-MySQL 설치(ubuntu)
  * https://opentutorials.org/module/384/4332
