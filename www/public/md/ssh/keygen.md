# Login server without password

* `ssh-keygen -t rsa` and all enters.
  * in windows, install git and use `git bash` from http://git-scm.com
* find id_rsa.pub file in the user home directory's .ssh `cd ~/.ssh`
* `cat ~/.ssh/id_rsa.pub`

* copy and paste to ~/.ssh/authorized_keys in server or git settings
* `chmod 700 ~/.ssh`
* `chmod 644 ~/.ssh/authorized_keys`

