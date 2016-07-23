# Access server without password
* When setting is finished, you don't need to type password to login.
* need private, public keys

## Generate keys
* `ssh-keygen -t rsa`
* all enters
* `cd ~/.ssh`
* find **id_rsa.pub** file. This is public key.
* `cat ~/.ssh/id_rsa.pub`
* copy it

### Server login
* log in server with password just once.
* create file ~/.ssh/authorized_keys in server
```
mkdir ~/.ssh
vi ~/.ssh/authrized_keys
```
* paste copied client's public key

### 
* in GitHub open git settings in browser
  * https://github.com/settings/keys
* click New SSH key button
* input computer name and paste key in the below box

## Check point
* permission matters.
* `chmod 700 ~/.ssh`
* `chmod 644 ~/.ssh/authorized_keys`

## Optional
* in windows, install **git** and use `git bash` from http://git-scm.com

