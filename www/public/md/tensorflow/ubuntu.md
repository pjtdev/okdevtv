# tensorflow ubuntu gpu
* on aws ubuntu g2.2xlarge

## cuda
```
uname -r
sudo apt-get install linux-headers-$(uname -r)
df -h
sudo ln -s /mnt ~/local
# https://developer.nvidia.com/cuda-downloads
wget https://developer.nvidia.com/compute/cuda/8.0/Prod2/local_installers/cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64-deb
sudo dpkg -i cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64-deb
sudo apt upgrade -y
sudo apt update -y
sudo apt install cuda -y
```


## tensorflow env
```
sudo apt update
sudo apt install python3-pip --upgrade
pip3 install virtualenv --upgrade
virtualenv ~/tf
source ~/tf/bin/activate
pip install --upgrade tensorflow-gpu
```

## ref
* http://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#axzz4dfIE2Rxb
