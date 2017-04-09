# tensorflow ubuntu gpu
* on aws ubuntu g2.2xlarge

```
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y build-essential cmake git unzip pkg-config libopenblas-dev liblapack-dev
sudo apt-get install -y linux-image-generic linux-image-extra-virtual linux-source linux-headers-generic
```

## cuda

```
df -h
sudo chown ubuntu:ubuntu -R /mnt
cd /mnt
# https://developer.nvidia.com/cuda-downloads
wget https://developer.nvidia.com/compute/cuda/8.0/Prod2/local_installers/cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64-deb
sudo dpkg -i cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64-deb
sudo apt update
sudo apt install cuda -y
sudo apt install libcupti-dev -y
```

```
sudo vi /etc/modprobe.d/blacklist-nouveau.conf
```

```
blacklist nouveau
blacklist lbm-nouveau
options nouveau modeset=0
alias nouveau off
alias lbm-nouveau off
```

```
sudo update-initramfs -u
sudo reboot 
```

* vi ~/.profile
```
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
```

```
source ~/.profile
nvcc --version
```

* https://developer.nvidia.com/rdp/cudnn-download
```
tar xvfz cudnn-8.0-linux-x64-v6.0.tgz
cd cuda
sudo cp lib64/* /usr/local/cuda/lib64/
sudo cp include/* /usr/local/cuda/include/
```




## tensorflow env
```
sudo apt install python3-pip --upgrade
pip3 install virtualenv --upgrade
virtualenv ~/local/tf
source ~/local/tf/bin/activate
pip install --upgrade tensorflow-gpu
```

## ref
* http://www.pyimagesearch.com/2016/07/04/how-to-install-cuda-toolkit-and-cudnn-for-deep-learning/
* http://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#axzz4dfIE2Rxb
