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
echo options nouveau modeset=0 | sudo tee -a /etc/modprobe.d/nouveau-kms.conf
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
* Download cuDNN v5 (May 27, 2016), for CUDA 8.0
```
tar xvfz cudnn-8.0-linux-x64-v6.0.tgz
cd cuda
sudo cp lib64/* /usr/local/cuda/lib64/
sudo cp include/* /usr/local/cuda/include/
```

```
sudo apt install libcupti-dev -y
```



## tensorflow env
```
sudo apt install python3-pip --upgrade
pip3 install virtualenv --upgrade
virtualenv /mnt/tf
source /mnt/tf/bin/activate
pip install --upgrade tensorflow-gpu
```


### devices
```

```

## ref
* http://www.pyimagesearch.com/2016/07/04/how-to-install-cuda-toolkit-and-cudnn-for-deep-learning/
* http://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#axzz4dfIE2Rxb
* AWS의 GPU를 이용한 TensorFlow
  * http://goodtogreate.tistory.com/entry/AWS%EC%9D%98-GPU%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-TensorFlow