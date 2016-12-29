# TensorFlow
* ML Library
* https://www.tensorflow.org/

## install
* mac
  * virtualenv 사용
```
sudo pip install --upgrade virtualenv
virtualenv --system-site-packages ~/tensorflow
source ~/tensorflow/bin/activate
TF_BINARY_URL=https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-0.12.0-py2-none-any.whl
pip install --upgrade $TF_BINARY_URL
deactivate
```

